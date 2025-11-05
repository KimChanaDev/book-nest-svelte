<script lang="ts">
	import { SideNavigation } from '$components';
	let { children } = $props();
</script>

<div class="auth-area">
	<SideNavigation />

	<div class="main-area">
		{@render children?.()}
	</div>
</div>

<style>
	.auth-area {
		display: flex;
		height: 100vh;
		overflow: hidden;
	}

	.main-area {
		flex: 1;
		min-width: 0;
		padding: 40px 4vw 100px 40px;
		overflow-y: auto;
	}

	/* Tablet */
	@media (max-width: 1024px) {
		.main-area {
			padding: 32px 3vw 80px 32px;
		}
	}

	/* Mobile */
	@media (max-width: 768px) {
		.auth-area {
			flex-direction: column;
			height: auto;
			min-height: 100vh;
		}

		.main-area {
			padding: 24px 4vw 60px 4vw;
			overflow-y: visible;
		}
	}
</style>
