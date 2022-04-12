import {
	Button,
	InputWrapper,
	Modal,
	Textarea,
	TextInput,
} from '@mantine/core';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from '../../thirdparties/firebase/firebase';
import { generateAxiosConfig, validateForm } from '../../utils/helper';
import ImageDropzone from './imageDropzone';
import axios from 'axios';

export default function ModalPlace({ title, opened, setOpened, isEdit, data, placeData, setData }) {
	const [files, setFiles] = useState([]);
	const [loadingUpload, setLoadingUpload] = useState(false);
	const [fetchError, setFetchError] = useState('');
	// const uploadImage = (files) => {
	// 	let imgUrls = []

	// 	const storage = getStorage();
	// 	setLoadingUpload(true);

	// 	files.forEach((file, i) => {
	// 		console.log(file);
	// 		const storageRef = ref(storage, file.name);
	// 		uploadBytes(storageRef, file).then(() => {
	// 			getDownloadURL(storageRef)
	// 				.then((url) => {
	// 					imgUrls.push(url)
	// 				})
	// 				.then(() => {
	// 					setLoadingUpload(false);
	// 				});
	// 		});
	// 	})

	// 	return imgUrls;
	// };
	const handleSubmit = (data, setSubmitting, setFetchError) => {
		let imgUrls = []

		setLoadingUpload(true);
		
		Promise.all(files.map((file) => {
			const storage = getStorage();
			const storageRef = ref(storage, file.name);
			return uploadBytes(storageRef, file)
				.then(() => {
					return getDownloadURL(storageRef)
				})
				.then((url) => {
					imgUrls.push(url);
					console.log("url", url);
				})
		}))
			.then((res) => {
				data = { ...data, img_urls: imgUrls }
				console.log("data", data);
				console.log("res", res);
			})
			.then(() => {
				axios
					.post(`${process.env.BE_API_URL}/place`, data, generateAxiosConfig())
					.then((res) => {
						placeData.push(res.data.data);
						setData(placeData);
						console.log("res", res)
						console.log("newData", placeData)
					})
					.catch((err) => {
						setFetchError(err.response.data.meta.message[0]);
						console.log("err", JSON.stringify(err))
					})
					.finally(() => {
						console.log("finally")
						setSubmitting(false);
						setOpened(false);
					});
			})
		
	};
	useEffect(() => {
		return () => {
			setFiles([]);
		};
	}, []);

	return (
		<Modal
			opened={opened}
			onClose={() => setOpened(false)}
			title={title}
			centered
			overflow="inside"
			classNames={{
				title: 'text-lg font-medium',
				body: 'px-2 pt-5',
			}}
			styles={{ close: { backgroundColor: '#fff !important' } }}
		>
			<Formik
				initialValues={{
					name: data ? data.name : '',
					location: data ? data.location : '',
					description: data ? data.description : '',
				}}
				validate={(values) => {
					return validateForm(values);
				}}
				onSubmit={(values, { setSubmitting }) => {
					handleSubmit(values, setSubmitting, setFetchError);
				}}
			>
				{({
					values,
					errors,
					touched,
					handleChange,
					handleBlur,
					handleSubmit,
					isSubmitting,
				}) => (
					<form onSubmit={handleSubmit} className="flex flex-col">
						<div className="mb-4">
							<TextInput
								classNames={{ input: 'border-2' }}
								label="Place Name"
								required
								name="name"
								placeholder="Enter place name"
								size="md"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.name}
								error={errors.name && touched.name}
							/>
							<p className="text-left ml-1 mt-1 text-red-500 text-xs">
								{errors.name && touched.name && errors.name}
							</p>
						</div>
						<div className="mb-4">
							<TextInput
								classNames={{ input: 'border-2' }}
								label="Location"
								required
								name="location"
								placeholder="Enter place location"
								size="md"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.location}
								error={errors.location && touched.location}
							/>
							<p className="text-left ml-1 mt-1 text-red-500 text-xs">
								{errors.location && touched.location && errors.location}
							</p>
						</div>
						<div className="mb-4">
							<Textarea
								classNames={{ input: 'border-2' }}
								label="Description"
								required
								name="description"
								placeholder="Enter place description"
								size="md"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.description}
								invalid={errors.description && touched.description}
							/>
							<p className="text-left ml-1 mt-1 text-red-500 text-xs">
								{errors.description && touched.description && errors.description}
							</p>
						</div>
						<div className="mb-4">
							<InputWrapper
								label="Add Images"
								required={isEdit ? false : true}
								size="md"
							>
								<ImageDropzone files={files} setFiles={setFiles} />
							</InputWrapper>
						</div>
						<p className="my-1 text-red-500 text-xs">{fetchError}</p>
						<Button className="my-5" type="submit" size="md" loading={isSubmitting}>
							Submit
						</Button>
					</form>
				)}
			</Formik>
		</Modal>
	);
}
