import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

import {
GET_ALL_JOBS_REQ, GET_ALL_JOBS_SUCCESS, GET_ALL_JOBS_FAIL, GET_ALL_JOBS_RESET,
} from "../constants/JobConstants";


export const getJobsListAction = () => async (dispatch) => {
	try {
		dispatch({ type: GET_ALL_JOBS_REQ });
		const { data } = await axios.get(`${BASE_URL}/api/jobs`);
		dispatch({ 
			type: GET_ALL_JOBS_SUCCESS,
			payload: data
		});
	} catch (error) { 
		dispatch({ 
			type: GET_ALL_JOBS_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message
		});
	}
};