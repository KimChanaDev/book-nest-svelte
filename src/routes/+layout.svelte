<script lang="ts">
	import { Header } from '$components';
	import favicon from '$lib/assets/favicon.svg';
	import { invalidate } from '$app/navigation';
	import '../app.css';
	import { setUserState } from '$state';

	let { data, children } = $props();
	let { session, supabase, user } = $derived(data);
	let userState = setUserState({
		session: data.session,
		supabase: data.supabase,
		user: data.user
	});
	$effect(() => {
		const _session = session;
		const _supabase = supabase;
		const { data } = _supabase.auth.onAuthStateChange((_, newSession) => {
			userState.updateState({ session: newSession, supabase, user: newSession?.user || null });

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
