const router = require('express').Router();
 
const {
  companyRegistration, companyLogin, getCompanyData, updateCompany, deleteCompany, postJob, getPostedJobs, getApplicants, changeApplicationStatus, changeJobVisibility
} = require('../controllers/companyController.js');

const protect = require('../middleware/Auth.js'); 

const upload = require('../middleware/upload.js'); 


// Routes
router.post('/registration', upload.fields([{ name: 'logo', maxCount: 1}]), companyRegistration);
router.post('/login', companyLogin);

router.get('/profile', protect, getCompanyData);
router.put('/profile', protect, upload.fields([{ name: 'logo', maxCount: 1}]), updateCompany);
router.delete('/profile', protect, deleteCompany);

router.post('/job', protect, postJob);
router.put('/change-visibility', protect, changeJobVisibility);

router.get('/get-jobs', protect, getPostedJobs);

router.get('/applicants', protect, getApplicants);
router.put('/change-status', protect, changeApplicationStatus);


module.exports = router;