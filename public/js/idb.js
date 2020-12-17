// create variable to hold db connection
let db;
// establish a connection to IndexedDB database called 'budget' and set it to version 1
const request = indexedDB.open('budget', 1);

// this event will emit if the database version changes (non-existent to version 1, v1 to v2, etc.)
request.onupgradeneeded = function(event) {
    // save a reference to the database 
    const db = event.target.result;
    // create an object store (table) called `new_entry`, set it to have an auto incrementing primary key 
    db.createObjectStore('new_entry', { autoIncrement: true });
};

request.onsuccess = function(event) {
    // when db is successfully created with its object store (from onupgradedneeded event above) or simply established a connection, save reference to db in global variable
    db = event.target.result;
  
    // check if app is online, if yes run uploadEntry() function to send all local db data to api
    if (navigator.onLine) {
        uploadEntry();
    }
};
  
request.onerror = function(event) {
    console.log(event.target.errorCode);
};

// This function will be executed if we attempt to submit a new budget entry and there's no internet connection
function saveRecord(record) {
    // open a new transaction with the database with read and write permissions 
    const transaction = db.transaction(['new_entry'], 'readwrite');
  
    // access the object store for `new_entry`
    const budgetObjectStore = transaction.objectStore('new_entry');
  
    // add record to your store with add method
    budgetObjectStore.add(record);
}

function uploadEntry() {
    // open a transaction on the db
    const transaction = db.transaction(['new_entry'], 'readwrite');
  
    // access object store
    const budgetObjectStore = transaction.objectStore('new_entry');
  
    // get all records from store and set to a variable
    const getAll = budgetObjectStore.getAll();

    // upon a successful .getAll() execution, this function below will run
    getAll.onsuccess = function () {
        // if there was data in indexedDb's store, it gets sent to the api server (api/transaction)
        if (getAll.result.length > 0) {
            fetch('/api/transaction', {
                method: 'POST',
                body: JSON.stringify(getAll.result),
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(serverResponse => {
                    if (serverResponse.message) {
                        throw new Error(serverResponse);
                    }
                    // open one more transaction
                    const transaction = db.transaction(['new_entry'], 'readwrite');
                    // access the new_entry object store
                    const budgetObjectStore = transaction.objectStore('new_entry');
                    // clear all items in your store
                    budgetObjectStore.clear();

                    alert('All saved transactions have been submitted!');
                })
                .catch(err => {
                    console.log(err);
                });
           }
        }
        // listen for app coming back online
        window.addEventListener('online', uploadEntry);
};
  