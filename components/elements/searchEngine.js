import { Icon } from '@iconify/react';
import { Formik } from 'formik';
import { Radio, RadioGroup, TextInput } from '@mantine/core';
import { useState } from 'react';

export default function SearchEngine({ handleSearchSubmit }) {
    const [radioValue, setRadioValue] = useState('newest');
    return (
        <Formik
            initialValues={{ keyword: '' }}
            validate={values => {
                const errors = {};
                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                console.log({ ...values, radioValue })
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
                <form onSubmit={handleSubmit} className="shadow-md p-5 text-sm bg-white">
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
                    >
                        <Radio value="newest" label="Newest" />
                        <Radio value="rating" label="Highest Rating" />
                    </RadioGroup>
                </form>
            )}
        </Formik>
    )
}
