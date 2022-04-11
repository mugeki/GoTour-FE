import { Icon } from '@iconify/react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

export default function SearchEngine({ handleSearchSubmit }) {
    return (
        <Formik
            initialValues={{ keyword: '', sort: '' }}
            validate={values => {
                const errors = {};
                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                handleSearchSubmit(values.keyword, values.sort);
                // alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
            }}
        >
            {({ isSubmitting }) => (
                <Form className="shadow-md p-5 text-sm">
                    <div className='relative mb-5'>
                        <Icon icon="ant-design:search-outlined" color="#888888" width={19} height={19} className='absolute top-3 left-3' />
                        <Field name="keyword" type="text" placeholder="Cari nama tempat" className="w-full border border-slate-400 rounded px-1 py-2 pl-10" />    
                        <ErrorMessage name="keyword" />
                    </div>

                    <p className='font-bold mb-4'>Sort By</p>
                    <div role="group" aria-labelledby="my-radio-group">
                        <div>
                            <label className='ml-3'>
                                <Field type="radio" name="sort" value="created_at" className='accent-teal-200' />
                                Newest
                            </label>
                        </div>
                        <div>
                            <label className='ml-3'>
                                <Field type="radio" name="sort" value="rating" className='accent-teal-200' />
                                Highest Rating
                            </label>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    )
}