import { redirect, fail } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, locals: { supabase } }) => {
	const code = url.searchParams.get('code');
	const next = url.searchParams.get('next') ?? '/private/dashboard';
	if (!code) {
		throw fail(401, 'No code provided on callback url');
	}
	const { error } = await supabase.auth.exchangeCodeForSession(code);
	if (error) {
		console.error('Error exchanging code for session:', error);
		throw fail(401, 'Session exchange failed');
	}

	const {
		data: { user }
	} = await supabase.auth.getUser();

	if (user) {
		const { data: existingUser, error: selectError } = await supabase
			.from('user_names')
			.select('name')
			.eq('user_id', user.id)
			.single();

		if (selectError && selectError.code !== 'PGRST116') {
			console.error('Error checking user:', selectError);
		}

		if (!existingUser) {
			const userName = user.user_metadata?.name || user.email?.split('@')[0] || 'No Name';
			const { error: insertError } = await supabase.from('user_names').insert({
				user_id: user.id,
				name: userName
			});

			if (insertError) {
				console.error('Error inserting user name:', insertError);
			}
		}
	}

	throw redirect(303, next);
};
