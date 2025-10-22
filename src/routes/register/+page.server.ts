import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

interface ReturnObject {
	success: boolean;
	errors: string[];
}

export const actions: Actions = {
	default: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const name = formData.get('name') as string;
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		const passwordConfirmation = formData.get('passwordConfirmation') as string;

		const returnObject: ReturnObject = {
			success: true,
			errors: []
		};

		if (name.length < 3) {
			returnObject.errors.push('Name must be at least 3 characters long.');
		}
		if (!email.length) {
			returnObject.errors.push('Email required.');
		}
		if (password.length < 6) {
			returnObject.errors.push('Password must be at least 6 characters long.');
		}
		if (password.length !== passwordConfirmation.length) {
			returnObject.errors.push('Password do not match.');
		}

		if (returnObject.errors.length) {
			returnObject.success = false;
			return returnObject;
		}

		const { data, error } = await supabase.auth.signUp({
			email,
			password
		});
		if (error || !data.user) {
			console.log('ERROR:');
			console.log(error);
			returnObject.success = false;
			return fail(400, returnObject);
		}
		redirect(303, '/private/dashboard');
	}
};
