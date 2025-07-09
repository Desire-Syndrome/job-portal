import { assetsImages } from '../../assets/images-data'
import { company } from '../../assets/mock-data'

import { useState } from "react";


const CompanyInfo = () => {

	const [name, setName] = useState(company.name);
	const [email, setEmail] = useState(company.email);
	const [password, setPassword] = useState(company.password);
	const [image, setImage] = useState(company.image);


	return (

		<form className='container py-8 flex flex-col w-full items-start gap-3'>
			<div className='w-full max-w-xl py-4  bg-slate-200 rounded-lg'>
				<label htmlFor="image">
					<img src={image ? typeof image === 'string' ? image : URL.createObjectURL(image) : assetsImages.upload_area} alt="Upload image" className='w-24 h-24 ms-5 rounded-full inline-block cursor-pointer' />
					<input onChange={e => setImage(e.target.files[0])} type="file" id='image' hidden />
					<p className='ms-5 px-2 py-5 cursor-pointer inline-block'>Change company logo</p>
				</label>
			</div>
			<div className='w-full max-w-xl'>
				<p className='mb-2'>Company Title</p>
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

export default CompanyInfo