const express = require('express');

const router = express.Router();

//ruote
//express is a request response handler
router.get('/user', (req, res) => {

  res.json({
    data: 'hey you hit user APi end point',
  })
})

module.exports = router;