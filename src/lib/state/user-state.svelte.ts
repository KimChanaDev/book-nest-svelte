import type { Database } from '$lib/types/database.types';
import type { Session, SupabaseClient, User } from '@supabase/supabase-js';
import { getContext, setContext } from 'svelte';

interface UserStateProps {
	session: Session | null;
	supabase: SupabaseClient<Database> | null;
	user: User | null;
}

interface Book {
	author: string | null;
	cover_image: string | null;
	created_at: string;
	description: string | null;
	finished_reading: string | null;
	genre: string | null;
	id: number;
	rating: number | null;
	started_reading: string | null;
	title: string;
	user_id: string;
}

export class UserState {
	session = $state<Session | null>(null);
	supabase = $state<SupabaseClient<Database> | null>(null);
	user = $state<User | null>(null);
	allBooks = $state<Book[]>([]);
	username = $state<string | null>(null);

	constructor(data: UserStateProps) {
		this.updateState(data);
	}

	updateState(data: UserStateProps) {
		this.session = data.session;
		this.supabase = data.supabase;
		this.user = data.user;
		this.fetchUserData();
	}

	async fetchUserData() {
		if (!this.supabase || !this.user) {
			return;
		}
		const userId = this.user.id;
		const [booksResponse, usernameResponse] = await Promise.all([
			this.supabase
				.from('books')
				.select('*')
				.eq('user_id', userId)
				.order('created_at', { ascending: false }),
			this.supabase.from('user_names').select('name').eq('user_id', userId).single()
		]);
		if (
			booksResponse.error ||
			!booksResponse.data ||
			usernameResponse.error ||
			!usernameResponse.data
		) {
			console.error('Error fetching user data');
			console.error({
				booksError: booksResponse.error,
				usernameError: usernameResponse.error
			});
			return;
		}
		this.allBooks = booksResponse.data;
		this.username = usernameResponse.data.name;
	}

	async logout() {
		await this.supabase?.auth.signOut();
	}
}
const USER_STATE_KEY = Symbol('USER_STATE');

export function setUserState(data: UserStateProps) {
	return setContext(USER_STATE_KEY, new UserState(data));
}

export function getUserState() {
	return getContext<ReturnType<typeof setUserState>>(USER_STATE_KEY);
}
