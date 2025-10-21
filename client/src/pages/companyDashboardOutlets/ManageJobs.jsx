import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"

import { useDispatch, useSelector } from "react-redux";
import { companyGetJobsAction, companyJobVisibilityAction } from "../../redux/actions/CompanyActions.js"

import moment from 'moment';


const ManageJobs = () => {

	const navigate = useNavigate();

	// redux
	const dispatch = useDispatch();
	const companyGetJobsReducer = useSelector((state) => state.companyGetJobsReducer);
	const { loading: jobsLoading, error: jobsError, jobs = [] } = companyGetJobsReducer;

	const { companyInfo } = useSelector((state) => state.companyLoginReducer);


	// get company jobs
	useEffect(() => {
		if (companyInfo) {
			dispatch({ type: "COMPANY_GET_JOBS_RESET" });
			dispatch(companyGetJobsAction());
		}
	}, [dispatch, companyInfo]);

	
	// update job visibility
  const handleJobVisibility = (jobId) => {
    dispatch(companyJobVisibilityAction(jobId));

    const checkbox = document.getElementById(jobId);
    if (checkbox){checkbox.disabled = true;} 
    setTimeout(() => { 
			if (checkbox) checkbox.disabled = false 
		}, 500);
  };


	return (

		<div className='container pe-3 py-8'>
			<table className='min-w-full bg-white border border-gray-200 text-md max-lg:text-sm'>
				<thead>
					<tr className='border-b'>
						<th className='py-2 px-2 text-left max-sm:hidden'>#</th>
						<th className='py-2 px-2 text-left'>Job Title</th>
						<th className='py-2 px-2 text-left max-lg:hidden'>Date</th>
						<th className='py-2 px-2 text-left max-md:hidden'>Location</th>
						<th className='py-2 px-2 text-center w-[100px]'>Applicants</th>
						<th className='py-2 px-2 text-center w-[100px]'>Visible</th>
					</tr>
				</thead>

				{jobs && !jobsLoading && (
				<tbody>
					{jobs.map((job, i) => (
						<tr key={i} className='text-gray-700 border-b'>
							<td className='py-2 px-2 text-left max-sm:hidden'>{i + 1}</td>
							<td className='py-2 px-2 text-left'>
								<Link to={`/job/${job._id}`} className='text-blue-900 hover:text-blue-500 transition duration-300 ease-in-out'>{job.title}</Link>
							</td>
							<td className='py-2 px-2 text-left max-lg:hidden'>{moment(job.date).format('D/M/YY')}</td>
							<td className='py-2 px-2 text-left max-md:hidden'>{job.location}</td>
							<td className='py-2 px-2 text-center w-[100px]'>{job.applicants}</td>
							<td className='py-2 px-2 text-center w-[100px]'>
								<input type="checkbox" className='mb-1 scale-125 max-lg:scale-100 border-gray-400' 
								id={job._id} defaultChecked={job.visible} onChange={() => handleJobVisibility(job._id)} />
							</td>
						</tr>
					))}
				</tbody>
				)}

			</table>

			{jobsError &&
				<p className=" w-full max-w-4xl text-sm md:text-base mt-6">{jobsError}</p>
			}

			<div className='mt-4 flex justify-end'>
				<button onClick={() => { navigate(`/dashboard/add-job`); scrollTo(0, 0) }}
					className="mt-5 bg-blue-600 rounded px-8 py-3 text-white hover:bg-blue-500 transition duration-300 ease-in-out">Add Job</button>
			</div>
		</div>

	)
}

export default ManageJobs