var express = require('express');
var router = express.Router();
const {getConnection} = require('../db');

/* GET users listing. */
router.get('/summary', async (req, res) => {
  try {
    let {status} = req.params;
    const db = await getConnection();
    const [walkRequest] = await db.query(`
      SELECT request_id, Dogs.name as dog_name, requested_time, duration_minutes, location, Users.username as owner_username
      FROM ((WalkRequests INNER JOIN Dogs ON WalkRequests.dog_id = Dogs.dog_id) INNER JOIN Users ON Dogs.owner_id = Users.user_id)
      WHERE status = 'open';
    `);
    res.json(walkRequest);
  } catch (err) {
    res.status(500).json({
      message: 'Failed to fetch open walk request ',
      error: err.message
    });
  }
});
module.exports = router;
