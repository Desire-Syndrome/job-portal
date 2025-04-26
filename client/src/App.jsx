import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"

import UseScrollToTop from "./hooks/useScrollToTop"

import Home from './pages/Home'
import Job from './pages/Job'
import UserApplications from './pages/UserApplications'
import Dashboard from './pages/Dashboard'
import AddJob from './pages/AddJob'
import ManageJobs from './pages/ManageJobs'
import ManageApplications from './pages/ManageApplications'
import CompanyInfo from './pages/CompanyInfo'


function App() {
  return (

    <Router>
      <UseScrollToTop /> 
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path='/job/:id' element={<Job />} />
        <Route exact path='/my-applications' element={<UserApplications />} />

        <Route exact path='/dashboard' element={<Dashboard />}>
          <Route exact path='add-job' element={<AddJob />} />
          <Route exact path='manage-jobs' element={<ManageJobs />} />
          <Route exact path='manage-applications' element={<ManageApplications />} />
          <Route exact path='company-info' element={<CompanyInfo />} />
        </Route>

      </Routes>
    </Router>

  );
}

export default App