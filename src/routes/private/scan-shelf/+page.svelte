<script lang="ts">
	import { convertFileToBase64 } from '$lib/utils/openai-helper';
	import Icon from '@iconify/svelte';
	import Dropzone from 'svelte-file-dropzone';

	let isLoading = $state(false);

	interface OpenAiBook {
		title: string;
		author: string;
	}
	async function handleDrop(event: CustomEvent<any>) {
		const { acceptedFiles, fileRejections } = event.detail;
		if (acceptedFiles.length) {
			isLoading = true;
			const fileToSendToOpenAI = acceptedFiles[0] as File;
			const base64String = await convertFileToBase64(fileToSendToOpenAI);

			try {
				const response = await fetch('/api/scan-shelf', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ base64: base64String })
				});

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				const result = (await response.json()) as { bookArray: OpenAiBook[] };
				console.log(result);
			} catch (error) {
				console.error('Error uploading file:', error);
			} finally {
				isLoading = false;
			}
		}
	}
</script>

<h2 class="mt-m mb-l">Take a picture to add a book to your shelf</h2>
<div class="upload-area">
	<div class="upload-container">
		<Dropzone
			on:drop={handleDrop}
			multiple={false}
			accept="image/*"
			maxSize={10 * 1024 * 1024}
			containerClasses={'dropzone-cover'}
		>
			<Icon icon="bi:camera-fill" width="40px" />
			<p>Drag a picture here or click to select a file</p>
		</Dropzone>
	</div>
</div>
