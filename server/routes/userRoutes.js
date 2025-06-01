const router = require('express').Router();
 
const {
  userRegistration, userLogin, getUserData, updateUser, deleteUser, applyForJob, getUserApplications
} = require('../controllers/userController.js');

const protect = require('../middleware/Auth.js'); 

const { upload } = require('../middleware/multer.js');


// Routes
router.post('/registration', upload.fields([{ name: 'avatar', maxCount: 1}]), userRegistration);
router.post('/login', userLogin);

router.get('/profile', protect, getUserData);
router.put('/profile', protect, upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'resume', maxCount: 1}]), updateUser);
router.delete('/profile', protect, deleteUser);

router.post('/apply', protect, applyForJob);

router.get('/applications', protect, getUserApplications);


module.exports = router;