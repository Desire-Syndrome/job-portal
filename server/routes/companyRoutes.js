const router = require('express').Router();
 
const {
  companyRegistration, companyLogin, updateCompany, deleteCompany, postJob, getPostedJobs, getApplicants, changeApplicationStatus, changeJobVisibility
} = require('../controllers/companyController.js');

const protect = require('../middleware/Auth.js'); 

const { upload } = require('../middleware/multer.js');


// Routes
router.post('/registration', upload.fields([{ name: 'logo', maxCount: 1}]), companyRegistration);
router.post('/login', companyLogin);

router.put('/profile', protect, upload.fields([{ name: 'logo', maxCount: 1}]), updateCompany);
router.delete('/profile', protect, deleteCompany);

router.post('/post-job', protect, postJob);
router.put('/change-visibility', protect, changeJobVisibility);

router.get('/get-jobs', protect, getPostedJobs);

router.get('/applicants', protect, getApplicants);
router.put('/change-status', protect, changeApplicationStatus);


module.exports = router;