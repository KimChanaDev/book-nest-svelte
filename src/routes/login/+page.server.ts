import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

interface ReturnObject {
	success: boolean;
	email: string;
	password: string;
	name?: never;
	passwordConfirmation?: never;
	errors: string[];
}

export const actions: Actions = {
	default: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		const returnObject: ReturnObject = {
			success: true,
			email,
			password,
			errors: []
		};

		if (!email.length) {
			returnObject.errors.push('Email required.');
		}
		if (password.length < 6) {
			returnObject.errors.push('Password must be at least 6 characters long.');
		}

		if (returnObject.errors.length) {
			returnObject.success = false;
			return returnObject;
		}

		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password
		});
		if (error || !data.user) {
			returnObject.errors.push(error?.message || 'An error occurred during login.');
			returnObject.success = false;
			return fail(400, returnObject);
		}
		redirect(303, '/private/dashboard');
	}
};
