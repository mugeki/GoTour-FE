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
import { app } from '../../thirdparties/firebase/firebase';
import { validateForm } from '../../utils/helper';
import ImageDropzone from './imageDropzone';

export default function ModalPlace({ title, opened, setOpened, isEdit, data }) {
	const [files, setFiles] = useState([]);
	const [fetchError, setFetchError] = useState('');
	const uploadImage = (files) => {
		if (app) {
			// loop through files array
			for (let i = 0; i < files.length; i++) {}

			const file = e.target.files[0];
			const storageRef = getStorage();
			const fileRef = ref(storageRef, file.name);
			setLoadingUpload(true);
			imageCompression(file, compressionOption).then((compressedFile) => {
				uploadBytes(fileRef, compressedFile).then(() => {
					getDownloadURL(fileRef)
						.then((url) => {
							setForm({ ...form, img_link: url });
						})
						.then(() => {
							setLoadingUpload(false);
						});
				});
			});
		}
	};
	const handleSubmit = (data, setSubmitting, setFetchError) => {
		// axios
		// 	.post(`${process.env.BE_API_URL}/register`, data)
		// 	.then((res) => {
		// 		const cookies = new Cookies();
		// 		cookies.set('token', res.data.data.access_token, { path: '/' });
		// 		router.push('/');
		// 	})
		// 	.catch((err) => {
		// 		setFetchError(err.response.data.meta.message[0]);
		// 	})
		// 	.finally(() => {
		// 		setSubmitting(false);
		// 	});
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
