<script lang="ts">
	import { getUserState, type Book } from '$state';
	import Icon from '@iconify/svelte';
	import { BookCategory } from '$components';

	let userContext = getUserState();
	let { username } = $derived(userContext);
</script>

<div class="dashboard">
	<div class="dashboard-header mb-m">
		<a href="/private/scan-shelf" class="add-book">
			<Icon icon="icons8:plus" width={72} height={72} />
			<p>Add a book</p>
		</a>
		<div class="headline">
			<h3 class="bold mb-xs">Welcome Back, {username}</h3>
			<p>
				There's nothing quite like the journey a good book can take you on. Dive back into your
				collection and continue exploring new
			</p>
		</div>
	</div>
	{#if userContext.allBooks.length}
		{#if userContext.getHighestRatedBooks().length}
			<BookCategory
				bookToDisplay={userContext.getHighestRatedBooks()}
				categoryName="Your favorite books"
			/>
		{/if}
		{#if userContext.getUnreadBooks().length}
			<BookCategory
				bookToDisplay={userContext.getUnreadBooks()}
				categoryName="Recently added. unread books"
			/>
		{/if}
		{#if userContext.getFavoriteGenre()}
			<BookCategory
				bookToDisplay={userContext.getHighestRatedBooksByGenre(userContext.getFavoriteGenre())}
				categoryName="Highest rated books from favorite genre: {userContext.getFavoriteGenre()}"
			/>
		{/if}
	{:else}
		<a href="/private/scan-shel" class="upload-hint mt-l">
			<h3>You have no books in your library at this moment.Click here to get started!</h3>
			<div class="mt-m">
				<Icon icon="icons8:plus" width={72} height={72} />
				<p>Add a book</p>
			</div>
		</a>
	{/if}
</div>

<style>
	.dashboard-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		width: 100%;
		gap: 24px;
	}

	.add-book {
		display: flex;
		align-items: center;
		text-decoration: none;
		flex-shrink: 0;
	}

	.add-book p {
		margin-left: 8px;
	}

	.headline {
		text-align: right;
		max-width: 30%;
		min-width: 300px;
	}

	.upload-hint {
		text-decoration: none;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		padding: 20px;
	}

	.upload-hint div {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	/* Tablet */
	@media (max-width: 1024px) {
		.headline {
			max-width: 40%;
			min-width: 250px;
		}

		.add-book :global(svg) {
			width: 56px !important;
			height: 56px !important;
		}
	}

	/* Mobile */
	@media (max-width: 768px) {
		.dashboard-header {
			flex-direction: column;
			gap: 16px;
		}

		.headline {
			text-align: left;
			max-width: 100%;
			min-width: auto;
		}

		.add-book :global(svg) {
			width: 48px !important;
			height: 48px !important;
		}

		.upload-hint :global(svg) {
			width: 56px !important;
			height: 56px !important;
		}
	}

	@media (max-width: 480px) {
		.add-book :global(svg) {
			width: 40px !important;
			height: 40px !important;
		}

		.add-book p {
			font-size: 16px;
		}
	}
</style>
