import { assetsImages } from '../assets/images-data'
import { user } from '../assets/mock-data'

import { useState } from "react";


const UserInfo = () => {

	const [name, setName] = useState(user.name);
	const [email, setEmail] = useState(user.email);
	const [password, setPassword] = useState(user.password);
	const [image, setImage] = useState(user.image);
	const [isResumeEdit, setIsResumeEdit] = useState(false);
	const [resume, setResume] = useState(user.resume);


	return (

		<form className='container py-8 flex flex-col w-full items-start gap-3'>
			<div className='w-full max-w-xl py-4  bg-slate-200 rounded-lg'>
				<label htmlFor="image">
					<img src={image ? typeof image === 'string' ? image : URL.createObjectURL(image) : assetsImages.upload_area} alt="Upload image" className='w-24 h-24 ms-5 rounded-full inline-block cursor-pointer' />
					<input onChange={e => setImage(e.target.files[0])} type="file" id='image' hidden />
					<p className='ms-5 px-2 py-5 cursor-pointer inline-block'>Change photo</p>
				</label>
			</div>
			<div className="flex gap-2 mb-3 mt-3">
				{isResumeEdit || user && user.resume === "" ? (<>
					<label className='flex items-center' htmlFor="resume-upload">
						<p className='bg-blue-100 text-blue-600 px-4 py-2 rounded-lg cursor-pointer'>
							{resume?.name || "Select Resume"}
						</p>
						<input onChange={e => setResume(e.target.files[0])}
							accept="application/pdf" id="resume-upload" type="file" hidden />
					</label>
					<button onClick={() => setIsResumeEdit(false)}
						className='bg-green-100 border border-green-400 rounded-lg px-4 py-2 hover:bg-green-200 transition duration-300 ease-in-out'>Confirm</button>
				</>) : (
					<div className="flex items-center ">
						<a href="#" className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg mr-2 cursor-pointer">
							{user?.resume ? user.resume : resume?.name ? resume.name : "No Resume"}
						</a>
						<button onClick={() => {setIsResumeEdit(true); user.resume = resume.name}}
							className="text-gray-500 border border-gray-300 rounded-lg px-4 py-2 hover:border-gray-500 hover:text-gray-700 transition duration-300 ease-in-out">Edit</button>
					</div>
				)}
			</div>
			<div className='w-full max-w-xl'>
				<p className='mb-2'>Name</p>
				<input onChange={e => setName(e.target.value)} value={name}
					type="text" placeholder="" className='w-full max-w-3xl py-2 border-2 border-gray-300' />
			</div>
			<div className='w-full max-w-xl'>
				<p className='mb-2'>Email</p>
				<input onChange={e => setEmail(e.target.value)} value={email}
					type="email" placeholder="" className='w-full max-w-3xl py-2 border-2 border-gray-300' />
			</div>
			<div className='w-full max-w-xl'>
				<p className='mb-2'>Password</p>
				<input onChange={e => setPassword(e.target.value)} value={password}
					type="password" placeholder="" className='w-full max-w-3xl py-2 border-2 border-gray-300' />
			</div>
			<div className='mt-5'>
				<button className="bg-blue-600 rounded px-8 py-3 text-white hover:bg-blue-500 transition duration-300 ease-in-out">Update Profile</button>
				<button className="ms-5 bg-red-600 rounded px-8 py-3 text-white hover:bg-red-500 transition duration-300 ease-in-out">Delete Profile</button>
			</div>
		</form>

	)
}

export default UserInfo