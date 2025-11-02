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
				<li>
					{username}
				</li>
				<li>
					<Button isMenu={true} onclick={logout}>Logout</Button>
				</li>
			</ul>
		{:else}
			<ul>
				<li>
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
	}
	ul {
		display: flex;
		column-gap: 24px;
		align-items: center;
	}
	.logo {
		height: 72px;
	}
</style>
