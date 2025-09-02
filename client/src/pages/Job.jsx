const BASE_URL = import.meta.env.VITE_BACKEND_URL;
import { assetsImages } from '../assets/images-data'

import { useEffect, useMemo } from "react"
import { useParams } from 'react-router-dom'

import { useDispatch, useSelector } from "react-redux";
import { getJobAction, getJobsListAction } from "../redux/actions/JobActions.js"
import { applyForJobAction } from "../redux/actions/UserActions.js"

import kconvert from 'k-convert';
import moment from 'moment';

import JobCard from '../components/JobCard.jsx'
import Layouts from '../layouts/Layouts'


const Job = () => {

	const { id } = useParams();

	const dispatch = useDispatch();
	const jobReducer = useSelector((state) => state.jobReducer);
	const { loading: jobLoading, error: jobError, job } = jobReducer;
	const jobsListReducer = useSelector((state) => state.jobsListReducer);
	const { loading: jobsLoading, jobs = [] } = jobsListReducer;
	const userApplyReducer = useSelector((state) => state.userApplyReducer);
	const { loading: applyLoading, error: applyError, success: applySuccess } = userApplyReducer;

	const { companyInfo } = useSelector((state) => state.companyLoginReducer);


	useEffect(() => {
		dispatch(getJobAction(id))
		dispatch(getJobsListAction());
	}, [dispatch, id]);

	const relatedJobs = useMemo(() => {
		if (!jobsLoading && jobs.length > 0 && job) {
			return jobs
				.filter(j => j._id !== job._id && j.companyId._id === job.companyId._id)
				.sort(() => Math.random() - 0.5)
				.slice(0, 3);
		}
		return [];
	}, [jobsLoading, jobs, job]);


	const applyHandler = () => {
		dispatch(applyForJobAction(job._id));
	};

	useEffect(() => {
		if (applyError || applySuccess) {
			const timer = setTimeout(() => {
				dispatch({ type: "USER_APPLY_RESET" });
			}, 3000);
			return () => clearTimeout(timer);
		}
	}, [dispatch, applyError, applySuccess]);


	return (<Layouts>

		{job && !jobLoading ? (
			<div className='min-h-screen flex flex-col py-10 container px-4 2xl:px-20 mx-auto'>
				<div className='bg-white text-black rounded-lg w-full'>

					<div className='lg:flex lg:justify-between flex-wrap gap-8 px-14 py-10 mb-6 bg-sky-50 border border-sky-400 rounded-xl'>
						<div className='flex flex-col md:flex-row items-center'>
							<img src={job.companyId.image ? `${BASE_URL}${job.companyId.image}` : assetsImages.upload_area} alt="company logo" className='w-[180px] h-[180px] object-cover bg-white rounded-lg p-4 mr-4 max-md:mb-4 border' />
							<div className='text-center md:text-left text-neutral-700'>
								<h1 className='text-2xl sm:text-4xl font-medium'>{job.title}</h1>
								<div className='flex flex-row flex-wrap max-md:justify-center gap-y-2 gap-6 items-center text-gray-600 mt-2'>
									<span className='flex items-center gap-1'>
										<img src={assetsImages.suitcase_icon} alt="suitcase icon" />
										{job.companyId.name}
									</span>
									<span className='flex items-center gap-1'>
										<img src={assetsImages.location_icon} alt="location icon" />
										{job.location}
									</span>
									<span className='flex items-center gap-1'>
										<img src={assetsImages.person_icon} alt="person icon" />
										{job.level}
									</span>
									<span className='flex items-center gap-1'>
										<img src={assetsImages.money_icon} alt="money icon" />
										CTC: {kconvert.convertTo(job.salary)}
									</span>
								</div>
							</div>
						</div>
						<div className='mt-10 flex flex-col justify-center text-end text-sm max-md:mx-auto max-md:text-center'>
							{!companyInfo && (
								<button onClick={applyHandler} disabled={applyLoading || applyError || applySuccess} className='bg-blue-600 p-2.5 px-10 text-white rounded hover:bg-blue-500 transition duration-300 ease-in-out'>
									{applyLoading ? "Applying..." : "Apply now"}
								</button>
							)}
							<p className='mt-2 text-center text-gray-600'>Posted {moment(job.date).fromNow()}</p>
						</div>
					</div>
					<div className='flex flex-col lg:flex-row justify-between items-start'>

						<div className='w-full lg:w-2/3 mt-4'>
							<h2 className='font-bold text-2xl mb-4 text-zinc-800'>Job description</h2>
							<div className='rich-text'
								dangerouslySetInnerHTML={{ __html: job.description }}></div>
							{!companyInfo && (
								<div className='flex items-center mt-10'>
									<button onClick={applyHandler} disabled={applyLoading || applyError || applySuccess} className='bg-blue-600 p-2.5 px-10 text-white rounded hover:bg-blue-500 transition duration-300 ease-in-out'>
										{applyLoading ? "Applying..." : "Apply now"}
									</button>
									{applyError && <p className="bg-red-500 p-2.5 px-10 ms-4 text-white rounded">{applyError}</p>}
									{applySuccess && <p className="bg-gray-500 p-2.5 px-10 ms-4 text-white rounded">Successfully applied</p>}
								</div>
							)}
						</div>

						<div className='w-full lg:w-1/3 mt-10 lg:mt-6 lg:ml-8 space-y-5'>
							<h3 className='font-bold mb-4 text-zinc-800'>More jobs from {job.companyId.name}</h3>
							{!jobsLoading ? (
								relatedJobs.map((j, i) => <JobCard key={i} job={j} />)
							) : (
								<p>Loading...</p>
							)}
						</div>
					</div>
				</div>
			</div>
		) : (
			<div className='py-10 container px-4 2xl:px-20 mx-auto'>
				<p className='text-lg sm:text-xl font-medium  text-center text-neutral-700'>{jobError}</p>
			</div>
		)}

	</Layouts>)
}

export default Job