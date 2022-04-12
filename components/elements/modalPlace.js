import {
	Button,
	InputWrapper,
	Modal,
	Textarea,
	TextInput,
} from '@mantine/core';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from '../../thirdparties/firebase/firebase';
import { generateAxiosConfig, validateForm } from '../../utils/helper';
import ImageDropzone from './imageDropzone';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function ModalPlace({ title, opened, setOpened, isEdit, data, placeData, setData }) {
	const [files, setFiles] = useState([]);
	const [loadingUpload, setLoadingUpload] = useState(false);
	const [fetchError, setFetchError] = useState('');
	const router = useRouter();
	const dataIsEmpty = data  && Object.keys(data).length === 0 && Object.getPrototypeOf(data) === Object.prototype;

	const handleSubmit = (submittedValues, setSubmitting, setFetchError) => {
		let imgUrls = []

		setLoadingUpload(true);
		// Upload image, collect urls to imgUrls
		Promise.all(files.map((file) => {
			const storage = getStorage();
			const storageRef = ref(storage, file.name);
			return uploadBytes(storageRef, file)
				.then(() => {
					return getDownloadURL(storageRef)
				})
				.then((url) => {
					imgUrls.push(url);
				})
		}))
			.then(() => {
				submittedValues = { ...submittedValues, img_urls: imgUrls }
			})
			.then(() => {
				axios({
					method: dataIsEmpty ? "post" : "put",
					url: dataIsEmpty ? `${process.env.BE_API_URL}/place` : `${process.env.BE_API_URL}/place/${data.id}`,
					headers: generateAxiosConfig().headers,
					data: {
						...submittedValues,
					}
				})
					.then((res) => {						
						if (dataIsEmpty) {
							// placeData.push(res.data.data);
							// setData(placeData);
							// console.log("res", res)
							// console.log("newData", placeData)
							// Terpaksa reload gara2 response ga ada id, jadi kalo cardExplore dirender ga bisa masuk page dengan id yang sesuai dengan place
							router.reload(window.location.pathname)
						} else {
							const placeIndex = placeData.findIndex(place => place.id === data.id);
							// TODO: pengecualian spread buat img_urls
							placeData[placeIndex] = {
								...data,
								...res.data.data
							}							
							setData(placeData);
						}
					})
					.catch((err) => {
						// setFetchError(err.response.data.meta.message[0]);
						console.log("err", JSON.stringify(err))
					})
					.finally(() => {
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
					name: dataIsEmpty ? '' : data.name ,
					location: dataIsEmpty ? '' : data.location ,
					description: dataIsEmpty ? '' : data.description ,
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
