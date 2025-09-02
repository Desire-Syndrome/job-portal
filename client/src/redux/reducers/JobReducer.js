import {
	GET_ALL_JOBS_REQ, GET_ALL_JOBS_SUCCESS, GET_ALL_JOBS_FAIL, GET_ALL_JOBS_RESET,
	GET_JOB_REQ, GET_JOB_SUCCESS, GET_JOB_FAIL, GET_JOB_RESET,
} from "../constants/JobConstants";


const initialJobsListState = { jobs: [], loading: false, error: null }

export const jobsListReducer = (state = initialJobsListState, action) => {
	switch (action.type) {
		case GET_ALL_JOBS_REQ:
			return { ...state, loading: true}
		case GET_ALL_JOBS_SUCCESS: 
			return { loading: false, jobs: action.payload.jobs }
		case GET_ALL_JOBS_FAIL: 
			return { ...state, loading: false, error: action.payload }
		case GET_ALL_JOBS_RESET:
			return initialJobsListState;
		default: return state
	}
}


export const jobReducer = (state = {}, action) => {
	switch (action.type) {
		case GET_JOB_REQ:
			return { loading: true }
		case GET_JOB_SUCCESS: 
			return { loading: false, job: action.payload.job }
		case GET_JOB_FAIL: 
			return { loading: false, error: action.payload }
		case GET_JOB_RESET:
			return {};
		default: return state
	}
}