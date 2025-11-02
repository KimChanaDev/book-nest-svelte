<script lang="ts">
	import { Button, StarRating } from '$components';
	import type { Book } from '$state';
	import Icon from '@iconify/svelte';

	interface ComponentProps {
		data: {
			book: Book;
		};
	}
	let { data }: ComponentProps = $props();
	let book = $derived(data.book);
	let isEditMode = $state(false);
	let title = $derived(book.title);
	let author = $derived(book.author || '');
	let description = $derived(book.description || '');
	let genre = $derived(book.genre || '');

	function goBack() {
		history.back();
	}

	function toggleEditMode() {
		isEditMode = !isEditMode;
	}
</script>

{#snippet bookInfo()}
	<h2 class="book-title mb-m mt-m">{book.title}</h2>
	<p class="book-author">by {book.author}</p>
	<h4 class="mt-m mb-xs semi-bold">Your rating</h4>
	<StarRating value={book.rating || 0} isReadOnly={false} />
	<p class="small-font">
		Click to {book.rating ? 'change' : 'give'} rating
	</p>
	{#if book.description}
		<h4 class="mt-m mb-xs semi-bold">Description</h4>
		<p class="mb-m">{book.description}</p>
	{:else}
		<h4 class="mt-m mb-xs semi-bold">No description</h4>
		<button
			class="block mb-m"
			onclick={() => {
				console.log('Toggle on the description editor');
			}}
			>Click to add one.
		</button>
	{/if}
	{#if !book.finished_reading}
		<Button
			isSecondary={true}
			onclick={() => {
				console.log('Update reading status');
			}}
		>
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
		<StarRating value={book.rating || 0} isReadOnly={false} />
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
			<Button
				isSecondary={true}
				onclick={() => {
					console.log('Update reading status');
				}}
			>
				{book.started_reading ? 'Mark as Finished' : 'Start Reading'}
			</Button>
		{/if}
		<h4 class="mb-xs semi-bold">Genre</h4>
		<input class="input mb-m" bind:value={genre} type="text" name="genre" />
	</form>
{/snippet}

<div class="book-page">
	<button onclick={goBack} aria-label="Go back">
		<Icon icon="ep:back" width="40" />
	</button>

	<div class="book-container">
		<div class="book-info">
			{#if isEditMode}
				{@render editField()}
			{:else}
				{@render bookInfo()}
			{/if}
			<Button isSecondary={true} onclick={toggleEditMode}
				>{isEditMode ? 'Save changes' : 'Edit'}</Button
			>
			<Button isDanger={true} onclick={() => console.log('Delete the book')}
				>Delete the book from library</Button
			>
		</div>
		<div class="book-cover">
			{#if book.cover_image}
				<img src={book.cover_image} alt="Cover image of {book.title}" />
			{:else}
				<button class="add-cover">
					<Icon icon="bi:camera-fill" width="40" />
					<p>Add book cover</p>
				</button>
			{/if}
		</div>
	</div>
</div>

<style>
	.book-container {
		display: flex;
		justify-content: flex-start;
	}

	.book-info {
		width: 50%;
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
		margin-left: 80px;
	}

	.book-cover img {
		object-fit: cover;
		max-width: 100%;
		height: 100%;
		border-radius: inherit;
	}

	.add-cover {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

	.input {
		padding: 8px 4px;
		width: 100%;
	}

	.textarea {
		width: 100%;
	}

	.input-title {
		font-size: 60px;
		font-weight: bold;
		font-family: 'EB Garamond', serif;
	}

	.input-author {
		display: flex;
		align-items: center;
	}

	.input-author p {
		margin-right: 8px;
		font-size: 18px;
	}
</style>
