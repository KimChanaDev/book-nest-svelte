<script lang="ts">
	import { AuthForm } from '$components';
	import type { ActionData } from './$types.js';

	interface ComponentProps {
		form: ActionData;
	}

	let { form }: ComponentProps = $props();
</script>

<AuthForm isRegistration={true} {form} />
