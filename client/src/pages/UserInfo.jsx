const BASE_URL = import.meta.env.VITE_BACKEND_URL;
import { assetsImages } from '../assets/images-data'

import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { userUpdateAction, userRemoveAction } from "../redux/actions/UserActions"


const UserInfo = () => {

	const dispatch = useDispatch();
	const userUpdateReducer = useSelector((state) => state.userUpdateReducer);
	const { loading: updateLoading, error: updateError, success: updateSuccess } = userUpdateReducer;
	const userRemoveReducer = useSelector((state) => state.userRemoveReducer);
	const { error: removeError, success: removeSuccess } = userRemoveReducer;

	const { userInfo } = useSelector((state) => state.userLoginReducer);


	const [name, setName] = useState(userInfo.name);
	const [email, setEmail] = useState(userInfo.email);
	const [password, setPassword] = useState("");

	const [image, setImage] = useState(userInfo.image);
	const [previewImage, setPreviewImage] = useState(null);

	const [isResumeEdit, setIsResumeEdit] = useState(false);
	const [resume, setResume] = useState(userInfo.resume);

	const [errorMessage, setErrorMessage] = useState("");
	const [successMessage, setSuccessMessage] = useState("");

	const [modalVisible, setModalVisible] = useState(false);
	const [modalMessage, setModalMessage] = useState("");


	useEffect(() => {
		if (updateSuccess) {
			setSuccessMessage("User profile updated.");
			setTimeout(() => {
				setSuccessMessage("");
				setPassword("");
				dispatch({ type: "USER_UPDATE_RESET" });
			}, 3000);
		} else if (updateError) {
			setErrorMessage(updateError);
			setTimeout(() => {
				setErrorMessage("");
				dispatch({ type: "USER_UPDATE_RESET" });
			}, 3000);
		}
		if (removeSuccess) {
			setModalVisible(true);
			setModalMessage("Your account has been successfully deleted!");
		} else if (removeError) {
			setModalVisible(true);
			setModalMessage(removeError);
		}
	}, [dispatch, updateError, updateSuccess, removeError, removeSuccess, userInfo]);


	const userUpdateHandler = (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("name", name);
		formData.append("email", email);
		if (password) { formData.append("password", password); }
		if (image) { formData.append("avatar", image); }
		if (resume) { formData.append("resume", resume); }
		dispatch(userUpdateAction(formData));
	};


	const userRemoveHandler = () => {
		setModalMessage("Are you sure you want to delete your profile?");
		setModalVisible(true);
	};

	const confirmUserRemoveHandler = () => {
		dispatch(userRemoveAction());
	};


	const imageChange = (e) => {
		const file = e.target.files[0];
		setImage(file);
		setPreviewImage(URL.createObjectURL(file));
	};


	return (<>

		<form onSubmit={userUpdateHandler} className='container py-8 flex flex-col w-full items-start gap-3'>
			<div className='w-full max-w-xl py-4  bg-slate-200 rounded-lg'>
				<label htmlFor="image">
					<img src={previewImage ? previewImage : userInfo.image ? `${BASE_URL}${userInfo.image}` : assetsImages.upload_area} alt="Upload image" className='w-24 h-24 ms-5 rounded-full object-cover inline-block cursor-pointer' />
					<input onChange={(e) => { imageChange(e) }} type="file" id='image' hidden />
					<p className='ms-5 px-2 py-5 cursor-pointer inline-block'>Change photo</p>
				</label>
			</div>
			<div className="flex gap-2 mb-3 mt-3">
				{isResumeEdit || userInfo && userInfo.resume === "" ? (<>
					<label className='flex items-center' htmlFor="resume-upload">
						<p className='bg-blue-100 text-blue-600 px-4 py-2 rounded-lg cursor-pointer'>
							{resume?.name || "Select Resume"}
						</p>
						<input onChange={e => setResume(e.target.files[0])} accept="application/pdf" id="resume-upload" type="file" hidden />
					</label>
					<button onClick={() => setIsResumeEdit(false)} className='bg-green-100 border border-green-400 rounded-lg px-4 py-2 hover:bg-green-200 transition duration-300 ease-in-out'>
						Confirm
					</button>
				</>) : (
					<div className="flex items-center ">
						<a href="#" className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg mr-2 cursor-pointer">
							{userInfo?.resume ? userInfo.resume : resume?.name ? resume.name : "No Resume"}
						</a>
						<button onClick={() => { setIsResumeEdit(true); userInfo.resume = resume.name }} className="text-gray-500 border border-gray-300 rounded-lg px-4 py-2 hover:border-gray-500 hover:text-gray-700 transition duration-300 ease-in-out">
							Edit
						</button>
					</div>
				)}
			</div>
			<div className='w-full max-w-xl'>
				<p className='mb-2'>Name</p>
				<input onChange={e => setName(e.target.value)} value={name}
					type="text" placeholder="" className='w-full max-w-3xl py-2 border-2 border-gray-300' />
			</div>
			<div className='w-full max-w-xl'>
				<p className='mb-2'>Email</p>
				<input onChange={e => setEmail(e.target.value)} value={email}
					type="email" placeholder="" className='w-full max-w-3xl py-2 border-2 border-gray-300' />
			</div>
			<div className='w-full max-w-xl'>
				<p className='mb-2'>Password</p>
				<input onChange={e => setPassword(e.target.value)} value={password}
					type="password" placeholder="" className='w-full max-w-3xl py-2 border-2 border-gray-300' />
			</div>
			<div className='w-full max-w-xl'>
				{errorMessage && (
					<div className="w-full max-w-3xl mt-3 py-3 max-[500px]:text-xs text-sm lg:text-base text-center rounded-md bg-red-100 border border-red-400">
						{errorMessage}
					</div>
				)}
				{successMessage && (
					<div className="w-full max-w-3xl mt-3 py-3 max-[500px]:text-xs text-sm lg:text-base text-center rounded-md bg-green-100 border border-green-400">
						{successMessage}
					</div>
				)}
			</div>
			<div className='mt-3'>
				<button className="bg-blue-600 rounded px-8 py-3 text-white hover:bg-blue-500 transition duration-300 ease-in-out" disabled={updateLoading}>
					Update Profile
				</button>
				<button onClick={userRemoveHandler} type="button" className="ms-5 bg-red-600 rounded px-8 py-3 text-white hover:bg-red-500 transition duration-300 ease-in-out">
					Delete Profile
				</button>
			</div>
		</form>

		{modalVisible && (<>
			<div className="fixed inset-0 bg-black bg-opacity-50 z-40" />
			<div className="fixed inset-0 flex items-center justify-center z-50">
				<div className="bg-white rounded-lg shadow-lg w-full max-w-md">
					<div className="px-6 py-4 border-b border-gray-200"><h5 className="text-lg font-semibold">Confirmation</h5></div>
					<div className="px-6 py-4"><p className="text-gray-700">{modalMessage}</p></div>
					<div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
						{!removeSuccess ? (<>
							<button onClick={() => { dispatch({ type: "USER_REMOVE_RESET" }); setModalVisible(false); }} type="button" className="text-sm font-medium px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800 transition duration-300 ease-in-out" >
								Cancel
							</button>
							<button onClick={confirmUserRemoveHandler} type="button" className="text-white text-sm font-medium px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 transition duration-300 ease-in-out">
								Yes, Delete
							</button>
						</>) : (
							<button onClick={() => { dispatch({ type: "USER_LOGOUT" }); dispatch({ type: "USER_REMOVE_RESET" }); setModalVisible(false); }} type="button" className="text-white text-sm font-medium px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 transition duration-300 ease-in-out">
								OK
							</button>
						)}
					</div>
				</div>
			</div>
		</>)}

	</>)
}

export default UserInfo