import { assetsImages } from '../assets/images-data'
import { user } from '../assets/mock-data'

import { Link } from "react-router-dom"


function UserMenu() {
	return (
		<div className='flex items-center gap-3'>
							<p className='max-sm:hidden'>Welcome, {user.name}</p>
							<div className='relative group'>
								<img src={user.image} className='w-8 border rounded-full' alt="Company Logo" />
								<div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12'>
									<ul className='list-none m-0 p-2 bg-white rounded-md border text-sm w-max'>
										<li><Link to={'/'} className='py-1 px-2 cursor-pointer flex items-center gap-2 hover:bg-blue-100'>
											<img src={assetsImages.icon1} className='w-4 h-4' alt="icon" />Back to Website
										</Link></li>
										<li><Link to={'/user/my-applications'} className='py-1 px-2 cursor-pointer flex items-center gap-2 hover:bg-blue-100'>
											<img src={assetsImages.home_icon} className='w-4 h-4' alt="icon" />My Applications
										</Link></li>
										<li><Link to={'/user/edit-user-profile'} className='py-1 px-2 cursor-pointer flex items-center gap-2 hover:bg-blue-100'>
											<img src={assetsImages.icon2} className='w-4 h-4' alt="icon" />Edit Profile
										</Link></li>
										<li className='py-1 px-2 cursor-pointer flex items-center gap-2 hover:bg-blue-100'>
											<img src={assetsImages.icon3} className='w-4 h-4' alt="icon" />Logout
										</li>
									</ul>
								</div>
							</div>
						</div>
	)
}

export default UserMenu