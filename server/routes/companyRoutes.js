const router = require('express').Router();
 
const {
  companyRegistration, companyLogin, getCompanyData, updateCompany, deleteCompany, postJob, getPostedJobs, getApplicants, changeApplicationStatus, changeJobVisibility
} = require('../controllers/companyController.js');


// Routes
router.post('/registration', companyRegistration);
router.post('/login', companyLogin);

router.get('/profile', getCompanyData);
router.put('/profile', updateCompany);
router.delete('/profile', deleteCompany);

router.post('/job', postJob);
router.put('/change-visibility', changeJobVisibility);

router.get('/get-jobs', getPostedJobs);

router.get('/applicants', getApplicants);
router.put('/change-status', changeApplicationStatus);


module.exports = router;