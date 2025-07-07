import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"

import UseScrollToTop from "./hooks/useScrollToTop"

import { useSelector } from "react-redux";

import Home from './pages/Home'
import Job from './pages/Job'
import FAQ from './pages/FAQ'
import ContactUs from './pages/ContactUs'
import UserDashboard from './pages/UserDashboard'
import UserApplications from './pages/UserDashboardOutlets/UserApplications'
import UserInfo from './pages/UserDashboardOutlets/UserInfo'
import CompanyDashboard from './pages/CompanyDashboard'
import AddJob from './pages/AddJob'
import ManageJobs from './pages/ManageJobs'
import ManageApplications from './pages/ManageApplications'
import CompanyInfo from './pages/CompanyInfo'


function App() {

  const userLoginReducer = useSelector((state) => state.userLoginReducer);
  const { userInfo } = userLoginReducer;


  return (

    <Router>
      <UseScrollToTop />
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path='/job/:id' element={<Job />} />
        <Route exact path='/contacts' element={<ContactUs />} />
        <Route exact path='/faq' element={<FAQ />} />
        <Route exact path='/user' element={userInfo ? <UserDashboard /> : <Navigate to="/" />}>
          <Route exact path='my-applications' element={<UserApplications />} />
          <Route exact path='edit-user-profile' element={<UserInfo />} />
        </Route>
        <Route exact path='/dashboard' element={<CompanyDashboard />}>
          <Route exact path='add-job' element={<AddJob />} />
          <Route exact path='manage-jobs' element={<ManageJobs />} />
          <Route exact path='manage-applications' element={<ManageApplications />} />
          <Route exact path='edit-company-profile' element={<CompanyInfo />} />
        </Route>
      </Routes>
    </Router>

  );
}

export default App