import { assetsImages } from '../assets/images-data'

import { Link, NavLink, Outlet } from "react-router-dom"

import CompanyMenu from '../components/CompanyMenu'


const CompanyDashboard = () => {

	return (

		<div className="min-h-screen">
			{/* NavBar for Recruters*/}
			<div className='shadow py-4'>
				<div className='px-5 flex justify-between items-center'>
					<Link to="/"><img src={assetsImages.logo} className='max-sm:w-32 cursor-pointer' alt="Logo" /></Link>
					<CompanyMenu />
				</div>
			</div>
			<div className='flex items-start'>
				{/* Left SideBar */}
				<div className='border-r-2 max-w-1/4 border-b-2 md:border-hidden'>
					<ul className='flex flex-col items-start pt-5 pb-2 text-gray-800'>
						<li className='w-full'><NavLink to={'/'} className='flex items-center p-3 md:px-6 gap-2 w-full'>
							<img src={assetsImages.icon1} className='w-5' alt="icon" /><p className='max-md:hidden'>Back to Website</p>
						</NavLink></li>
						<li className='w-full mt-2 border-t-2'><NavLink to={'/dashboard/add-job'} className={({ isActive }) => `flex items-center p-3 md:px-6 gap-2 w-full mt-2 ${isActive && 'bg-blue-100'}`} >
							<img src={assetsImages.add_icon} className='w-5' alt="icon" /><p className='max-md:hidden'>Add Job</p>
						</NavLink></li>
						<li className='w-full'><NavLink to={'/dashboard/manage-jobs'} className={({ isActive }) => `flex items-center p-3 md:px-6 gap-2 w-full ${isActive && 'bg-blue-100'}`} >
							<img src={assetsImages.home_icon} className='w-5' alt="icon" /><p className='max-md:hidden'>Manage Jobs</p>
						</NavLink></li>
						<li className='w-full'><NavLink to={'/dashboard/manage-applications'} className={({ isActive }) => `flex items-center p-3 md:px-6 gap-2 w-full ${isActive && 'bg-blue-100'}`} >
							<img src={assetsImages.person_tick_icon} className='w-5' alt="icon" /><p className='max-md:hidden'>View Applications</p>
						</NavLink></li>
						<li className='w-full mt-2 border-t-2'><NavLink to={'/dashboard/edit-company-profile'} className={({ isActive }) => `flex items-center p-3 md:px-6 gap-2 w-full mt-2 ${isActive && 'bg-blue-100'}`} >
							<img src={assetsImages.icon2} className='w-5' alt="icon" /><p className='max-md:hidden'>Edit Profile</p>
						</NavLink></li>
						<li className='flex items-center p-3 md:px-6 gap-2 w-full cursor-pointer' >
							<img src={assetsImages.icon3} className='w-5' alt="icon" /><p className='max-md:hidden'>Logout</p>
						</li>
					</ul>
				</div>
				{/* content */}
				<div className='w-3/4 ms-10'>
					<Outlet />
				</div>
			</div>
		</div>
		
	)
}

export default CompanyDashboard