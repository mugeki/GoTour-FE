import { Icon } from '@iconify/react';
import { Button, TextInput } from '@mantine/core';
import axios from 'axios';
import { Formik } from 'formik';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Cookies from 'universal-cookie';
import { validateForm } from '../../utils/helper';

export default function Login() {
	const router = useRouter();
	const [fetchError, setFetchError] = useState('');
	const handleSubmit = (data, setSubmitting, setFetchError) => {
		axios
			.post(`${process.env.BE_API_URL}/login`, data)
			.then((res) => {
				const cookies = new Cookies();
				cookies.set('token', res.data.data.access_token, { path: '/', domain: window.location.hostname });
				router.push('/');
			})
			.catch((err) => {
				setFetchError(err.response.data.meta.message);
			})
			.finally(() => {
				setSubmitting(false);
			});
	};
	const img =
		'https://images.unsplash.com/photo-1593537898540-b8b821014c8e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80';

	return (
		<div className="flex flex-col md:grid md:grid-cols-3">
			<Head>
				<title>Login | GoTour</title>
				<meta
					name="description"
					content="Find the perfect destination for your trip"
				/>
				<link rel="icon" href="/" />
			</Head>
			<div>
				<div
					className="flex items-center justify-center h-[150px] md:h-screen w-full"
					style={{
						background: `linear-gradient(0deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${img})`,
						backgroundSize: 'cover',
					}}
				>
					<Link href="/" passHref>
						<div className="flex items-center cursor-pointer">
							<Icon icon="ic:round-mode-of-travel" width={70} color="#fff" />
							<p className="font-bold text-4xl text-white ml-1 select-none">GoTour</p>
						</div>
					</Link>
				</div>
			</div>
			<div className="text-center mt-48 md:mt-auto m-auto md:col-span-2 w-3/4 md:w-1/2">
				<h1 className="font-bold text-4xl mb-10">Login</h1>
				<Formik
					initialValues={{ email: '', password: '' }}
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
									label="Email"
									required
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
									label="Password"
									required
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
								Login
							</Button>
						</form>
					)}
				</Formik>
				<p>
					Don't have an account?{' '}
					<Link href="/register" passHref>
						<a className="text-teal-600">Register now</a>
					</Link>
				</p>
			</div>
		</div>
	);
}
