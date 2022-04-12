import Router from 'next/router';
import Cookies from 'universal-cookie';

export function redirect(ctx, location) {
	if (ctx.req) {
		ctx.res.writeHead(302, { Location: location });
		ctx.res.end();
	} else {
		Router.push(location);
	}
}

export function handleUnauthorized(res) {
	if ([401, 403].includes(res?.status)) {
		const cookies = new Cookies();
		cookies.remove('token', { path: '/', domain: window.location.hostname });
		Router.push('/login');
	}
}

export function generateAxiosConfig() {
	const cookies = new Cookies();
	const token = cookies.get('token');
	const config = {
		headers: {
			Authorization: 'Bearer ' + token,
		},
	};
	return config;
}

export function isLoggedIn() {
	const cookies = new Cookies();
	return cookies.get('token') !== undefined;
}

export function validateForm(form) {
	const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
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
}
