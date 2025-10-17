const BASE_URL = import.meta.env.VITE_BACKEND_URL;
import { assetsImages } from '../../assets/images-data'

import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { companyUpdateAction, companyRemoveAction, companyLogoutAction } from "../../redux/actions/CompanyActions"


const CompanyInfo = () => {

	const dispatch = useDispatch();
	const { companyInfo } = useSelector((state) => state.companyLoginReducer);
	const { loading: updateLoading, error: updateError, success: updateSuccess } = useSelector((state) => state.companyUpdateReducer);
	const { error: removeError, success: removeSuccess } = useSelector((state) => state.companyRemoveReducer);


	const [name, setName] = useState(companyInfo.name);
	const [email, setEmail] = useState(companyInfo.email);
		const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [image, setImage] = useState(companyInfo.image);
	const [previewImage, setPreviewImage] = useState(null);

	const [errorMessage, setErrorMessage] = useState("");
	const [successMessage, setSuccessMessage] = useState("");

	const [modalVisible, setModalVisible] = useState(false);
	const [modalMessage, setModalMessage] = useState("");


	useEffect(() => {
		if (updateSuccess) {
			setSuccessMessage("Company profile updated.");
										setName(companyInfo.name);
			setEmail(companyInfo.email);
			setTimeout(() => {
								setSuccessMessage("");
				setOldPassword(""); setNewPassword("");
				dispatch({ type: "COMPANY_UPDATE_RESET" });
			}, 3000);
		} else if (updateError) {
			setErrorMessage(updateError);
			setTimeout(() => {
				setErrorMessage("");
				setOldPassword(""); setNewPassword("");
				dispatch({ type: "COMPANY_UPDATE_RESET" });
			}, 3000);
		}
		if (removeSuccess) {
			setModalMessage("Your account has been successfully deleted!");
		} else if (removeError) {
			setModalMessage(removeError);
		}
	}, [dispatch, updateError, updateSuccess, removeError, removeSuccess, companyInfo]);


	const updateHandler = (e) => {
		e.preventDefault();
		
		const formData = new FormData();
		formData.append("name", name);
		formData.append("email", email);
				if (newPassword) {
			formData.append("newPassword", newPassword);
			formData.append("oldPassword", oldPassword);
		}
		if (image) { formData.append("logo", image); }
		dispatch(companyUpdateAction(formData));
	};


	const removeHandler = () => {
		setModalMessage("Are you sure you want to delete your profile?");
		setModalVisible(true);
	};

	const confirmRemoveHandler = () => {
		dispatch(companyRemoveAction());
	};

	const exitAfterRemoveHandler = () => {
		dispatch(companyLogoutAction());
		dispatch({ type: "COMPANY_REMOVE_RESET" });
		setModalVisible(false);
	};


	const imageChange = (e) => {
		const file = e.target.files[0];
		setImage(file);
		setPreviewImage(URL.createObjectURL(file));
	};


	return (<>

		<form onSubmit={updateHandler} className='container max-w-2xl py-8 flex flex-col w-full items-start gap-3'>
			<div className='w-full py-4 bg-slate-200 rounded-lg'>
				<label htmlFor="image">
					<img src={previewImage ? previewImage : companyInfo.image ? `${BASE_URL}${companyInfo.image}` : assetsImages.upload_area}
						alt="Upload image" className='w-20 h-20 md:w-24 md:h-24 ms-5 rounded-full object-cover inline-block cursor-pointer' />
					<input onChange={(e) => { imageChange(e) }}
						type="file" id='image' hidden />
					<p className='text-sm md:text-base ms-3 md:ms-5 px-2 py-2 cursor-pointer inline-block'>Change logo</p>
				</label>
			</div>
			<div className='w-full mt-4'>
				<p className='mb-2'>Company Title</p>
				<input onChange={e => setName(e.target.value)} value={name}
					type="text" placeholder="" className='w-full max-w-3xl py-2 border-2 border-gray-300' />
			</div>
			<div className='w-full'>
				<p className='mb-2'>Email</p>
				<input onChange={e => setEmail(e.target.value)} value={email}
					type="email" placeholder="" className='w-full max-w-3xl py-2 border-2 border-gray-300' />
			</div>
			<div className='w-full flex gap-x-4'>
				<div className='w-1/2'>
					<p className='mb-2'>Password</p>
					<input onChange={e => setOldPassword(e.target.value)} value={oldPassword}
						type="password" placeholder="" className='w-full py-2 border-2 border-gray-300' />
				</div>
				<div className='w-1/2'>
					<p className='mb-2'>New Password</p>
					<input onChange={e => setNewPassword(e.target.value)} value={newPassword}
						type="password" placeholder="" className='w-full py-2 border-2 border-gray-300' />
				</div>
			</div>

			{errorMessage && (
				<div className="w-full mt-3 py-3 max-[500px]:text-xs text-sm lg:text-base text-center rounded-md bg-red-100 border border-red-400">
					{errorMessage}
				</div>
			)}
			{successMessage && (
				<div className="w-full mt-3 py-3 max-[500px]:text-xs text-sm lg:text-base text-center rounded-md bg-blue-100 border border-blue-400">
					{successMessage}
				</div>
			)}

			<div className='mt-5 flex items-center'>
				<button disabled={updateLoading}
					className="font-medium text-center bg-blue-600 rounded px-5 md:px-8 py-3 text-white text-sm md:text-base hover:bg-blue-500 transition duration-300 ease-in-out">Update Profile</button>
				<button onClick={removeHandler}
					type="button" className="ms-5 font-medium text-center rounded px-5 md:px-8 py-3 text-gray-800 text-sm md:text-base bg-slate-200 hover:bg-gray-300 transition duration-300 ease-in-out">Delete Profile</button>
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
							<button onClick={() => { dispatch({ type: "COMPANY_REMOVE_RESET" }); setModalVisible(false); }}
								type="button" className="text-sm font-medium px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800 transition duration-300 ease-in-out">Cancel</button>
							<button onClick={confirmRemoveHandler}
								type="button" className="text-white text-sm font-medium px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 transition duration-300 ease-in-out">Yes, Delete</button>
						</>) : (
							<button onClick={exitAfterRemoveHandler}
								type="button" className="text-white text-sm font-medium px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 transition duration-300 ease-in-out">OK</button>
						)}

					</div>
				</div>
			</div>
		</>)}

	</>)
}

export default CompanyInfo