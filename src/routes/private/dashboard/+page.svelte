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

	<BookCategory
		bookToDisplay={userContext.getHighestRatedBooks()}
		categoryName="Your favorite books"
	/>
	<BookCategory
		bookToDisplay={userContext.getUnreadBooks()}
		categoryName="Recently added. unread books"
	/>
	<BookCategory
		bookToDisplay={userContext.getHighestRatedBooksByGenre(userContext.getFavoriteGenre())}
		categoryName="Highest rated books from favorite genre: {userContext.getFavoriteGenre()}"
	/>
</div>

<style>
	.dashboard-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		width: 100%;
	}

	.add-book {
		display: flex;
		align-items: center;
		text-decoration: none;
	}

	.add-book p {
		margin-left: 8px;
	}

	.headline {
		text-align: right;
		max-width: 30%;
		min-width: 300px;
	}
</style>
