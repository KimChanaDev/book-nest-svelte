<script lang="ts">
	import heroImage from '$assets/hero.png';
	import { Button } from '$components';
</script>

<section class="default-margin hero">
	<div class="hero-text">
		<h1>Book Nest</h1>
		<h3>Your personal library.</h3>
		<h4 class="mt-l">Create your collection of books and share it with the world.</h4>
		<h4 class="mb-s">Our app offers a beatiful and intuitive interface to manage your books.</h4>
		<Button href="/register">Sign up</Button>
	</div>
	<img class="hero-image" src={heroImage} alt="" />
</section>

<style>
	.hero {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 100px;
		margin-bottom: 80px;
		gap: 32px;
	}
	.hero-image {
		width: 40%;
		max-width: 500px;
	}
	.hero-text {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		width: 55%;
		padding-right: 50px;
	}

	/* Tablet */
	@media (max-width: 1024px) {
		.hero {
			margin-top: 60px;
			margin-bottom: 60px;
			gap: 24px;
		}

		.hero-text {
			width: 50%;
			padding-right: 20px;
		}

		.hero-image {
			width: 45%;
		}
	}

	/* Mobile */
	@media (max-width: 768px) {
		.hero {
			flex-direction: column-reverse;
			margin-top: 40px;
			margin-bottom: 40px;
			text-align: center;
		}

		.hero-text {
			width: 100%;
			padding-right: 0;
			align-items: center;
		}

		.hero-image {
			width: 80%;
			max-width: 400px;
		}
	}

	@media (max-width: 480px) {
		.hero {
			margin-top: 24px;
			margin-bottom: 24px;
		}

		.hero-image {
			width: 100%;
			max-width: 300px;
		}
	}
</style>
