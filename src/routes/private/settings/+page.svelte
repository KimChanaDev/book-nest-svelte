<script lang="ts">
	import { Button } from '$components';
	import { getUserState } from '$state';

	let userContext = getUserState();
	let username = $derived(userContext.username);
	let isEditMode = $state(false);
	let email = $derived(userContext.user?.email ?? '');
	let averageRating = $derived.by(() => {
		const booksWithRatings = userContext.allBooks.filter((book) => book.rating);
		if (booksWithRatings.length === 0) {
			return 'No ratings yet';
		}

		const sumAllRatings = booksWithRatings.reduce((acc, book) => acc + book.rating!, 0);
		const averageRating = sumAllRatings / booksWithRatings.length;
		const roundedTwoDecimal = Math.round(averageRating * 100) / 100;
		return roundedTwoDecimal;
	});

	async function toggleEditModeAndSaveToDatabase() {
		if (isEditMode) {
			await userContext.updateAccountData(email, username ?? '');
		}
		isEditMode = !isEditMode;
	}

	async function deleteAccount() {
		const confirmDeletion = window.confirm(
			'Are you sure you want to delete your account? This action cannot be undone and all your data will be lost.'
		);
		if (confirmDeletion) {
			await userContext.deleteAccount();
		}
	}
</script>

<div class="settings-page">
	<div class="settings-container">
		<h2>Settings</h2>
		<h5 class="mt-m mb-xs semi-bold">Username</h5>
		{#if isEditMode}
			<input type="text" name="username" bind:value={username} />
		{:else}
			<h3>{username}</h3>
		{/if}
		<h5 class="mt-m mb-xs semi-bold">Email Address</h5>
		{#if isEditMode}
			<input type="text" name="email" bind:value={email} />
		{:else}
			<h3>{email}</h3>
		{/if}
		<div class="buttons-container mt-l">
			<Button isSecondary={true} onclick={toggleEditModeAndSaveToDatabase}>
				{isEditMode ? 'Save changes' : 'Edit'}
			</Button>
			<Button isDanger={true} onclick={deleteAccount}>Delete Account</Button>
		</div>
	</div>
	<div class="stats-container">
		<h3 class="semi-bold">Books in library</h3>
		<h3>{userContext.allBooks.length}</h3>
		<h5 class="semi-bold mt-m">Finished books</h5>
		<h3>{userContext.allBooks.filter((book) => Boolean(book.finished_reading)).length}</h3>
		<h5 class="semi-bold mt-m">Average rating given</h5>
		<h3>{averageRating}</h3>
	</div>
</div>

<style>
	.settings-page {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
	}

	.settings-container {
		margin-right: 80px;
	}

	.settings-container input {
		width: 100%;
	}

	.stats-container {
		min-width: 25%;
		border-radius: 12px;
		padding: 8px 24px;
		background-color: rgba(255, 255, 255, 0.5);
		margin-bottom: 40px;
	}
</style>
