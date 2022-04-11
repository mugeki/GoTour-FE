const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const validateForm = (form) => {
	const errors = {};

	for (let key in form) {
		if (key === 'email' && !regexEmail.test(form.email)) {
			errors.email = 'Invalid email address';
		}
		if (!form[key]) {
			errors[key] = 'This field is required';
		}
	}

	return errors;
};
