import {
	COMPANY_REGISTRATION_REQ, COMPANY_REGISTRATION_SUCCESS, COMPANY_REGISTRATION_FAIL, COMPANY_REGISTRATION_RESET,
	COMPANY_LOGIN_REQ, COMPANY_LOGIN_SUCCESS, COMPANY_LOGIN_FAIL, COMPANY_LOGOUT,
	COMPANY_UPDATE_REQ, COMPANY_UPDATE_SUCCESS, COMPANY_UPDATE_FAIL, COMPANY_UPDATE_RESET,
	COMPANY_REMOVE_REQ, COMPANY_REMOVE_SUCCESS, COMPANY_REMOVE_FAIL, COMPANY_REMOVE_RESET,
	COMPANY_POST_JOB_REQ, COMPANY_POST_JOB_SUCCESS, COMPANY_POST_JOB_FAIL, COMPANY_POST_JOB_RESET,
	COMPANY_GET_JOBS_REQ, COMPANY_GET_JOBS_SUCCESS, COMPANY_GET_JOBS_FAIL, COMPANY_GET_JOBS_RESET,
	COMPANY_GET_APPLICANTS_REQ, COMPANY_GET_APPLICANTS_SUCCESS, COMPANY_GET_APPLICANTS_FAIL, COMPANY_GET_APPLICANTS_RESET,
	COMPANY_APPLICANTION_STATUS_REQ, COMPANY_APPLICANTION_STATUS_SUCCESS, COMPANY_APPLICANTION_STATUS_FAIL, COMPANY_APPLICANTION_STATUS_RESET,
	COMPANY_JOB_VISIBILITY_REQ, COMPANY_JOB_VISIBILITY_SUCCESS, COMPANY_JOB_VISIBILITY_FAIL , COMPANY_JOB_VISIBILITY_RESET
} from "../constants/CompanyConstants";


export const companyRegisterReducer = (state = {}, action) => {
	switch (action.type) {
		case COMPANY_REGISTRATION_REQ:
			return { loading: true }
		case COMPANY_REGISTRATION_SUCCESS:
			return { loading: false, companyInfo: action.payload, success: true }
		case COMPANY_REGISTRATION_FAIL:
			return { loading: false, error: action.payload }
		case COMPANY_REGISTRATION_RESET:
			return {};
		default: return state
	}
}

export const companyLoginReducer = (state = {}, action) => {
	switch (action.type) {
		case COMPANY_LOGIN_REQ:
			return { loading: true }
		case COMPANY_LOGIN_SUCCESS:
			return { loading: false, companyInfo: action.payload, success: true }
		case COMPANY_LOGIN_FAIL:
			return { loading: false, error: action.payload }
		case COMPANY_LOGOUT:
			return {}
		default: return state
	}
}

export const companyUpdateReducer = (state = {}, action) => {
	switch (action.type) {
		case COMPANY_UPDATE_REQ:
			return { loading: true }
		case COMPANY_UPDATE_SUCCESS:
			return { loading: false, success: true }
		case COMPANY_UPDATE_FAIL:
			return { loading: false, error: action.payload }
		case COMPANY_UPDATE_RESET:
			return {};
		default: return state
	}
}


export const companyRemoveReducer = (state = {}, action) => {
	switch (action.type) {
		case COMPANY_REMOVE_REQ:
			return { loading: true };
		case COMPANY_REMOVE_SUCCESS:
			return { loading: false, success: true };
		case COMPANY_REMOVE_FAIL:
			return { loading: false, error: action.payload };
		case COMPANY_REMOVE_RESET:
			return {};
		default: return state;
	}
}


export const companyAddJobReducer = (state = {}, action) => {
	switch (action.type) {
		case COMPANY_POST_JOB_REQ:
			return { loading: true }
		case COMPANY_POST_JOB_SUCCESS: 
			return { loading: false, success: true, job: action.payload.job }
		case COMPANY_POST_JOB_FAIL: 
			return { loading: false, error: action.payload }
			case COMPANY_POST_JOB_RESET: 
			return {};
		default: return state
	}
}


const initialCompanyJobsState = { applications: [], loading: false, error: null }

export const companyGetJobsReducer = (state = initialCompanyJobsState, action) => {
	switch (action.type) {
		case COMPANY_GET_JOBS_REQ:
			return { ...state, loading: true}
		case COMPANY_GET_JOBS_SUCCESS: 
			return { loading: false, jobs: action.payload.jobs }
		case COMPANY_GET_JOBS_FAIL: 
			return { ...state, loading: false, error: action.payload }
		case COMPANY_GET_JOBS_RESET:
			return { ...initialCompanyJobsState };
		default: return state
	}
}


export const companyJobVisibilityReducer = (state = {}, action) => {
	switch (action.type) {
		case COMPANY_JOB_VISIBILITY_REQ:
			return { loading: true }
		case COMPANY_JOB_VISIBILITY_SUCCESS:
			return { loading: false, success: true }
		case COMPANY_JOB_VISIBILITY_FAIL:
			return { loading: false, error: action.payload }
		case COMPANY_JOB_VISIBILITY_RESET:
			return {};
		default: return state
	}
}