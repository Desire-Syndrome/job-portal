import { assetsImages } from '../assets/images-data'
import { jobCategories, jobLocations, jobs } from '../assets/mock-data'

import { useState, useEffect, useRef } from "react"

import Layouts from '../layouts/Layouts'
import JobCard from '../components/JobCard.jsx'


const Home = () => {

	const [showFilters, setShowFilters] = useState(false);
	const [selectedCategories, setSelectedCategories] = useState([]);
	const [selectedLocations, setSelectedLocations] = useState([]);
	const [filteredJobs, setFilteredJobs] = useState(jobs);

	const [isSearched, setIsSearched] = useState(false);
	const [searchByTitle, setSearchByTitle] = useState("");
	const titleRef = useRef(null);


	// functions for filter and search
	const handleCategoryChange = (category) => {
		setSelectedCategories(prev => prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category])
	}
	const handleLocationChange = (location) => {
		setSelectedLocations(prev => prev.includes(location) ? prev.filter(c => c !== location) : [...prev, location])
	}
	const onSearch = () => {
		setSearchByTitle(titleRef.current.value);
		titleRef.current.value = "";
		setIsSearched(true);
	}
	useEffect(() => { // update filtered jobs
		const matchesCategory = job => selectedCategories.length === 0 || selectedCategories.includes(job.category);
		const matchesLocation = job => selectedLocations.length === 0 || selectedLocations.includes(job.location);
		const matchesTitle = job => searchByTitle.title === "" || job.title.toLowerCase().includes(searchByTitle.toLowerCase());
		// set jobs
		const newFilteredJobs = jobs.slice().reverse().filter(
			job => matchesCategory(job) && matchesLocation(job) && matchesTitle(job)
		)
		setFilteredJobs(newFilteredJobs);
	}, [selectedCategories, selectedLocations, searchByTitle])


	return (<Layouts>

		<div className='container 2xl:px-20 mx-auto my-10'>
			<div className='bg-gradient-to-t from-blue-400 to-blue-950 text-white py-16 text-center mx-2 rounded-xl'>
				<h2 className='text-2xl md:text-3xl lg:text-4xl font-medium mb-4'>Over {jobs.length-1}+ jobs to apply</h2>
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
			{/* SideBar */}
			<div className='w-full lg:w-1/4 bg-white px-4'>
				{/* data from search */}
				{(isSearched && searchByTitle !== "") && (
					<div><h3 className='font-medium text-lg mb-3'>Current search</h3><div className='mb-2 text-gray-400'>
							<span className='inline-flex items-center gap-2.5 ml-1 mr-1 text-gray-700 bg-blue-100 border border-blue-200 px-4 py-1.5 rounded'>
								{searchByTitle}
								<img onClick={() => setSearchByTitle("")} src={assetsImages.cross_icon} alt="cross-icon" className="cursor-pointer" />
							</span> 
					</div></div>
				)}
				{/* hide-open filters */}
				<button onClick={() => setShowFilters(prev => !prev)} className='lg:hidden block mt-4 px-6 py-1.5 rounded border border-gray-600 hover:bg-blue-100 transition duration-300 ease-in-out'>
					{showFilters ? "Close Filters" : "Open Filters"}
				</button>
				{/* category filter */}
				<div className={showFilters ? "mt-2" : "max-lg:hidden mt-2"}>
					<h4 className='font-medium text-lg py-4'>Search by Categories</h4>
					<ul className='space-y-2 text-gray-600'>
						{jobCategories.map((category, i) => (
							<li key={i} className='flex gap-3 items-center'>
								<input onChange={() => handleCategoryChange(category)} checked={selectedCategories.includes(category)}
									type="checkbox" className='cursor-pointer' />{category}
							</li>
						))}
					</ul>
				</div>
				{/* location filter */}
				<div className={showFilters ? "mt-2" : "max-lg:hidden mt-2"}>
					<h4 className='font-medium text-lg py-4'>Search by Location</h4>
					<ul className='space-y-2 text-gray-600'>
						{jobLocations.map((location, i) => (
							<li key={i} className='flex gap-3 items-center'>
								<input onChange={() => handleLocationChange(location)} checked={selectedLocations.includes(location)}
									type="checkbox" className='cursor-pointer' />{location}
							</li>
						))}
					</ul>
				</div>
			</div>
			{/* JobList */}
			<section className='w-full lg:w-3/4 text-gray-800 max-lg:px-4'>
				<h3 id='job-list' className='font-medium text-3xl py-2'>Latest jobs</h3>
				<p className='mb-8'>Get your desired job from top companies</p>
				<div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>
					{filteredJobs.map((job, i) => (
						<JobCard key={i} job={job} />
					))}
				</div>
			</section>
		</div>

	</Layouts>)
}

export default Home