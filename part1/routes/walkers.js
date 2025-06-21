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
        COUNT(DISTINCT WalkRatings.ratings_id) AS total_ratings, AVG(WalkRatings.rating) as average_rating)
      FROM Users LEFT JOIN WalkRatings ON WalkRatings.walker_id = Users.user_id
          LEFT JOIN WalkRequests ON WalkRequest.request_id = WalkRatings.request_id AND WalkRequest.status = 'completed'
      WHERE Users.role = 'walker'
      GROUP BY user_id, username
      ;
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
