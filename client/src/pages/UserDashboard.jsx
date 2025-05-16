import { assetsImages } from '../assets/images-data'

import { Link, NavLink, Outlet } from "react-router-dom"

import UserMenu from '../components/UserMenu'


const UserDashboard = () => {

	return (
		<div className="min-h-screen">
			{/* NavBar for Recruters*/}
			<div className='shadow py-4'>
				<div className='px-5 flex justify-between items-center'>
					<Link to="/"><img src={assetsImages.logo} className='max-sm:w-32 cursor-pointer' alt="Logo" /></Link>
					<UserMenu />
				</div>
			</div>
			<div className='flex items-start'>
				{/* Left SideBar */}
				<div className=' border-r-2 border-b-2 sm:border-hidden'>
					<ul className='flex flex-col items-start pt-5 pb-2 text-gray-800'>
						<li className='w-full'><NavLink to={'/'} className='flex items-center p-3 sm:px-6 gap-2 w-full'>
							<img src={assetsImages.icon1} className='w-5' alt="icon" /><p className='max-sm:hidden'>Back to Website</p>
						</NavLink></li>
						<li className='w-full mt-2 border-t-2'><NavLink to={'/user/my-applications'} className={({ isActive }) => `flex items-center p-3 sm:px-6 gap-2 w-full mt-2 ${isActive && 'bg-blue-100'}`} >
							<img src={assetsImages.home_icon} className='w-5' alt="icon" /><p className='max-sm:hidden'>My Applications</p>
						</NavLink></li>
						<li className='w-full mt-2 border-t-2'><NavLink to={'/user/edit-user-profile'} className={({ isActive }) => `flex items-center p-3 sm:px-6 gap-2 w-full mt-2 ${isActive && 'bg-blue-100'}`} >
							<img src={assetsImages.icon2} className='w-5' alt="icon" /><p className='max-sm:hidden'>Edit Profile</p>
						</NavLink></li>
						<li className='flex items-center p-3 sm:px-6 gap-2 w-full cursor-pointer' >
							<img src={assetsImages.icon3} className='w-5' alt="icon" /><p className='max-sm:hidden'>Logout</p>
						</li>
					</ul>
				</div>
				<div>
					<Outlet />
				</div>
			</div>
		</div>
	)
}

export default UserDashboard