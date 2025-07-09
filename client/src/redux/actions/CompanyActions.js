import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

import {
	COMPANY_REGISTRATION_REQ, COMPANY_REGISTRATION_SUCCESS, COMPANY_REGISTRATION_FAIL, COMPANY_REGISTRATION_RESET,
	COMPANY_LOGIN_REQ, COMPANY_LOGIN_SUCCESS, COMPANY_LOGIN_FAIL, COMPANY_LOGOUT,
	COMPANY_UPDATE_REQ, COMPANY_UPDATE_SUCCESS, COMPANY_UPDATE_FAIL, COMPANY_UPDATE_RESET,
	COMPANY_REMOVE_REQ, COMPANY_REMOVE_SUCCESS, COMPANY_REMOVE_FAIL, COMPANY_REMOVE_RESET,
	COMPANY_POST_JOB_REQ, COMPANY_POST_JOB_SUCCESS, COMPANY_POST_JOB_FAIL, COMPANY_POST_JOB_RESET,
	COMPANY_GET_JOBS_REQ, COMPANY_GET_JOBS_SUCCESS, COMPANY_GET_JOBS_FAIL, COMPANY_GET_JOBS_RESET,
	COMPANY_GET_APPLICANTS_REQ, COMPANY_GET_APPLICANTS_SUCCESS, COMPANY_GET_APPLICANTS_FAIL, COMPANY_GET_APPLICANTS_RESET,
	COMPANY_APPLICANTION_STATUS_REQ, COMPANY_APPLICANTION_STATUS_SUCCESS, COMPANY_APPLICANTION_STATUS_FAIL, COMPANY_APPLICANTION_STATUS_RESET,
	COMPANY_JOB_VISIBILITY_REQ, COMPANY_JOB_VISIBILITY_SUCCESS, COMPANY_JOB_VISIBILITY_FAIL, COMPANY_JOB_VISIBILITY_RESET
} from "../constants/CompanyConstants";


export const companyRegisterAction = (name, email, password, logo) => async (dispatch) => {
	try {
		dispatch({
			type: COMPANY_REGISTRATION_REQ
		});

		const formData = new FormData();
		formData.append("name", name);
		formData.append("email", email);
		formData.append("password", password);
		if (logo) {
			formData.append("logo", logo);
		}

		const [data] = await Promise.all([
			axios.post(`${BASE_URL}/api/company/registration`, formData).then(res => res.data),
			new Promise((resolve) => setTimeout(resolve, 1500))
		]);

		dispatch({
			type: COMPANY_REGISTRATION_SUCCESS,
			payload: data
		});
	} catch (error) {
		setTimeout(() => {
			dispatch({
				type: COMPANY_REGISTRATION_FAIL,
				payload: error.response && error.response.data.message ? error.response.data.message : error.message
			});
		}, 500);
	}
}


export const companyLoginAction = (email, password) => async (dispatch) => {
	try {
		dispatch({
			type: COMPANY_LOGIN_REQ
		});

		const config = {
			headers: { "Content-Type": "application/json" }
		}
		const [data] = await Promise.all([
			axios.post(`${BASE_URL}/api/company/login`, { email, password }, config).then(res => res.data),
			new Promise((resolve) => setTimeout(resolve, 500))
		]);

		dispatch({
			type: COMPANY_LOGIN_SUCCESS,
			payload: data
		});
		localStorage.setItem("companyInfo", JSON.stringify(data));
	} catch (error) {
		setTimeout(() => {
			dispatch({
				type: COMPANY_LOGIN_FAIL,
				payload: error.response && error.response.data.message ? error.response.data.message : error.message
			});
		}, 500);
	}
}


export const companyLogoutAction = () => async (dispatch) => {
	localStorage.removeItem("companyInfo");

	dispatch({
		type: COMPANY_LOGOUT
	});
	document.location.href = "/";
}


export const companyUpdateAction = (updatedCompany) => async (dispatch, getState) => {
	try {
		dispatch({
			type: COMPANY_UPDATE_REQ
		});

		const companyInfo = getState().companyLoginReducer.companyInfo;
		if (!companyInfo || !companyInfo.token) {
			throw new Error("Company not authenticated");
		}

		const config = {
			headers: {
				Authorization: `Bearer ${companyInfo.token}`,
				"Content-Type": "multipart/form-data"
			}
		};
		const [data] = await Promise.all([
			axios.put(`${BASE_URL}/api/company/profile`, updatedCompany, config).then(res => res.data),
			new Promise((resolve) => setTimeout(resolve, 500))
		]);

		dispatch({
			type: COMPANY_UPDATE_SUCCESS,
			payload: data
		});
		dispatch({
			type: COMPANY_LOGIN_SUCCESS,
			payload: data
		});
		localStorage.setItem("companyInfo", JSON.stringify(data));
	} catch (error) {
		setTimeout(() => {
			dispatch({
				type: COMPANY_UPDATE_FAIL,
				payload: error.response && error.response.data.message ? error.response.data.message : error.message
			});
		}, 500);
	}
}


export const companyRemoveAction = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: COMPANY_REMOVE_REQ
		});

		const companyInfo = getState().companyLoginReducer.companyInfo;
		if (!companyInfo || !companyInfo.token) {
			throw new Error("Company not authenticated");
		}

		const config = {
			headers: { Authorization: `Bearer ${companyInfo.token}` }
		};
		await axios.delete(`${BASE_URL}/api/company/profile`, config);

		dispatch({
			type: COMPANY_REMOVE_SUCCESS
		});
		localStorage.removeItem("companyInfo");
	} catch (error) {
		dispatch({
			type: COMPANY_REMOVE_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message
		});
	}
}