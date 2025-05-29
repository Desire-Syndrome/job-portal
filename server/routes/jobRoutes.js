const router = require('express').Router();
 
const {
  getJobs, getJobById
} = require('../controllers/jobController');


// Routes
router.get('/', getJobs);
router.get('/:id', getJobById);


module.exports = router;