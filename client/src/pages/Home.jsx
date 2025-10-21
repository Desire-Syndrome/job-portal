import { assetsImages } from '../assets/images-data'
import { jobCategories, jobLocations } from '../assets/mock-data'

import { useState, useEffect, useRef } from "react"

import { useSearchParams } from "react-router-dom"

import { useDispatch, useSelector } from "react-redux";
import { getJobsListAction } from "../redux/actions/JobActions.js"

import Layouts from '../layouts/Layouts'
import JobCard from '../components/JobCard.jsx'


const Home = () => {

	// url params
	const [searchParams, setSearchParams] = useSearchParams();

	// filters
	const [showFilters, setShowFilters] = useState(false);
	const [selectedCategories, setSelectedCategories] = useState([]);
	const [selectedLocations, setSelectedLocations] = useState([]);

	// search
	const [isSearched, setIsSearched] = useState(false);
	const [searchByTitle, setSearchByTitle] = useState("");
	const titleRef = useRef(null);

	// page pagination
	const initialPage = Number(searchParams.get("page")) || 1;
	const [currentPage, setCurrentPage] = useState(initialPage);
	const articlesPerPage = 3;

	// redux
	const dispatch = useDispatch();
	const jobsListReducer = useSelector((state) => state.jobsListReducer);
	const { loading: jobsLoading, jobs = [], totalPages, totalJobs } = jobsListReducer;


	// get jobsList
	useEffect(() => {
		dispatch(getJobsListAction(currentPage, articlesPerPage, selectedCategories, selectedLocations, searchByTitle));
	}, [dispatch, currentPage, articlesPerPage, selectedCategories, selectedLocations, searchByTitle]);

	// filter jobs
	const handleCategoryChange = (category) => {
		setSelectedCategories(prev => prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]);
		setCurrentPage(1);
	}
	const handleLocationChange = (location) => {
		setSelectedLocations(prev => prev.includes(location) ? prev.filter(c => c !== location) : [...prev, location]);
		setCurrentPage(1);
	}
	const onSearch = () => {
		setSearchByTitle(titleRef.current.value);
		titleRef.current.value = "";
		setIsSearched(true);
		setCurrentPage(1);
	}

	// get params from url
	useEffect(() => {
		const categoriesFromUrl = searchParams.get("categories")?.split(',') || [];
		const locationsFromUrl = searchParams.get("locations")?.split(',') || [];
		const titleFromUrl = searchParams.get("title") || "";
		const pageFromUrl = Number(searchParams.get("page")) || 1;

		setSelectedCategories(categoriesFromUrl);
		setSelectedLocations(locationsFromUrl);
		setSearchByTitle(titleFromUrl);
		setIsSearched(Boolean(titleFromUrl));
		setCurrentPage(pageFromUrl);
	}, [searchParams]);

	// change url params
	useEffect(() => {
		const params = {};

		if (currentPage > 1) params.page = currentPage;
		if (selectedCategories.length > 0) params.categories = selectedCategories.join(',');
		if (selectedLocations.length > 0) params.locations = selectedLocations.join(',');
		if (searchByTitle) params.title = searchByTitle;

		setSearchParams(params);
	}, [currentPage, selectedCategories, selectedLocations, searchByTitle, setSearchParams]);

	// switch pages
	const nextPage = () => {
		if (currentPage < totalPages) { setCurrentPage((prev) => prev + 1); }
	};
	const prevPage = () => {
		if (currentPage > 1) { setCurrentPage((prev) => prev - 1); }
	};


	return (<Layouts>

		<div className='container 2xl:px-20 mx-auto my-10'>
			<div className='bg-gradient-to-t from-blue-400 to-blue-950 text-white py-16 text-center mx-2 rounded-xl'>
				<h2 className='text-2xl md:text-3xl lg:text-4xl font-medium mb-4'>Over {totalJobs - 1}+ jobs to apply</h2>
				<p className='mb-8 max-w-xl mx-auto text-sm font-light px-5'>Your Next Big Career Move Starts Right Here.<br />Explore the Best Job Opportunities and Take the First Step Toward Your Future!</p>
				<div className='w-10/12 lg:w-full flex items-center justify-center bg-white rounded text-gray-600 max-w-xl pl-4 mx-auto'>
					<div className='w-full flex items-center'>
						<img className='h-4 sm:h-5' src={assetsImages.search_icon} alt="Search icon" />
						<input ref={titleRef}
							type="text" placeholder='Search by title...' className='no-focus max-sm:text-xs p-2 rounded outline-none w-full border-none' />
					</div>
					<button onClick={onSearch}
						className='bg-blue-600 px-6 py-2 rounded text-white m-1 hover:bg-blue-500 transition duration-300 ease-in-out'>Search</button>
				</div>
			</div>
			<div className='border border-gray-300 shadow-md mx-2 mt-5 p-6 rounded-md'>
				<div className='flex justify-start gap-10 lg:gap-16 flex-wrap'>
					<p className='font-medium'>Trasted by:</p>
					<img className='h-6' src={assetsImages.microsoft_logo} alt="Company Logo" />
					<img className='h-6' src={assetsImages.adobe_logo} alt="Company Logo" />
					<img className='h-6' src={assetsImages.amazon_logo} alt="Company Logo" />
					<img className='h-6' src={assetsImages.walmart_logo} alt="Company Logo" />
					<img className='h-6' src={assetsImages.accenture_logo} alt="Company Logo" />
				</div>
			</div>
		</div>

		<div className='container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8'>
			<div className='w-full lg:w-1/4 bg-white px-4'>

				{(isSearched && searchByTitle !== "") && (
					<div><h3 className='font-medium text-lg mb-3'>Current search</h3><div className='mb-2 text-gray-400'>
						<span className='inline-flex items-center gap-2.5 ml-1 mr-1 text-gray-700 bg-blue-100 border border-blue-200 px-4 py-1.5 rounded'>
							{searchByTitle}
							<img onClick={() => setSearchByTitle("")} src={assetsImages.cross_icon} alt="cross-icon" className="cursor-pointer" />
						</span>
					</div></div>
				)}

				<button onClick={() => setShowFilters(prev => !prev)} className='lg:hidden block mt-4 px-6 py-1.5 rounded border border-gray-600 hover:bg-blue-100 transition duration-300 ease-in-out'>
					{showFilters ? "Close Filters" : "Open Filters"}
				</button>
				<div className={showFilters ? "mt-2" : "max-lg:hidden mt-2"}>
					<h4 className='font-medium text-lg py-4'>Search by Categories</h4>
					<ul className='space-y-2 text-gray-600'>
						{jobCategories.map((category, i) => (
							<li key={i} className='flex gap-3 items-center'>
								<input onChange={() => handleCategoryChange(category)} checked={selectedCategories.includes(category)}
									type="checkbox" className='cursor-pointer border-gray-400' />{category}
							</li>
						))}
					</ul>
				</div>
				<div className={showFilters ? "mt-2" : "max-lg:hidden mt-2"}>
					<h4 className='font-medium text-lg py-4'>Search by Location</h4>
					<ul className='space-y-2 text-gray-600'>
						{jobLocations.map((location, i) => (
							<li key={i} className='flex gap-3 items-center'>
								<input onChange={() => handleLocationChange(location)} checked={selectedLocations.includes(location)}
									type="checkbox" className='cursor-pointer border-gray-400' />{location}
							</li>
						))}
					</ul>
				</div>
			</div>

			<section className='w-full lg:w-3/4 text-gray-800 max-lg:px-4'>
				<h3 id='job-list' className='font-medium text-3xl py-2'>Latest jobs</h3>
				<p className='mb-8'>Get your desired job from top companies</p>
				{!jobsLoading && jobs.length > 0 ? (
					<div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>
						{jobs.map((job, i) => (
							<JobCard key={i} job={job} />
						))}
					</div>
				) : (
					<p>Nothing found, please change your search criteria...</p>
				)}

				{totalPages > 1 &&
					<div className="flex flex-col items-center mt-6">
						<span className="mb-2">Page {currentPage} from {totalPages}</span>
						<div className="flex gap-4 text-sm">
							<button onClick={prevPage} disabled={currentPage === 1}
								className="bg-blue-600 rounded px-4 py-1 text-white hover:bg-blue-500 transition duration-300 ease-in-out disabled:bg-gray-400 disabled:hover:bg-gray-400">Prev</button>
							<button onClick={nextPage} disabled={currentPage === totalPages}
								className="bg-blue-600 rounded px-4 py-1 text-white hover:bg-blue-500 transition duration-300 ease-in-out disabled:bg-gray-400 disabled:hover:bg-gray-400">Next</button>
						</div>
					</div>
				}

			</section>

		</div>

	</Layouts>)
}

export default Home