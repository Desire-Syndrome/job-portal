const BASE_URL = import.meta.env.VITE_BACKEND_URL;
import { assetsImages } from '../../assets/images-data.js'

import { useEffect } from "react";

import { Link } from "react-router-dom"

import { useDispatch, useSelector } from "react-redux";
import { userApplicationsAction } from "../../redux/actions/UserActions.js"

import moment from 'moment';


const UserApplications = () => {

	const dispatch = useDispatch();
	const userApplicationsReducer = useSelector((state) => state.userApplicationsReducer);
	const { loading: applicationsLoading, error: applicationsError, applications = [] } = userApplicationsReducer;

	const { userInfo } = useSelector((state) => state.userLoginReducer);


	useEffect(() => {
		if (userInfo) {
			dispatch({ type: "USER_APPLICATIONS_RESET" });
			dispatch(userApplicationsAction());
		}
	}, [dispatch, userInfo]);


	return (

		<div className='container pe-3 py-8'>
			<table className='w-full max-w-4xl bg-white border border-gray-200 text-md max-lg:text-sm'>
				<thead>
					<tr className='border-b'>
						<th className='py-2 px-2 text-left'>Company</th>
						<th className='py-2 px-2 text-left'>Job Title</th>
						<th className='py-2 px-2 text-left max-md:hidden'>Location</th>
						<th className='py-2 px-2 text-left max-lg:hidden'>Date</th>
						<th className='py-2 px-2 text-left w-[100px] max-sm:w-[60px]'>Status</th>
					</tr>
				</thead>

				{applications && !applicationsLoading && (
					<tbody>
						{applications.map((application, i) => (
							<tr key={i} className='text-gray-700 border-b'>
								<td className='py-2 px-2 flex items-center'>
									<img className='w-7 h-7 rounded-full mr-3 max-md:w-4 max-md:h-4 max-md:mr-2' alt="logo"
										src={application.companyId.image ? `${BASE_URL}${application.companyId.image}` : assetsImages.upload_area} />
									{application.companyId.name}
								</td>
								<td className='py-2 px-2'>
									<Link to={`/job/${application.jobId._id}`} className='text-blue-900 hover:text-blue-500 transition duration-300 ease-in-out' >
										{application.jobId.title}
									</Link>
								</td>
								<td className='py-2 px-2 max-md:hidden'>{application.jobId.location}</td>
								<td className='py-2 px-2 max-lg:hidden'>{moment(application.date).format('D/M/YY')}</td>
								<td className='py-2 px-2 relative w-[100px] max-sm:w-[60px]'>
									<span className={`${application.status === 'Accepted' ? 'bg-green-100' : application.status === 'Rejected' ? 'bg-red-100' : 'bg-blue-100'} px-2 py-1 border`}>
										{application.status}
									</span>
								</td>
							</tr>
						))}
					</tbody>
				)}

			</table>
			
			{applicationsError &&
				<p className=" w-full max-w-4xl text-sm md:text-base mt-6">{applicationsError}</p>
			}

		</div>

	)
}

export default UserApplications