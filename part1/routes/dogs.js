var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', async (req, res) => {
  const [rows] = await db.query(`
    SELECT *
    FROM Dogs
    JOIN BookInfo bi ON bl.BookInfoID = bi.BookInfoID
    JOIN Users u ON bl.SellerID = u.UserID
  `);
  res.json(rows);
});
module.exports = router;
