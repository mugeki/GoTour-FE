import { Icon } from '@iconify/react';
import { Formik } from 'formik';
import Link from 'next/link';

export default function Register() {
	const img =
		'https://images.unsplash.com/photo-1593537898540-b8b821014c8e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80';
	return (
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
					initialValues={{ email: '', password: '' }}
					validate={(values) => {
						const errors = {};
						if (!values.email) {
							errors.email = 'Required';
						} else if (
							!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
						) {
							errors.email = 'Invalid email address';
						}
						return errors;
					}}
					onSubmit={(values, { setSubmitting }) => {
						setTimeout(() => {
							alert(JSON.stringify(values, null, 2));
							setSubmitting(false);
						}, 400);
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
								<input
									className={
										'bg-white border-2 border-gray-400 w-full px-5 py-2 rounded focus:outline-teal-600 ' +
										(errors.email && 'border-red-500')
									}
									type="email"
									name="email"
									placeholder="Email"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.email}
								/>
								<p className="text-left ml-1 mt-1 text-red-500 text-xs">
									{errors.email && touched.email && errors.email}
								</p>
							</div>
							<div className="mb-4">
								<input
									className={
										'bg-white border-2 border-gray-400 w-full px-5 py-2 rounded focus:outline-teal-600 ' +
										(errors.password && 'border-red-500')
									}
									type="password"
									name="password"
									placeholder="Password"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.password}
								/>
								<p className="text-left ml-1 mt-1 text-red-500 text-xs">
									{errors.password && touched.password && errors.password}
								</p>
							</div>

							<button
								className="bg-teal-600 text-white font-medium py-2 px-4 my-5 rounded"
								type="submit"
								disabled={isSubmitting}
							>
								Register
							</button>
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
	);
}
