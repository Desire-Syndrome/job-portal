import { assetsImages } from '../assets/images-data'

import { Link, NavLink, Outlet } from "react-router-dom"

import UserMenu from '../components/UserMenu'

import { useDispatch } from "react-redux";
import { userLogoutAction } from "../redux/actions/UserActions"


const UserDashboard = () => {

	const dispatch = useDispatch();

	const logoutHandler = () => {
		dispatch(userLogoutAction());
	}

	
	return (
		
			<div className="min-h-screen">
			<div className='shadow py-4'>
				<div className='px-5 flex justify-between items-center'>
					<Link to="/"><img src={assetsImages.logo} className='max-sm:w-32 cursor-pointer' alt="Logo" /></Link>
					<UserMenu />
				</div>
			</div>
			<div className='flex items-start'>
				<div className=' border-r-2 max-w-1/4 border-b-2 md:border-hidden'>
					<ul className='flex flex-col items-start pt-5 pb-2 text-gray-800'>
						<li className='w-full'><NavLink to={'/'} className='flex items-center p-3 md:px-6 gap-2 w-full'>
							<img src={assetsImages.icon1} className='w-5' alt="icon" /><p className='max-md:hidden'>To Website</p>
						</NavLink></li>
						<li className='w-full mt-2 border-t-2'><NavLink to={'/user/my-applications'} className={({ isActive }) => `flex items-center p-3 md:px-6 gap-2 w-full mt-2 ${isActive && 'bg-blue-100'}`} >
							<img src={assetsImages.home_icon} className='w-5' alt="icon" /><p className='max-md:hidden'>Applications</p>
						</NavLink></li>
						<li className='w-full mt-2 border-t-2'><NavLink to={'/user/edit-user-profile'} className={({ isActive }) => `flex items-center p-3 md:px-6 gap-2 w-full mt-2 ${isActive && 'bg-blue-100'}`} >
							<img src={assetsImages.icon2} className='w-5' alt="icon" /><p className='max-md:hidden'>Edit Profile</p>
						</NavLink></li>
						<li onClick={logoutHandler} className='flex items-center p-3 md:px-6 gap-2 w-full cursor-pointer' >
							<img src={assetsImages.icon3} className='w-5' alt="icon" /><p className='max-md:hidden'>Logout</p>
						</li>
					</ul>
				</div>
				<div className='w-3/4 ms-10'>
					<Outlet />
				</div>
			</div>
		</div>

	)
}

export default UserDashboard