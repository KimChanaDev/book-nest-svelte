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
		font-size: clamp(18px, 3vw, 22px);
		transition: all 0.3s ease;
	}

	.btn:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
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

	/* Tablet */
	@media (max-width: 768px) {
		.btn {
			padding: 10px 20px;
			min-width: 180px;
		}

		.btn-menu {
			padding: 6px 16px;
			min-width: 120px;
		}
	}

	/* Mobile */
	@media (max-width: 480px) {
		.btn {
			padding: 8px 16px;
			min-width: 140px;
		}

		.btn-menu {
			padding: 6px 12px;
			min-width: 100px;
		}
	}
</style>
