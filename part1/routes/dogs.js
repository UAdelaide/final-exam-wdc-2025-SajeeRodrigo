var express = require('express');
var router = express.Router();
const {getConnection} = require('../db')

/* GET users listing. */
router.get('/', async (req, res) => {
  try {
    const db = await getConnection();
    const [users] = 
  } catch (err) {

  }
});
module.exports = router;
