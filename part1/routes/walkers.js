var express = require('express');
var router = express.Router();
const {getConnection} = require('../db');

/* GET users listing. */
router.get('/summary', async (req, res) => {
  try {
    const db = await getConnection();
    const [result] = await db.query(`
      SELECT
        Users.username AS walker_username,
        COUNT(DISTINCT WalkRatings.rating_id) AS total_ratings,
        ROUND(AVG(WalkRatings.rating), 2) AS average_rating,
        COUNT(DISTINCT CASE WHEN WalkRequests.status = 'completed' THEN WalkRequests.request_id END) AS completed_walks
      FROM Users
        LEFT JOIN WalkRatings ON WalkRatings.walker_id = Users.user_id
        LEFT JOIN WalkRequests ON WalkRequests.request_id = WalkRatings.request_id AND WalkRequests.status = 'completed'
      WHERE Users.role = 'walker'
      GROUP BY Users.user_id, Users.username;
    `);
    res.json(result);
  } catch (err) {
    res.status(500).json({
      message: 'Failed to fetch walk',
      error: err.message
    });
  }
});
module.exports = router;
