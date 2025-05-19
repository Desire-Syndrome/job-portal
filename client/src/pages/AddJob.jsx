import { jobCategories, jobLocations, jobLevels } from '../assets/mock-data'

import { useState, useEffect, useRef } from "react";

import Quill from 'quill';


const AddJob = () => {

	const [title, setTitle] = useState("");
	const [location, setLocation] = useState(jobLocations[0]);
	const [category, setCategory] = useState(jobCategories[0]);
	const [level, setLevel] = useState("Beginner");
	const [salary, setSalary] = useState(0);

	const editorRef = useRef(null);
	const quillRef = useRef(null);


	useEffect(() => {
		if (!quillRef.current && editorRef.current) {
			quillRef.current = new Quill(editorRef.current, {
				theme: 'snow'
			})
		}
	}, [])


	return (

		<form className='container py-8 flex flex-col w-full items-start gap-3'>
			<div className='w-full'>
				<p className='mb-2'>Job Title</p>
				<input onChange={e => setTitle(e.target.value)} value={title}
					type="text" placeholder="" className='w-full max-w-3xl py-2 border-2 border-gray-300' required />
			</div>
			<div className='max-w-3xl w-full'>
				<p className='my-2'>Job Description</p>
				<div className='my-quil' ref={editorRef}></div>
			</div>
			<div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
				<div>
					<p className='mb-2'>Job Category</p>
					<select onChange={e => setCategory(e.target.value)} className='w-full px-3 py-2 border-2 border-gray-300'>
						{jobCategories.map((category, i) => (
							<option value={category} key={i}>{category}</option>
						))}
					</select>
				</div>
				<div>
					<p className='mb-2'>Job Location</p>
					<select onChange={e => setLocation(e.target.value)} className='w-full px-3 py-2 border-2 border-gray-300'>
						{jobLocations.map((location, i) => (
							<option value={location} key={i}>{location}</option>
						))}
					</select>
				</div>
				<div>
					<p className='mb-2'>Job Level</p>
					<select onChange={e => setLevel(e.target.value)} className='w-full px-3 py-2 border-2 border-gray-300'>
						{jobLevels.map((level, i) => (
							<option value={level} key={i}>{level}</option>
						))}
					</select>
				</div>
				<div>
					<p className='mb-2'>Job Salary</p>
					<input onChange={e => setSalary(e.target.value)} value={salary} min={0}
						type="number" placeholder="" className='px-3 py-2 border-2 border-gray-300 w-[125px]' required />
				</div>
			</div>
			<button className="mt-5 bg-blue-600 rounded px-12 py-3 text-white hover:bg-blue-500 transition duration-300 ease-in-out">Post job</button>
		</form>

	)
}

export default AddJob