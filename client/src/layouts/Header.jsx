import { assetsImages } from '../assets/images-data'

import { Link } from "react-router-dom"


const Header = () => {
	return (
		<div className='shadow py-4'>
			<div className='container px-4 2xl:px-20 mx-auto flex flex-wrap justify-between items-center lg:order-1'>
				<Link to="/"><img src={assetsImages.logo} alt="Logo" /></Link>
				<div className='flex gap-2 md:text-sm text-xs lg:order-3'>
					<button
						className='border-gray-400 border-2 text-gray-600 px-6 py-1 rounded-full hover:bg-gray-200 transition duration-300 ease-in-out'>Recruter Login</button>
					<button
						className='bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-500 transition duration-300 ease-in-out'>Login</button>
				</div>
				<div className='lg:order-2 w-full lg:w-auto mt-4 lg:mt-0'>
					<ul className='flex justify-center items-center font-semibold'>
						<li><Link to={'/'} className='text-black md:text-lg text-md px-1 md:px-2 mx-2 hover:text-gray-600 transition duration-300 ease-in-out'>Home</Link></li>
						<li><Link to={'/faq'} className='text-black md:text-lg text-md px-1 md:px-2 mx-2 hover:text-gray-600 transition duration-300 ease-in-out'>FAQ</Link></li>
						<li><Link to={'/contacts'} className='text-black md:text-lg text-md px-1 md:px-2 mx-2 hover:text-gray-600 transition duration-300 ease-in-out'>Contact Us</Link></li>
					</ul>
				</div>
			</div>
		</div>
	)
}

export default Header