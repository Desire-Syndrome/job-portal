const router = require('express').Router();
 
const {
  userRegistration, userLogin, getUserData, updateUser, deleteUser, applyForJob, getUserApplications
} = require('../controllers/userController.js');


// Routes
router.post('/registration', userRegistration);
router.post('/login', userLogin);

router.get('/profile', getUserData);
router.put('/profile', updateUser);
router.delete('/profile', deleteUser);

router.post('/apply', applyForJob);

router.get('/applications', getUserApplications);


module.exports = router;