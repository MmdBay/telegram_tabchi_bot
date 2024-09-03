const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017/';
const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('tabchi');
    const users = db.collection('users');
    const groups = db.collection('groups');
    const admins = db.collection('admins');
    const numbers = db.collection('number');
    const allData = db.collection('all_data');
    const words = db.collection('words');
    const angizeshi = db.collection('angizeshi');
    return { db, users, groups, admins, numbers, allData, words, angizeshi };
  } catch (err) {
    console.error(err);
  }
}

module.exports = { connectToDatabase };