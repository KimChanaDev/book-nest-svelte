<script lang="ts">
	import { Button, StarRating } from '$components';
	import { getUserState, type Book } from '$state';
	import Icon from '@iconify/svelte';
	import DropZone from 'svelte-file-dropzone';

	interface ComponentProps {
		data: {
			book: Book;
		};
	}
	let { data }: ComponentProps = $props();
	let userContext = getUserState();
	let book = $derived(userContext.getBookById(data.book.id) || data.book);
	let isEditMode = $state(false);
	let title = $derived(book.title);
	let author = $derived(book.author || '');
	let description = $derived(book.description || '');
	let genre = $derived(book.genre || '');

	function goBack() {
		history.back();
	}

	async function toggleEditModeSaveToDatabase() {
		if (isEditMode) {
			await userContext.updateBook(book.id, {
				title,
				author,
				description,
				genre
			});
		}
		isEditMode = !isEditMode;
	}

	async function updateReadingStatus() {
		const hasStartedReading = Boolean(book.started_reading);
		const currentTimestamp = new Date().toISOString();
		let updateObject: Partial<Book> = hasStartedReading
			? { finished_reading: currentTimestamp }
			: { started_reading: currentTimestamp };

		await userContext.updateBook(book.id, updateObject);
	}

	function updateDatabaseRating(newRating: number) {
		userContext.updateBook(book.id, { rating: newRating });
	}

	async function handleUploadCoverImage(event: CustomEvent<any>) {
		const { acceptedFiles, fileRejections } = event.detail;
		if (acceptedFiles.length) {
			const file = acceptedFiles[0] as File;
			await userContext.uploadBookCoverImage(book.id, file);
		}
	}
</script>

{#snippet bookInfo()}
	<h2 class="book-title mb-m mt-m">{book.title}</h2>
	<p class="book-author">by {book.author}</p>
	<h4 class="mt-m mb-xs semi-bold">Your rating</h4>
	<StarRating value={book.rating || 0} {updateDatabaseRating} isReadOnly={false} />
	<p class="small-font">
		Click to {book.rating ? 'change' : 'give'} rating
	</p>
	{#if book.description}
		<h4 class="mt-m mb-xs semi-bold">Description</h4>
		<p class="mb-m">{book.description}</p>
	{:else}
		<h4 class="mt-m mb-xs semi-bold">No description</h4>
		<button class="block mb-m" onclick={toggleEditModeSaveToDatabase}>Click to add one. </button>
	{/if}
	{#if !book.finished_reading}
		<Button isSecondary={Boolean(book.started_reading)} onclick={updateReadingStatus}>
			{book.started_reading ? 'Mark as Finished' : 'Start Reading'}
		</Button>
	{/if}
	{#if book.genre}
		<h4 class="mt-m mb-xs semi-bold">Genre</h4>
		<p class="mb-m">{book.genre}</p>
	{/if}
{/snippet}

{#snippet editField()}
	<form action="">
		<input class="input input-title mt-m mb-xs" bind:value={title} type="text" name="title" />
		<div class="input-author">
			<p>by</p>
			<input class="input" bind:value={author} type="text" name="author" />
		</div>
		<h4 class="mt-m mb-xs semi-bold">Your rating</h4>
		<StarRating value={book.rating || 0} {updateDatabaseRating} isReadOnly={false} />
		<p class="small-font">
			Click to {book.rating ? 'change' : 'give'} rating
		</p>
		<h4 class="mt-m mb-xs semi-bold">Description</h4>
		<textarea
			class="textarea mb-m"
			bind:value={description}
			name="description"
			placeholder="Give a description."
		></textarea>
		{#if !book.finished_reading}
			<Button isSecondary={Boolean(book.started_reading)} onclick={updateReadingStatus}>
				{book.started_reading ? 'Mark as Finished' : 'Start Reading'}
			</Button>
		{/if}
		<h4 class="mb-xs semi-bold">Genre</h4>
		<input class="input mb-m" bind:value={genre} type="text" name="genre" />
	</form>
{/snippet}

<div class="book-page">
	<button onclick={goBack} aria-label="Go back" class="back-button">
		<Icon icon="ep:back" width="40" />
	</button>

	<div class="book-container">
		<div class="book-info">
			{#if isEditMode}
				{@render editField()}
			{:else}
				{@render bookInfo()}
			{/if}
			<Button isSecondary={true} onclick={toggleEditModeSaveToDatabase}
				>{isEditMode ? 'Save changes' : 'Edit'}</Button
			>
			<Button isDanger={true} onclick={() => userContext.deleteBook(book.id)}>
				Delete the book from library
			</Button>
		</div>
		<div class="book-cover">
			{#if book.cover_image}
				<img src={book.cover_image} alt="Cover image of {book.title}" />
			{:else}
				<DropZone
					on:drop={handleUploadCoverImage}
					multiple={false}
					accept="image/*"
					maxSize={5 * 1024 * 1024}
					containerClasses={'dropzone-cover'}
				>
					<Icon icon="bi:camera-fill" width="40" />
					<p>Add book cover</p>
				</DropZone>
			{/if}
		</div>
	</div>
</div>

<style>
	.back-button {
		margin-bottom: 16px;
	}

	.book-container {
		display: flex;
		justify-content: flex-start;
		gap: 40px;
	}

	.book-info {
		flex: 1;
		max-width: 600px;
	}

	.book-cover {
		width: 40%;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 1px solid black;
		border-radius: 15px;
		min-height: 400px;
		max-width: 450px;
	}

	.book-cover img {
		object-fit: cover;
		max-width: 100%;
		height: 100%;
		border-radius: inherit;
	}

	.input {
		padding: 8px 4px;
		width: 100%;
	}

	.textarea {
		width: 100%;
	}

	.input-title {
		font-size: clamp(32px, 6vw, 60px);
		font-weight: bold;
		font-family: 'EB Garamond', serif;
	}

	.input-author {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 8px;
	}

	.input-author p {
		font-size: 18px;
	}

	:global(.dropzone-cover) {
		width: 100%;
		height: 100%;
		border-radius: 15px !important;
		display: flex !important;
		flex-direction: column !important;
		justify-content: center;
		align-items: center !important;
		cursor: pointer;
		border: unset;
		border-style: solid !important;
	}

	/* Tablet */
	@media (max-width: 1024px) {
		.book-container {
			gap: 32px;
		}

		.book-info {
			max-width: 500px;
		}

		.book-cover {
			width: 45%;
			min-height: 350px;
			max-width: 400px;
		}

		.input-title {
			font-size: clamp(28px, 5vw, 50px);
		}
	}

	/* Mobile */
	@media (max-width: 768px) {
		.book-container {
			flex-direction: column-reverse;
			gap: 24px;
		}

		.book-info {
			width: 100%;
			max-width: 100%;
		}

		.book-cover {
			width: 100%;
			max-width: 100%;
			min-height: 300px;
		}

		.back-button :global(svg) {
			width: 32px !important;
			height: 32px !important;
		}
	}

	@media (max-width: 480px) {
		.book-cover {
			min-height: 250px;
		}
	}
</style>
