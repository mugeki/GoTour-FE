import { Icon } from '@iconify/react';
import { Button, TextInput } from '@mantine/core';
import axios from 'axios';
import { Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Cookies from 'universal-cookie';
import Layout from '../../components/layout';
import { validateForm } from '../../utils/helper';
import Head from 'next/head';

export default function Register() {
	const router = useRouter();
	const [fetchError, setFetchError] = useState('');
	const handleSubmit = (data, setSubmitting, setFetchError) => {
		axios
			.post(`${process.env.BE_API_URL}/register`, data)
			.then((res) => {
				const cookies = new Cookies();
				cookies.set('token', res.data.data.access_token, { path: '/' });
				router.push('/');
			})
			.catch((err) => {
				setFetchError(err.response.data.meta.message[0]);
			})
			.finally(() => {
				setSubmitting(false);
			});
	};

	const img =
		'https://images.unsplash.com/photo-1593537898540-b8b821014c8e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80';

	const router = useRouter();

	const register = (name, email, password) => {
		const cookies = new Cookies();
		
		axios.post(`${process.env.BE_API_URL}/register`, {
			name,
			email,
			password
		})
		.then(resp => {
			cookies.set("token", resp.data.data.access_token, { path: "/", domain: window.location.hostname });
			router.push("/");
		})
		.catch(err => {
			console.log(err);
			alert(err.res.data.meta.message[0]);
		})
	}

	return (
		<Layout>
			<Head>
				<title>Register | GoTour</title>
				<meta
					name="description"
					content="Find the perfect destination for your trip"
				/>
				<link rel="icon" href="/" />
			</Head>
			<div className="grid grid-cols-3">
				<div>
					<div
						className="flex items-center justify-center h-screen w-full"
						style={{
							background: `linear-gradient(0deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${img})`,
							backgroundSize: 'cover',
						}}
					>
						<div className="flex items-center">
							<Icon icon="ic:round-mode-of-travel" width={80} color="#fff" />
							<p className="font-bold text-5xl text-white ml-1 cursor-default">
								GoTour
							</p>
						</div>
					</div>
				</div>
				<div className="text-center m-auto col-span-2 w-1/2">
					<h1 className="font-bold text-4xl mb-10">Register</h1>

					<Formik
						initialValues={{ name: '', email: '', password: '' }}
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
							<form onSubmit={handleSubmit} className="flex flex-col text-left">
								<div className="mb-4">
									<TextInput
										classNames={{ input: 'border-2' }}
										required
										label="Full Name"
										name="name"
										placeholder="Full Name"
										size="lg"
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.name}
										error={errors.name && touched.name}
									/>
									<p className="ml-1 mt-1 text-red-500 text-xs">
										{errors.name && touched.name && errors.name}
									</p>
								</div>
								<div className="mb-4">
									<TextInput
										classNames={{ input: 'border-2' }}
										required
										label="Email"
										name="email"
										type="email"
										placeholder="Email"
										size="lg"
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.email}
										error={errors.email && touched.email}
									/>
									<p className="ml-1 mt-1 text-red-500 text-xs">
										{errors.email && touched.email && errors.email}
									</p>
								</div>
								<div className="mb-4">
									<TextInput
										classNames={{ input: 'border-2' }}
										required
										label="Password"
										name="password"
										type="password"
										placeholder="Password"
										size="lg"
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.password}
										error={errors.password && touched.password}
									/>
									<p className="ml-1 mt-1 text-red-500 text-xs">
										{errors.password && touched.password && errors.password}
									</p>
								</div>
								<p className="my-1 text-red-500 text-xs text-center">{fetchError}</p>
								<Button className="my-5" type="submit" size="lg" loading={isSubmitting}>
									Register
								</Button>
							</form>
						)}
					</Formik>
					<p>
						Already have an account?{' '}
						<Link href="/login" passHref>
							<a className="text-teal-600">Login now</a>
						</Link>
					</p>
				</div>
			</div>
		</Layout>
	);
}
