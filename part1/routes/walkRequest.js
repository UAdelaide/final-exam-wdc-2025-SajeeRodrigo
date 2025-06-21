var express = require('express');
var router = express.Router();
const {getConnection} = require('../db');

/* GET users listing. */
router.get('/:status', async (req, res) => {
  try {
    const db = await getConnection();
    const [walkRequest] = await db.execute(`
      SELECT *
      FROM ((WalkRequests INNER JOIN Dogs ON WalkRequests.dog_id = Dogs.dog_id) INNER JOIN Users ON );
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
