<script lang="ts">
	import type { Snippet } from 'svelte';

	interface BasicProps {
		children: Snippet;
		isSecondary?: boolean;
		isMenu?: boolean;
		isDanger?: boolean;
	}
	interface ButtonProps extends BasicProps {
		onclick?: (e: MouseEvent) => void;
		href?: never;
		type?: 'submit' | 'button';
		[prop: string]: any;
	}
	interface LinkProps extends BasicProps {
		href: string;
		onclick?: never;
		[prop: string]: any;
	}

	type ConponentProps = ButtonProps | LinkProps;
	let { children, href, onclick, isSecondary, isMenu, isDanger, ...props }: ConponentProps =
		$props();
</script>

{#if href}
	<a
		{href}
		{...props}
		class="btn"
		class:btn-secondary={isSecondary}
		class:btn-menu={isMenu}
		class:btn-danger={isDanger}
	>
		{@render children()}
	</a>
{:else}
	<button
		{onclick}
		{...props}
		class="btn"
		class:btn-secondary={isSecondary}
		class:btn-menu={isMenu}
		class:btn-danger={isDanger}
	>
		{@render children()}
	</button>
{/if}

<style>
	a {
		display: block;
		text-decoration: none;
	}
	a:hover {
		text-decoration: none;
	}
	.btn {
		padding: 12px 24px;
		min-width: 230px;
		text-align: center;
		background-color: black;
		border-radius: 12px;
		color: white;
		border: 1px solid white;
		font-weight: normal;
		font-size: 22px;
	}
	.btn-secondary {
		background-color: white;
		color: black;
		border: 1px solid black;
	}
	.btn-danger {
		background-color: rgb(136, 4, 4);
	}
	.btn-menu {
		padding: 8px 20px;
		min-width: 150px;
	}
</style>
