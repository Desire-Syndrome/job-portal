import { assetsImages } from '../assets/images-data'
import { company } from '../assets/mock-data'

import { Link, NavLink, Outlet } from "react-router-dom"


const CompanyDashboard = () => {

	return (
		<div className="min-h-screen">
			{/* NavBar for Recruters*/}
			<div className='shadow py-4'>
				<div className='px-5 flex justify-between items-center'>
					<Link to="/"><img src={assetsImages.logo} className='max-sm:w-32 cursor-pointer' alt="Logo" /></Link>
					{company && (
						<div className='flex items-center gap-3'>
							<p className='max-sm:hidden'>Welcome, {company.name}</p>
							<div className='relative group'>
								<img src={company.image} className='w-8 border rounded-full' alt="Company Logo" />
								<div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12'>
									<ul className='list-none m-0 p-2 bg-white rounded-md border text-sm w-max'>
										<Link to={'/dashboard/add-job'} className='py-1 px-6 cursor-pointer flex items-center gap-2 hover:bg-blue-100'>
											<img src={assetsImages.home_icon} className='w-4 h-4' alt="icon" />Dashboard
										</Link>
										<Link to={'/dashboard/edit-company-profile'} className='py-1 px-6 cursor-pointer flex items-center gap-2 hover:bg-blue-100'>
											<img src={assetsImages.person_tick_icon} className='w-4 h-4' alt="icon" />Edit Profile
										</Link>
										<li className='py-1 px-6 cursor-pointer flex items-center gap-2 hover:bg-blue-100'>
											<img src={assetsImages.right_arrow_icon} className='w-4 h-3' alt="icon" />Logout
										</li>
									</ul>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
			<div className='flex items-start'>
				{/* Left SideBar */}
				<div className=' border-r-4 border-b-2'>
					<ul className='flex flex-col items-start pt-5 pb-3 text-gray-800'>
						<NavLink to={'/dashboard/add-job'}
							className={({ isActive }) => `flex items-center p-3 sm:px-6 gap-2 w-full ${isActive && 'bg-blue-100'}`} >
							<img src={assetsImages.add_icon} className='w-5' alt="icon" /><p className='max-sm:hidden'>Add Job</p>
						</NavLink>
						<NavLink to={'/dashboard/manage-jobs'} className={({ isActive }) => `flex items-center p-3 sm:px-6 gap-2 w-full ${isActive && 'bg-blue-100'}`} >
							<img src={assetsImages.home_icon} className='w-5' alt="icon" /><p className='max-sm:hidden'>Manage Jobs</p>
						</NavLink>
						<NavLink to={'/dashboard/manage-applications'} className={({ isActive }) => `flex items-center p-3 sm:px-6 gap-2 w-full ${isActive && 'bg-blue-100'}`} >
							<img src={assetsImages.person_tick_icon} className='w-5' alt="icon" /><p className='max-sm:hidden'>View Applications</p>
						</NavLink>
					</ul>
				</div>
				<div>
					<Outlet />
				</div>
			</div>
		</div>
	)
}

export default CompanyDashboard