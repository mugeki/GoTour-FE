import {
	Button,
	InputWrapper,
	Modal,
	Textarea,
	TextInput,
} from '@mantine/core';
import axios from 'axios';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { app } from '../../thirdparties/firebase/firebase';
import { generateAxiosConfig, validateForm } from '../../utils/helper';
import ImageDropzone from './imageDropzone';

export default function ModalPlace({
	title,
	opened,
	setOpened,
	isEdit,
	data,
	placeData,
	setData,
}) {
	const [files, setFiles] = useState([]);
	const [filesError, setFilesError] = useState('');
	const dataIsEmpty =
		data &&
		Object.keys(data).length === 0 &&
		Object.getPrototypeOf(data) === Object.prototype;

	const handleSubmit = (submittedValues, setSubmitting) => {
		if (!isEdit && files.length === 0) {
			setFilesError('Please upload at least one image');
			setSubmitting(false);
			return;
		}
		if (app) {
			setFilesError('');
			let imgUrls = [];
			// Upload image, collect urls to imgUrls
			Promise.all(
				files.map((file) => {
					const storage = getStorage();
					const storageRef = ref(storage, file.name);
					return uploadBytes(storageRef, file)
						.then(() => {
							return getDownloadURL(storageRef);
						})
						.then((url) => {
							imgUrls.push(url);
						});
				})
			)
				.then(() => {
					submittedValues = { ...submittedValues, img_urls: imgUrls };
				})
				.then(() => {
					axios({
						method: dataIsEmpty ? 'post' : 'put',
						url: dataIsEmpty
							? `${process.env.BE_API_URL}/place`
							: `${process.env.BE_API_URL}/place/${data.id}`,
						headers: generateAxiosConfig().headers,
						data: {
							...submittedValues,
						},
					})
						.then((res) => {
							if (dataIsEmpty) {
								placeData.push(res.data.data);
								setData(placeData);
							} else {
								const placeIndex = placeData.findIndex((place) => place.id === data.id);
								placeData[placeIndex] = {
									...data,
									...res.data.data,
									img_urls: [...data.img_urls, ...res.data.data.img_urls],
								};
								setData(placeData);
							}
							toast.success(`Place ${isEdit ? 'updated' : 'added'}!`, {
								position: 'top-center',
								autoClose: 2000,
								hideProgressBar: false,
								closeOnClick: true,
								pauseOnHover: true,
								draggable: true,
								progress: undefined,
							});
							setOpened(false);
						})
						.catch(() => {
							toast.error('Something went wrong', {
								position: 'top-center',
								autoClose: 2000,
								hideProgressBar: false,
								closeOnClick: true,
								pauseOnHover: true,
								draggable: true,
								progress: undefined,
							});
						})
						.finally(() => {
							setSubmitting(false);
						});
				});
		}
	};
	useEffect(() => {
		return () => {
			setFilesError('');
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
					name: dataIsEmpty ? '' : data.name,
					location: dataIsEmpty ? '' : data.location,
					description: dataIsEmpty ? '' : data.description,
				}}
				validate={(values) => {
					return validateForm(values);
				}}
				onSubmit={(values, { setSubmitting }) => {
					handleSubmit(values, setSubmitting);
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
								<ImageDropzone
									files={files}
									setFiles={setFiles}
									isEdit={isEdit}
									error={filesError}
									setError={setFilesError}
								/>
							</InputWrapper>
						</div>
						<Button className="my-5" type="submit" size="md" loading={isSubmitting}>
							Submit
						</Button>
					</form>
				)}
			</Formik>
		</Modal>
	);
}
