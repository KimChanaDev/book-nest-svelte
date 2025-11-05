<script lang="ts">
	import { Button } from '$components';
	import type { ActionData as RegisterActionData } from '../../routes/register/$types';
	import type { ActionData as LoginActionData } from '../../routes/login/$types';
	interface ComponentProps {
		isRegistration: boolean;
		form: RegisterActionData | LoginActionData;
	}
	let { isRegistration, form }: ComponentProps = $props();
</script>

<div class="default-margin auth-container">
	<h1 class="mb-l">{isRegistration ? 'Register' : 'Login'}</h1>
	<div class="form-and-social-login">
		<form
			class="auth-form"
			method="POST"
			action={isRegistration ? '' : '/login/?/signInWithPassword'}
		>
			{#if form && form.errors?.length}
				{#each form.errors as error}
					<p class="auth-error">{error}</p>
				{/each}
			{/if}
			{#if isRegistration}
				<input placeholder="Name" type="text" name="name" value={form?.name || ''} />
			{/if}
			<input placeholder="Email" type="email" name="email" value={form?.email || ''} />
			<input placeholder="Password" type="password" name="password" value={form?.password || ''} />
			{#if isRegistration}
				<input
					placeholder="Confirm password"
					type="password"
					name="passwordConfirmation"
					value={form?.passwordConfirmation || ''}
				/>
			{/if}
			<Button type="submit">{isRegistration ? 'Register' : 'Login'}</Button>
			{#if isRegistration}
				<p class="auth-hint mt-s">
					Already have an account? <a href="/login">Log in.</a>
				</p>
			{:else}
				<p class="auth-hint mt-s">
					Don't have an account? <a href="/register">Register.</a>
				</p>
			{/if}
		</form>
		<div class="social-login">
			<form method="POST" action={isRegistration ? '/login/?/googleLogin' : '?/googleLogin'}>
				<Button type="submit">Log in using Google</Button>
			</form>
		</div>
	</div>
</div>

<style>
	.auth-container {
		margin-top: 80px;
	}
	.form-and-social-login {
		display: flex;
		gap: 40px;
	}
	.auth-form {
		display: flex;
		flex-direction: column;
		align-items: start;
		border-right: 1px solid grey;
		padding-right: 80px;
		width: 40%;
		min-width: 300px;
	}
	.auth-hint {
		color: grey;
		font-size: 16px;
	}
	.auth-error {
		background-color: rgb(122, 35, 35);
		color: white;
		font-size: 18px;
		border-radius: 12px;
		padding: 12px;
		width: 100%;
		margin-bottom: 8px;
	}
	.auth-error:last-of-type {
		margin-bottom: 16px;
	}
	.auth-form input {
		width: 100%;
		margin-bottom: 12px;
	}
	.auth-form input:last-of-type {
		margin-bottom: 30px;
	}
	.social-login {
		padding-left: 80px;
		width: 40%;
		min-width: 250px;
	}

	/* Tablet */
	@media (max-width: 1024px) {
		.auth-container {
			margin-top: 60px;
		}

		.form-and-social-login {
			gap: 32px;
		}

		.auth-form {
			padding-right: 40px;
			width: 50%;
			min-width: 280px;
		}

		.social-login {
			padding-left: 40px;
			width: 50%;
		}
	}

	/* Mobile */
	@media (max-width: 768px) {
		.auth-container {
			margin-top: 40px;
		}

		.form-and-social-login {
			flex-direction: column;
			gap: 32px;
		}

		.auth-form {
			width: 100%;
			border-right: none;
			border-bottom: 1px solid grey;
			padding-right: 0;
			padding-bottom: 32px;
			min-width: auto;
		}

		.social-login {
			width: 100%;
			padding-left: 0;
			min-width: auto;
		}

		.auth-error {
			font-size: 16px;
		}
	}

	@media (max-width: 480px) {
		.auth-container {
			margin-top: 24px;
		}

		.auth-form input:last-of-type {
			margin-bottom: 20px;
		}
	}
</style>
