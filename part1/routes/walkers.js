var express = require('express');
var router = express.Router();
const {getConnection} = require('../db');

/* GET users listing. */
router.get('/summary', async (req, res) => {
  try {
    const db = await getConnection();
    const [result] = await db.query(`
      SELECT Users.username AS walker_username, COUNT ;
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
