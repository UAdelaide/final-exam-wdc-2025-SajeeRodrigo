var express = require('express');
var router = express.Router();
const {getConnection} = require('../db');

/* GET users listing. */
router.get('/:status', async (req, res) => {
  try {
    const db = await getConnection();
    const [walkRequest] = await db.execute(`
      SELECT name as dog_name, size, username as owner_username
      FROM Users, Dogs
      WHERE Dogs.owner_id = Users.user_id;
    `);
    res.json(walkRequest);
  } catch (err) {
    res.status(500).json({
      message: 'Failed to fetch dogs',
      error: err.message
    });
  }
});
module.exports = router;
