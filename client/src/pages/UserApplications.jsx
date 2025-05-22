import { userApplications } from '../assets/mock-data'

import { Link } from "react-router-dom"

import moment from 'moment';


const UserApplications = () => {

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
				<tbody>
					{userApplications.map((application, i) => (
						<tr key={i} className='text-gray-700 border-b'>
							<td className='py-2 px-2 flex items-center'>
								<img className='w-7 h-7 rounded-full mr-3 max-md:w-4 max-md:h-4 max-md:mr-2' src={application.logo} alt="logo" />{application.company}
							</td>
							<td className='py-2 px-2'><Link to={`/job/${application._id}`} className='text-blue-900 hover:text-blue-500 transition duration-300 ease-in-out'>{application.title}</Link></td>
							<td className='py-2 px-2 max-md:hidden'>{application.location}</td>
							<td className='py-2 px-2 max-lg:hidden'>{moment(application.date).format('D/M/YY')}</td>
							<td className='py-2 px-2 relative w-[100px] max-sm:w-[60px]'>
								<span className={`${application.status === 'Accepted' ? 'bg-green-100' : application.status === 'Rejected' ? 'bg-red-100' : 'bg-blue-100'} px-2 py-1 border`}>{application.status}</span>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>

	)
}

export default UserApplications