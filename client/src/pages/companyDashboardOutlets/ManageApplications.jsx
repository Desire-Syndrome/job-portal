const BASE_URL = import.meta.env.VITE_BACKEND_URL;
import { assetsImages } from '../../assets/images-data.js'

import { useEffect } from "react";

import { Link } from "react-router-dom"

import { useDispatch, useSelector } from "react-redux";
import { companyApplicantsAction } from "../../redux/actions/CompanyActions.js"


const ManageApplications = () => {
 
	const dispatch = useDispatch();
	const companyApplicantsReducer = useSelector((state) => state.companyApplicantsReducer);
	const { loading: applicantsLoading, error: applicantsError, applicants = [] } = companyApplicantsReducer;

	const { companyInfo } = useSelector((state) => state.companyLoginReducer);


	useEffect(() => {
		if (companyInfo) {
			dispatch({ type: "COMPANY_GET_APPLICANTS_RESET" });
			dispatch(companyApplicantsAction());
		}
	}, [dispatch, companyInfo]);


	return (

		<div className='container pe-3 py-8'>
				<table className='min-w-full bg-white border border-gray-200 text-md max-lg:text-sm'>
					<thead>
						<tr className='border-b'>
							<th className='py-2 px-2 text-left max-sm:hidden'>#</th>
							<th className='py-2 px-2 text-left'>User name</th>
							<th className='py-2 px-2 text-left max-lg:hidden'>Job Title</th>
							<th className='py-2 px-2 text-left max-xl:hidden'>Location</th>
							<th className='py-2 px-2 text-left'>Resume</th>
							<th className='py-2 px-2 text-left w-[100px] max-sm:w-[60px]'>Action</th>
						</tr>
					</thead>

					{applicants && !applicantsLoading && (
					<tbody>
						{applicants.map((applicant, i) => (
							<tr key={i} className='text-gray-700 border-b'>
								<td className='py-2 px-2 text-left max-sm:hidden'>{i + 1}</td>
								<td className='py-2 px-2 flex items-center'>
									<img alt="User avatar" className='w-10 h-10 rounded-full mr-3 max-md:w-7 max-md:h-7 max-md:mr-2' 
									src={applicant.userId.image ? `${BASE_URL}${applicant.userId.image}` : assetsImages.upload_area} />
									<span>{applicant.userId.name}</span>
								</td>
								<td className='py-2 px-2 max-lg:hidden'>
									<Link to={`/job/${applicant.jobId._id}`} className='text-blue-900 hover:text-blue-500 transition duration-300 ease-in-out' >
										{applicant.jobId.title}
									</Link>
									</td>
								<td className='py-2 px-2 max-xl:hidden'>{applicant.jobId.location}</td>
								<td className='py-2 px-2 '>
									<a href={`${BASE_URL}${applicant.userId.resume}`} download target='_blank' className='bg-blue-50 text-blue-500 px-2 py-1 rounded inline-flex gap-2 items-center'>
										Resume <img src={assetsImages.resume_download_icon} alt="Resume" />
									</a>
								</td>
								<td className='py-2 px-2 relative w-[100px] max-sm:w-[60px]'>
									{applicant.status === "Pending" ? (
										<div className='relative inline-block text-left group'>
											<button className='text-gray-500 action-button text-lg'>•••</button>
											<div className='z-10 hidden absolute right-0 md:left-0 top-0 mt-2 w-32 bg-white border border-gray-200 shadow rounded group-hover:block'>
												<button 
													className='block w-full text-left px-4 py-2 text-blue-500 hover:bg-gray-200'>Accept</button>
												<button 
													className='block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-200'>Reject</button>
											</div>
										</div>
									) : (
										<div><span className={`${applicant.status === 'Accepted' ? 'bg-green-100' : applicant.status === 'Rejected' ? 'bg-red-100' : 'bg-blue-100'} px-2 py-1 border`}>{applicant.status}</span></div>
									)
									}
								</td>
							</tr>
						))}
					</tbody>
					)}

				</table>

			{applicantsError &&
				<p className=" w-full max-w-4xl text-sm md:text-base mt-6">{applicantsError}</p>
			}

		</div>

	)
}

export default ManageApplications