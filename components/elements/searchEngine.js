import { Icon } from '@iconify/react';
import { Button, Radio, RadioGroup, TextInput } from '@mantine/core';
import { Formik } from 'formik';
import { useState } from 'react';

export default function SearchEngine({ handleSearchSubmit }) {
	const [radioValue, setRadioValue] = useState('newest');
	return (
		<Formik
			initialValues={{ keyword: '' }}
			onSubmit={(values, { setSubmitting }) => {
				console.log({ ...values, radioValue });
				handleSearchSubmit(values.keyword, radioValue);
				setSubmitting(false);
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
				<form
					onSubmit={handleSubmit}
					className="shadow-md p-5 text-sm bg-white rounded"
				>
					<div className="relative mb-5">
						<TextInput
							size="md"
							classNames={{ input: 'border-2' }}
							icon={
								<Icon
									icon="ant-design:search-outlined"
									width={19}
									height={19}
									className="absolute top-3 left-3"
								/>
							}
							type="text"
							name="keyword"
							placeholder="Cari nama tempat"
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.keyword}
							error={errors.keyword && touched.keyword}
						/>
						<p className="ml-1 mt-1 text-red-500 text-xs">
							{errors.keyword && touched.keyword && errors.keyword}
						</p>
					</div>
					<RadioGroup
						label="Sort by"
						size="md"
						orientation="vertical"
						defaultValue="newest"
						onChange={setRadioValue}
						value={radioValue}
						classNames={{ radio: 'cursor-pointer' }}
					>
						<Radio value="newest" label="Newest" />
						<Radio value="rating" label="Highest Rating" />
					</RadioGroup>
					<Button
						variant="outline"
						className="mt-5 w-full"
						type="submit"
						size="md"
						loading={isSubmitting}
					>
						Apply
					</Button>
				</form>
			)}
		</Formik>
	);
}
