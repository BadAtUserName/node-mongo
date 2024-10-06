// Import the strict assertion module to handle error checking
const assert = require('assert').strict;

// Function to insert a document into a specified collection
exports.insertDocument = (db, document, collection, callback) => {
  // Access the specified collection in the database
  const coll = db.collection(collection);

  // Insert the document into the collection
  coll.insertOne(document, (err, result) => {
    // Ensure no errors occurred during the insertion
    assert.strictEqual(err, undefined);

    // Execute the callback function with the result of the insertion
    callback(result);
  });
};

// Function to find all documents in a specified collection
exports.findDocuments = (db, collection, callback) => {
  // Access the specified collection in the database
  const coll = db.collection(collection);

  // Find all documents in the collection and convert them to an array
  coll.find().toArray((err, docs) => {
    // Ensure no errors occurred during the query
    assert.strictEqual(err, undefined);

    // Execute the callback function with the found documents
    callback(docs);
  });
};

// Function to remove a specific document from a specified collection
exports.removeDocument = (db, document, collection, callback) => {
  // Access the specified collection in the database
  const coll = db.collection(collection);

  // Remove the document from the collection
  coll.deleteOne(document, (err, result) => {
    // Ensure no errors occurred during the deletion
    assert.strictEqual(err, undefined);

    // Execute the callback function with the result of the deletion
    callback(result);
  });
};

// Function to update a specific document in a specified collection
exports.updateDocument = (db, document, update, collection, callback) => {
  // Access the specified collection in the database
  const coll = db.collection(collection);

  // Update the document with the new values using the $set operator
  coll.updateOne(document, { $set: update }, null, (err, result) => {
    // Ensure no errors occurred during the update
    assert.strictEqual(err, undefined);

    // Execute the callback function with the result of the update
    callback(result);
  });
};
