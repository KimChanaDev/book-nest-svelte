<script lang="ts">
	import { getUserState } from '$state';

	let userState = getUserState();
	let { allBooks } = $derived(userState);
</script>

<ul>
	{#each allBooks as book}
		<li>{book.title} by {book.author}</li>
	{/each}
</ul>
