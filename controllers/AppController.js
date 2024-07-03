const dbClient = require('../db');
const redisClient = require('../redis');

class AppController {
  static async getStatus(req, res) {
    const isRedisAlive = redisClient.isAlive();
    const isDbAlive = await dbClient.isAlive();

    res.status(200).json({ redis: isRedisAlive, db: isDbAlive });
  }

  static async getStats(req, res) {
    const nbUsers = await dbClient.nbUsers();
    const nbFiles = await dbClient.nbFiles();

    if (nbUsers === null || nbFiles === null) {
      return res.status(500).json({ message: 'Error retrieving stats' });
    }

    res.status(200).json({ users: nbUsers, files: nbFiles });
  }
}

module.exports = AppController;

