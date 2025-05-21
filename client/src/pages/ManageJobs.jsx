import { manageJobs } from '../assets/mock-data'

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"

import moment from 'moment';


const ManageJobs = () => {

	const navigate = useNavigate();

	const [jobs, setJobs] = useState([]);

	useEffect(() => {
		setJobs(manageJobs);
	}, [])

	return (
		<div className='container max-w-5xl py-8'>
			<div className='overflow-x-auto'>
				<table className='min-w-full bg-white border border-gray-200 max-lg:text-sm'>
					<thead>
						<tr className='border-b'>
							<th className='py-2 px-2 text-left text-sm'>#</th>
							<th className='py-2 px-2 text-left text-sm'>Job Title</th>
							<th className='py-2 px-2 text-left text-sm max-lg:hidden'>Date</th>
							<th className='py-2 px-2 text-left text-sm max-md:hidden'>Location</th>
							<th className='py-2 px-2 text-center text-sm w-[100px]'>Applicants</th>
							<th className='py-2 px-2 text-center text-sm w-[100px]'>Visible</th>
						</tr>
					</thead>
					<tbody>
						{jobs.map((job, i) => (
							<tr key={i} className='text-gray-700'>
								<td className='py-2 px-2 bordeb-b text-left text-sm'>{i + 1}</td>
								<td className='py-2 px-2 bordeb-b text-left text-sm'>
									<Link to={`/job/${job._id}`} className='text-blue-900 hover:text-blue-500 transition duration-300 ease-in-out'>{job.title}</Link>
								</td>
								<td className='py-2 px-2 bordeb-b text-left text-sm max-lg:hidden'>{moment(job.date).format('ll')}</td>
								<td className='py-2 px-2 bordeb-b text-left text-sm max-md:hidden'>{job.location}</td>
								<td className='py-2 px-2 bordeb-b text-center text-sm w-[100px]'>{job.applicants}</td>
								<td className='py-2 px-2 bordeb-b text-center text-sm w-[100px]'>
									<input
										type="checkbox" className='scale-125  border-gray-500' />
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<div className='mt-4 flex justify-end'>
				<button onClick={() => { navigate(`/dashboard/add-job`); scrollTo(0, 0) }}
					className="mt-5 bg-blue-600 rounded px-8 py-3 text-white hover:bg-blue-500 transition duration-300 ease-in-out">Add new job</button>
			</div>
		</div>
	)
}

export default ManageJobs