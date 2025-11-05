import { json, type RequestHandler } from '@sveltejs/kit';
import OpenAI from 'openai';
import { OPENAI_API_KEY, MOCK_OPENAI } from '$env/static/private';

const openai = new OpenAI({
	apiKey: OPENAI_API_KEY
});

export const POST: RequestHandler = async ({ request }) => {
	const { base64 } = await request.json();
	let bookArray = [];
	if (MOCK_OPENAI === 'false') {
		const completion = await openai.chat.completions.create({
			model: 'gpt-4o-mini',
			messages: [
				{
					role: 'user',
					content: [
						{
							type: 'text',
							text: `Scan the following shelf of books and provide a JSON array
		                    listing each book's title and author. Here is the base64-encoded image of the shelf.
		                    please respond with only the JSON array in this form [{
		                    "title": "Harry Potter",
		                    "author": "J.K. Rowling"
		                    }], when is there is only one book on the shelf or no books on the shelf, return an empty array: []`
						},
						{
							type: 'image_url',
							image_url: {
								url: `data:image/jpeg;base64,${base64}`,
								detail: 'low'
							}
						}
					]
				}
			]
		});
		const bookArrayString = completion.choices[0].message.content
			?.replace(/```json|```/g, '')
			.trim();
		bookArray = JSON.parse(bookArrayString || '[]');
	} else {
		bookArray = [
			{ title: 'The Silent Horizon', author: 'Amelia Wren' },
			{ title: 'Echoes of the Forgotten', author: 'Liam Carter' },
			{ title: 'Beneath the Crimson Sky', author: 'Sophie Lang' },
			{ title: "The Clockmaker's Secret", author: 'Oliver Hayes' },
			{ title: 'Whispers of the Deep Forest', author: 'Clara Bennett' },
			{ title: 'Fragments of Tomorrow', author: 'Noah Reynolds' },
			{ title: 'The Glass Kingdom', author: 'Emily Rivers' },
			{ title: 'Shadows Over Elysium', author: 'Daniel Cross' },
			{ title: "The Alchemist's Daughter", author: 'Lydia Frost' },
			{ title: 'Voyage of the Last Star', author: 'Ethan Blake' }
		];
	}
	return json({ bookArray }, { status: 200 });
};
