<script lang="ts">
	import Icon from '@iconify/svelte';
</script>

<div class="side-navigation">
	<ul>
		<li>
			<a href="/private/dashboard" title="Library">
				<Icon icon="ion:library-outline" width={40} />
			</a>
		</li>
		<li>
			<a href="/private/scan-shelf" title="Scan Shelf">
				<Icon icon="solar:eye-scan-linear" width={40} />
			</a>
		</li>
		<li>
			<a href="/private/settings" title="Settings">
				<Icon icon="ion:settings-outline" width={40} />
			</a>
		</li>
	</ul>
</div>

<style>
	.side-navigation {
		display: flex;
		height: 100vh;
		border-right: 1px solid grey;
		padding-left: calc(4vw + 16px);
		padding-right: 40px;
		flex: 0 0 auto;
		position: sticky;
		top: 0;
	}

	.side-navigation ul {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
	}

	ul li:not(:last-of-type) {
		margin-bottom: 16px;
	}

	/* Tablet */
	@media (max-width: 1024px) {
		.side-navigation {
			padding-left: calc(3vw + 12px);
			padding-right: 24px;
		}

		.side-navigation :global(svg) {
			width: 32px !important;
			height: 32px !important;
		}
	}

	/* Mobile */
	@media (max-width: 768px) {
		.side-navigation {
			height: auto;
			width: 100%;
			border-right: none;
			border-bottom: 1px solid grey;
			padding: 12px 4vw;
			position: sticky;
			top: 0;
			background-color: #f0eee2;
			z-index: 100;
		}

		.side-navigation ul {
			flex-direction: row;
			justify-content: space-around;
			width: 100%;
			height: auto;
		}

		ul li:not(:last-of-type) {
			margin-bottom: 0;
			margin-right: 8px;
		}

		.side-navigation :global(svg) {
			width: 36px !important;
			height: 36px !important;
		}
	}

	@media (max-width: 480px) {
		.side-navigation :global(svg) {
			width: 32px !important;
			height: 32px !important;
		}
	}
</style>
