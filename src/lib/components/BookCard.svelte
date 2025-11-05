<script lang="ts">
	import type { Book } from '$state';
	import { StarRating } from '$components';

	interface ComponentProps {
		book: Book;
	}
	let { book }: ComponentProps = $props();

	let bookStatus = $derived.by(() => {
		if (book.finished_reading) {
			return 'Finished';
		} else if (book.started_reading) {
			return 'Reading';
		} else {
			return 'Not Started';
		}
	});
</script>

<a class="book-card" href="/private/book/{book.id}">
	<div class="book-status">
		<span>{bookStatus}</span>
	</div>
	<div class="book-cover">
		{#if book.cover_image}
			<img src={book.cover_image} alt="Cover image of {book.title}" />
		{/if}
	</div>
	<div class="book-info">
		<h4>{book.title}</h4>
		<p class="mb-s">{book.author}</p>
		<StarRating value={book.rating ?? 0} isReadOnly={true} />
	</div>
</a>

<style>
	.book-card {
		position: relative;
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: 450px;
		min-width: 360px;
		width: 360px;
		height: 300px;
		border-radius: 12px;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		color: white;
		text-decoration: none;
		text-align: left;
		flex-shrink: 0;
	}

	.book-cover {
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: -1;
	}

	.book-cover img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 12px;
	}

	.book-info {
		background: rgba(0, 0, 0, 0.4);
		height: 100%;
		width: 100%;
		padding: 60px 16px 0px 16px;
		border-radius: 12px;
	}

	.book-info h4 {
		font-family: 'EB Garamond', serif;
	}

	.book-info p {
		font-size: 14px;
		font-weight: 400;
		font-style: italic;
	}

	.book-status {
		position: absolute;
		top: 16px;
		right: 0;
		padding: 4px 8px;
		width: auto;
		background-color: rgba(4, 59, 92, 0.7);
		font-size: 14px;
	}

	/* Tablet */
	@media (max-width: 1024px) {
		.book-card {
			min-width: 300px;
			width: 300px;
			height: 260px;
		}

		.book-info {
			padding: 50px 12px 0px 12px;
		}
	}

	/* Mobile */
	@media (max-width: 768px) {
		.book-card {
			min-width: 260px;
			width: 260px;
			height: 240px;
		}

		.book-info {
			padding: 40px 12px 0px 12px;
		}

		.book-status {
			top: 12px;
			font-size: 12px;
			padding: 3px 6px;
		}
	}

	@media (max-width: 480px) {
		.book-card {
			min-width: 220px;
			width: 220px;
			height: 200px;
		}

		.book-info {
			padding: 30px 10px 0px 10px;
		}
	}
</style>
