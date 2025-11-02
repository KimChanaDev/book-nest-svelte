<script lang="ts">
	import { BookCard } from '$components';
	import type { Book } from '$state';

	interface ComponentProps {
		bookToDisplay: Book[];
		categoryName: string;
	}
	let { categoryName, bookToDisplay }: ComponentProps = $props();
</script>

<section class="book-category mb-m">
	<h3 class="mb-s">{categoryName}</h3>
	<div class="books-container">
		{#each bookToDisplay as book}
			<BookCard {book} />
		{/each}
	</div>
</section>

<style>
	.books-container {
		display: flex;
		overflow-x: auto;
		overflow-y: hidden;
		gap: 16px;
		padding-bottom: 8px;
		scrollbar-width: thin;
		scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
	}
</style>
