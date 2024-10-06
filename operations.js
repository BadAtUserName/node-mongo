// Import the strict assertion module to handle error checking
const assert = require('assert').strict;

// Function to insert a document into a specified collection
exports.insertDocument = (db, document, collection) => {
  // Access the specified collection in the database
  const coll = db.collection(collection);
  return coll.insertOne(document);
};

// Function to find all documents in a specified collection
exports.findDocuments = (db, collection) => {
  // Access the specified collection in the database
  const coll = db.collection(collection);
  return coll.find({}).toArray();
};

// Function to remove a specific document from a specified collection
exports.removeDocument = (db, document, collection) => {
  // Access the specified collection in the database
  const coll = db.collection(collection);
  return coll.deleteOne(document);
};

// Function to update a specific document in a specified collection
exports.updateDocument = (db, document, update, collection) => {
  // Access the specified collection in the database
  const coll = db.collection(collection);
  return coll.updateOne(document, {$set:update}, null);

};
