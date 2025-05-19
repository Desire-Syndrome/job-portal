import { assetsImages } from '../assets/images-data'
import { company as mockCompany, user as mockUser } from '../assets/mock-data'

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import CompanyMenu from '../components/CompanyMenu'
import UserMenu from '../components/UserMenu'


const Header = () => {

	const [company, setCompany] = useState(null);
	const [user, setUser] = useState(null);

	const [popupState, setPopupState] = useState("Login");
	const [popupVariation, setPopupVariation] = useState(null);
	const [showPopup, setShowPopup] = useState(false);

	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [image, setImage] = useState(null);


	const closePopup = () => {
		setImage(null); setName(""); setEmail(""); setPassword("");
		setPopupState("Login"); setShowPopup(false); setPopupVariation(null);
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (popupVariation === "User") {
			if (popupState === "Login") {
				setUser(mockUser);
			} else if (popupState === "Registration") {
				alert("Test");
			}
		} else if (popupVariation === "Company") {
			if (popupState === "Login") {
				setCompany(mockCompany);
			} else if (popupState === "Registration") {
				alert("Test");
			}
		}
		closePopup();
	};


	return (<>

		<div className='shadow py-4'><div className='max-w-[1900px] px-4 2xl:px-20 mx-auto flex flex-wrap justify-between items-center lg:order-1'>
			<Link to="/" className='w-[160px] md:w-[210px]'><img src={assetsImages.logo} className='w-full' alt="Logo" /></Link>
			{/* User Menu and Login Buttons */}
			<div className='flex gap-2 md:text-sm text-xs lg:order-3'>
				{company ? (
					<CompanyMenu />
				) : user ? (
					<UserMenu />
				) : (<>
					<button onClick={() => { setShowPopup(true); setPopupVariation("Company") }}
						className='border-gray-400 border-2 text-gray-600 px-6 py-1 rounded-full hover:bg-gray-200 transition duration-300 ease-in-out'>Company Login</button>
					<button onClick={() => { setShowPopup(true); setPopupVariation("User") }}
						className='bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-500 transition duration-300 ease-in-out'>User Login</button>
				</>)}
			</div>
			{/* Main Menu */}
			<div className='lg:order-2 w-full lg:w-auto mt-4 lg:mt-0'><ul className='flex justify-center items-center font-semibold'>
				<li><Link to={'/'} className='text-black md:text-lg text-md px-1 md:px-2 mx-2 hover:text-gray-600 transition duration-300 ease-in-out'>Home</Link></li>
				<li><Link to={'/faq'} className='text-black md:text-lg text-md px-1 md:px-2 mx-2 hover:text-gray-600 transition duration-300 ease-in-out'>FAQ</Link></li>
				<li><Link to={'/contacts'} className='text-black md:text-lg text-md px-1 md:px-2 mx-2 hover:text-gray-600 transition duration-300 ease-in-out'>Contact Us</Link></li>
			</ul></div>
		</div></div>

		{/* Popup */}
		{showPopup && (
			<div className="fixed inset-0 bg-white bg-opacity-70 flex items-center justify-center z-100"><div onClick={closePopup} className='fixed inset-0 z-150'></div>
				<div className="bg-white rounded-lg shadow p-6 w-80 lg:w-96 relative border-blue-600 border-opacity-70 border-2 z-200">
					<button className="absolute top-2 right-3 text-gray-500" onClick={closePopup}>✕</button>
					<h2 className="text-lg text-center font-semibold mb-4">{popupVariation} {popupState}</h2>
					<form onSubmit={handleSubmit}>
						{popupState === 'Registration' && (<>
							<div className='text-center my-6 w-100 py-2 bg-slate-200 rounded-lg'>
								<label htmlFor="image">
									<img src={image ? URL.createObjectURL(image) : assetsImages.upload_area} alt="Upload image" className='w-24 h-24 rounded-full inline-block' />
									<input onChange={e => setImage(e.target.files[0])} type="file" id='image' hidden />
									{popupVariation === "Company" ? (<p className='mt-2'>Upload company logo</p>) : (<p className='mt-2'>Upload your photo</p>)}
								</label>
							</div>
							<div className='border border-gray-300 px-4 py-2 flex items-center gap-2 rounded-full mt-2'>
								<img src={assetsImages.person_icon} className='h-4 w-4' alt="person icon" />
								<input onChange={e => setName(e.target.value)}
									value={name} placeholder={popupVariation === "Company" ? ('Company title') : ('Name')} className='no-focus text-sm border-none' type="text" required />
							</div>
						</>)}
						<div className='border border-gray-300 px-4 py-2 flex items-center gap-2 rounded-full mt-2'>
							<img src={assetsImages.email_icon} className='h-4 w-4' alt="email icon" />
							<input onChange={e => setEmail(e.target.value)}
								value={email} type="email" placeholder='Email' className='no-focus text-sm border-none' required />
						</div>
						<div className='border border-gray-300 px-4 py-2 flex items-center gap-2 rounded-full mt-2'>
							<img src={assetsImages.lock_icon} className='h-4 w-4' alt="lock icon" />
							<input onChange={e => setPassword(e.target.value)}
								value={password} type="password" placeholder='Password' className='no-focus text-sm border-none' required />
						</div>
						{popupState === 'Login' ? (<>
							<button type='submit' className='bg-blue-600 w-full text-white rounded-full py-2 mt-3 hover:bg-blue-500 transition duration-300 ease-in-out'>Login</button>
							<p className='text-center text-sm mt-5'>Don’t have an account?
								<span onClick={() => setPopupState("Registration")} className='text-blue-600 cursor-pointer ms-2'>Registration</span>
							</p>
						</>) : (<>
							<button type='submit' className='bg-blue-600 w-full text-white rounded-full py-2 mt-3 hover:bg-blue-500 transition duration-300 ease-in-out'>Submit</button>
							<p className='text-center text-sm mt-5'>Already have an account?
								<span onClick={() => setPopupState("Login")} className='text-blue-600 cursor-pointer ms-2 '>Login</span>
							</p>
						</>)}
					</form>
				</div></div>
		)}
		
	</>)
}

export default Header