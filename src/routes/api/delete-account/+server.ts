import type { Database } from '$lib/types/database.types';
import { createClient } from '@supabase/supabase-js';
import { json, type RequestHandler } from '@sveltejs/kit';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import { SUPABASE_SERVICE_ROLE_KEY } from '$env/static/private';

export const DELETE: RequestHandler = async ({ request }) => {
	const supabaseAdmin = createClient<Database>(PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

	const authHeader = request.headers.get('Authorization');
	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return json({ error: 'Invalid authorization header' }, { status: 401 });
	}

	const token = authHeader.split(' ')[1];

	try {
		const { data: userData, error: verificationError } = await supabaseAdmin.auth.getUser(token);

		if (verificationError || !userData.user) {
			return json({ error: 'Invalid session' }, { status: 401 });
		}

		const userId = userData.user.id;
		const { error: deleteUserError } = await supabaseAdmin.auth.admin.deleteUser(userId);

		if (deleteUserError) {
			return json({ error: 'Failed to delete user' }, { status: 500 });
		}

		return json({ message: 'Delete account successfully' }, { status: 200 });
	} catch {
		return json({ error: 'An unexpected error occured' }, { status: 500 });
	}
};
