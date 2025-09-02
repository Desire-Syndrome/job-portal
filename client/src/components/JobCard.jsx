const BASE_URL = import.meta.env.VITE_BACKEND_URL;
import { assetsImages } from '../assets/images-data'

import { useNavigate } from 'react-router-dom';

import { useSelector } from "react-redux";


const JobCard = ({ job }) => {

	const navigate = useNavigate();
 
	const { companyInfo } = useSelector((state) => state.companyLoginReducer);

	
	return (

		<div className="border p-6 shadow rounded">
			<div className="flex justify-between items-center">
				<img src={job.companyId.image ? `${BASE_URL}${job.companyId.image}` : assetsImages.upload_area} className="h-12 w-12 object-cover" alt="Company logo" /> 
			</div>
			<h4 className="font-medium text-xl mt-2">{job.title}</h4>
			<div className="flex items-center mt-3 gap-3 text-xs">
				<span className="bg-blue-100 border-blue-200 border px-4 py-1.5 rounded">{job.location}</span>
				<span className="bg-red-100 border-red-300 border px-4 py-1.5 rounded">{job.level}</span>
			</div>
			<p className="text-gray-500 text-sm mt-4"
				dangerouslySetInnerHTML={{ __html: job.description.slice(0, 150) }}></p>
			<div className="mt-4 flex gap-4 text-sm">
				{!companyInfo && (
	<button onClick={() => { navigate(`/job/${job._id}`) }}
					className="bg-blue-600 rounded px-4 py-2 text-white hover:bg-blue-500 transition duration-300 ease-in-out">Apply now</button>
)}
				<button onClick={() => { navigate(`/job/${job._id}`) }}
					className="text-gray-500 border border-gray-500 rounded px-4 py-2 hover:bg-blue-100 transition duration-300 ease-in-out">Learn more</button>
			</div>
		</div>
		
	)
}

export default JobCard