<script lang="ts">
	import { goto } from '$app/navigation';
	import logoImage from '$assets/app-logo.svg';
	import { Button } from '$components';
	import { getUserState } from '$state';

	let userContext = getUserState();
	const { user, username } = $derived(userContext);

	async function logout() {
		await userContext.logout();
		goto('/login');
	}
</script>

<header>
	<a href={user ? '/private/dashboard' : '/'}>
		<img class="logo" src={logoImage} alt="Go to home" />
	</a>
	<nav>
		{#if user}
			<ul>
				<li class="username">
					{username}
				</li>
				<li>
					<Button isMenu={true} onclick={logout}>Logout</Button>
				</li>
			</ul>
		{:else}
			<ul>
				<li class="hide-mobile">
					<Button isMenu={true} href="/register">Create account</Button>
				</li>
				<li>
					<Button isMenu={true} isSecondary={true} href="/login">Login</Button>
				</li>
			</ul>
		{/if}
	</nav>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 12px 4vw;
		flex-wrap: wrap;
		gap: 12px;
	}
	ul {
		display: flex;
		column-gap: 24px;
		align-items: center;
		flex-wrap: wrap;
	}
	.logo {
		height: 72px;
	}

	.username {
		max-width: 150px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	/* Tablet */
	@media (max-width: 768px) {
		.logo {
			height: 56px;
		}

		ul {
			column-gap: 16px;
		}

		.username {
			max-width: 100px;
			font-size: 14px;
		}
	}

	/* Mobile */
	@media (max-width: 480px) {
		header {
			padding: 8px 4vw;
		}

		.logo {
			height: 48px;
		}

		ul {
			column-gap: 8px;
		}

		.hide-mobile {
			display: none;
		}

		.username {
			display: none;
		}
	}
</style>
