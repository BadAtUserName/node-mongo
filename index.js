const MongoClient = require("mongodb").MongoClient;
const dboper = require("./operations");

const url = "mongodb://localhost:27017/";
const dbname = "nucampsite";

(async function () {
  try {
    const client = await MongoClient.connect(url, {});
    console.log("Connected correctly to server");

    const db = client.db(dbname);

    try {
      const dropResult = await db.dropCollection("campsites");
      console.log("Dropped Collection:", dropResult);
    } catch (err) {
      console.log("No collection to drop.");
    }

    const documentToInsert = {
      name: "Breadcrumb Trail Campground",
      description: "Test",
    };

    const insertResult = await dboper.insertDocument(
      db,
      documentToInsert,
      "campsites"
    );
    console.log("Insert Document:", {
      _id: insertResult.insertedId, 
      ...documentToInsert,
    });

    const docs = await dboper.findDocuments(db, "campsites");
    console.log("Found Documents:", docs);

    const updateResult = await dboper.updateDocument(
      db,
      { name: "Breadcrumb Trail Campground" },
      { description: "Updated Test Description" },
      "campsites"
    );
    console.log("Updated Document Count:", updateResult.modifiedCount); 

    const updatedDocs = await dboper.findDocuments(db, "campsites");
    console.log("Found Documents:", updatedDocs);

    const deleteResult = await dboper.removeDocument(
      db,
      { name: "Breadcrumb Trail Campground" },
      "campsites"
    );
    console.log("Deleted Document Count:", deleteResult.deletedCount);

    await client.close();
  } catch (err) {
    console.log(err);
  }
})();


/*// Import the MongoClient class from the mongodb-legacy package
const { MongoClient } = require("mongodb-legacy");
const assert = require("assert"); // Import assert module to handle assertions
const dboper = require('./operations');

// Define the URL for connecting to the MongoDB server (localhost)
const url = "mongodb://localhost:27017/";
// Specify the name of the database to use
const dbName = "nucampsite";

// Connect to the MongoDB server
MongoClient.connect(url, {}, (err, client) => {
  // Check if there was an error during connection
  assert.strictEqual(err, undefined); // Ensure no errors occurred

  console.log("Connected correctly to server"); // Log success message if connected

  // Access the specified database
  const db = client.db(dbName);

  // Drop the "campsites" collection if it exists
  db.dropCollection("campsites", (err, result) => {
    // Check if there was an error while dropping the collection
    assert.strictEqual(err, undefined); // Ensure no errors occurred
    console.log("Dropped Collection", result); // Log the result of the drop operation

    // Create or access the "campsites" collection
    const documentToInsert = {name: 'Breadcrumb trail Campground', description: 'Test'};

    //insert the document into campsites using custom insertId
    dboper.insertDocument(db, documentToInsert, 'campsites', result => {
      console.log('Insert Document:', {
          _id: result.insertedId, //Log the generated ID fo the inserted document
          ...documentToInsert, //Spread and log the document properties
      });
      //find and retrieve all document in the campsites colletion
      dboper.findDocuments(db, 'campsites', docs => {
          console.log('Found Documents:', docs); //log the documents found in the collection
          //Update the document with a new description using the custom updateDocument
          dboper.updateDocument(db, { name: "Breadcrumb Trail Campground" },
              { description: "Updated Test Description" }, 'campsites', result => {
                  console.log('Updated Document Count:', result.modifiedCount);
                  //Find and retrieve all documents in the campsites collection to verify the update
                  dboper.findDocuments(db, 'campsites', docs => {
                      console.log('Found Documents:', docs);//log docs found in collection after the update
                      //remove the document form the campsites collection using the custom remove doc funct
                      dboper.removeDocument(db, { name: "Breadcrumb Trail Campground" },
                          'campsites', result => {
                              console.log('Deleted Document Count:', result.deletedCount);//log num of docs deleted
                              //close the mongoDB client connection
                              client.close();
                          }
                      );
                  });
              }
          );
      });
  });
});
});*/