import { goto } from '$app/navigation';
import type { Database } from '$lib/types/database.types';
import type { Session, SupabaseClient, User } from '@supabase/supabase-js';
import { getContext, setContext } from 'svelte';
import { SvelteDate } from 'svelte/reactivity';
import { resolve } from '$app/paths';

interface UserStateProps {
	session: Session | null;
	supabase: SupabaseClient<Database> | null;
	user: User | null;
}

export interface Book {
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

export interface OpenAiBook {
	title: string;
	author: string;
}

type UpdatableBookFields = Omit<Book, 'id' | 'user_id' | 'created_at'>;

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

	getHighestRatedBooks() {
		return this.allBooks.toSorted((a, b) => (b.rating ?? 0) - (a.rating ?? 0)).slice(0, 10);
	}

	getHighestRatedBooksByGenre(genre: string) {
		return this.allBooks
			.filter((book) => book.genre?.includes(genre))
			.toSorted((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
			.slice(0, 10);
	}

	getUnreadBooks() {
		return this.allBooks
			.filter((book) => !book.finished_reading)
			.toSorted((a, b) => {
				return new SvelteDate(b.created_at).getTime() - new SvelteDate(a.created_at).getTime();
			})
			.slice(0, 10);
	}

	getFavoriteGenre() {
		if (this.allBooks.length === 0) {
			return '';
		}

		const genreCount: Record<string, number> = {};
		this.allBooks.forEach((book) => {
			const genres = book.genre ? book.genre.split(',').map((g) => g.trim()) : [];
			genres.forEach((genre) => {
				if (genre) {
					genreCount[genre] = (genreCount[genre] || 0) + 1;
				}
			});
		});
		const favoriteGenre = Object.keys(genreCount).reduce(
			(a, b) => (genreCount[a] > genreCount[b] ? a : b),
			''
		);
		return favoriteGenre;
	}

	async updateBook(bookId: number, updateObject: Partial<UpdatableBookFields>) {
		if (!this.supabase) {
			return;
		}

		const { status, error } = await this.supabase
			.from('books')
			.update(updateObject)
			.eq('id', bookId);
		if (status === 204 && !error) {
			this.allBooks = this.allBooks.map((book) => {
				if (book.id === bookId) {
					return { ...book, ...updateObject };
				} else {
					return book;
				}
			});
		}
	}

	getBookById(bookId: number) {
		return this.allBooks.find((book) => book.id === bookId) || null;
	}

	async uploadBookCoverImage(bookId: number, file: File) {
		if (!this.supabase || !this.user) {
			return;
		}
		const filePath = `${this.user.id}/${new SvelteDate().getTime()}_${file.name}`;

		const { error: uploadError } = await this.supabase.storage
			.from('book-cover')
			.upload(filePath, file);

		if (uploadError) {
			console.error('Error uploading book cover image:', uploadError);
			return;
		}

		const {
			data: { publicUrl }
		} = this.supabase.storage.from('book-cover').getPublicUrl(filePath);

		await this.updateBook(bookId, { cover_image: publicUrl });
	}

	async deleteBook(bookId: number) {
		if (!this.supabase) {
			return;
		}
		const { error, status } = await this.supabase.from('books').delete().eq('id', bookId);
		if (status === 204 && !error) {
			this.allBooks = this.allBooks.filter((book) => book.id !== bookId);
		}

		goto(resolve('/private/dashboard'));
	}

	async logout() {
		await this.supabase?.auth.signOut();
	}

	async addBooksToLibrary(booksToAdd: OpenAiBook[]) {
		if (!this.supabase || !this.user) {
			return;
		}

		const processedBooks = booksToAdd.map((book) => ({
			title: book.title,
			author: book.author,
			user_id: this.user!.id
		}));

		const { error } = await this.supabase.from('books').insert(processedBooks);
		if (error) {
			throw new Error('Failed to add books to library: ' + error.message);
		} else {
			await this.fetchUserData();
		}
	}
}
const USER_STATE_KEY = Symbol('USER_STATE');

export function setUserState(data: UserStateProps) {
	return setContext(USER_STATE_KEY, new UserState(data));
}

export function getUserState() {
	return getContext<ReturnType<typeof setUserState>>(USER_STATE_KEY);
}
