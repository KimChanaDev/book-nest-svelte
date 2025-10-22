<script lang="ts">
	import { Header } from '$components';
	import favicon from '$lib/assets/favicon.svg';
	import { invalidate } from '$app/navigation';
	import '../app.css';

	let { data, children } = $props();
	let { session, supabase, user } = $derived(data);
	$effect(() => {
		const _session = session;
		const _supabase = supabase;
		const { data } = _supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== _session?.expires_at) {
				invalidate('supabase:auth');
			}
		});
		return () => data.subscription.unsubscribe();
	});

	$inspect(session);
	$inspect(user);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>
<Header />
{@render children?.()}
