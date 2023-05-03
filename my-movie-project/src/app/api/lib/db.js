import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let client;
let database;

// Connect to MongoDB
async function connectDB() {
  if (!client) {
    client = new MongoClient(uri, options);
    await client.connect();
    database = client.db('Movies');
  }
  return client;
}

// Disconnect from MongoDB
// async function disconnectDB() {
//   if (client) {
//     await client.close();
//     client = undefined;
//     database = undefined;
//   }
// }

// Get the database client
function getDB() {
  return database;
}


async function addMovieId(id) {
  await connectDB();
  const db = getDB();
  const collection = db.collection('bookMarks');
  const document = await collection.findOne({});
  const data = document ? document.data : {};
  data[id] = true;
  await collection.updateOne({}, { $set: { data } }, { upsert: true });
}

async function getBookMarkedMovies() {
  await connectDB();
  const db = getDB();
  const collection = db.collection('bookMarks');
  const document = await collection.findOne({});
  const data = document ? document.data : {};
  return data;
}


async function deleteMovieId(id) {
  await connectDB();
  const db = getDB();
  const collection = db.collection('bookMarks');
  const document = await collection.findOne({});
  const data = document ? document.data : {};
  if (data[id]) {
    delete data[id];
    await collection.updateOne({}, { $set: { data } }, { upsert: true });
  }
}


export { addMovieId, deleteMovieId, getBookMarkedMovies };
