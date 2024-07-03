const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const url = `mongodb://${host}:${port}/${database}`;

    this.client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    this.db = null;

    this.client.on('error', (err) => console.error('MongoDB Client Error:', err));
    this.client.on('connect', () => console.log('Connected to MongoDB'));
  }

  async isAlive() {
    try {
      await this.client.connect();
      this.db = this.client.db();
      return true;
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      return false;
    }
  }

  async nbUsers() {
    if (!this.db) {
      console.error('Not connected to MongoDB');
      return null;
    }
    try {
      const count = await this.db.collection('users').countDocuments();
      return count;
    } catch (error) {
      console.error('Error counting users:', error);
      return null;
    }
  }

  async nbFiles() {
    if (!this.db) {
      console.error('Not connected to MongoDB');
      return null;
    }
    try {
      const count = await this.db.collection('files').countDocuments();
      return count;
    } catch (error) {
      console.error('Error counting files:', error);
      return null;
    }
  }
}

const dbClient = new DBClient();

module.exports = dbClient;

