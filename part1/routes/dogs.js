var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', async (req, res) => {
  const [rows] = await db.query(`
    SELECT name as dog_name, 
    FROM

  `);
  res.json(rows);
});
module.exports = router;
