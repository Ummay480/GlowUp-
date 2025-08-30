'use server';
/**
 * @fileOverview An AI-powered makeup style suggestion flow.
 *
 * - suggestMakeupStyle - A function that takes a user's photo and returns makeup style suggestions.
 * - SuggestMakeupStyleInput - The input type for the suggestMakeupStyle function.
 * - SuggestMakeupStyleOutput - The return type for the suggestMakeupStyle function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestMakeupStyleInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of the user, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type SuggestMakeupStyleInput = z.infer<typeof SuggestMakeupStyleInputSchema>;

const SuggestMakeupStyleOutputSchema = z.object({
  styleSuggestion: z.string().describe('Suggested makeup styles based on the user\'s photo.'),
  colorPalette: z.string().describe('Suggested color palettes for the makeup styles.'),
});
export type SuggestMakeupStyleOutput = z.infer<typeof SuggestMakeupStyleOutputSchema>;

export async function suggestMakeupStyle(input: SuggestMakeupStyleInput): Promise<SuggestMakeupStyleOutput> {
  return suggestMakeupStyleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestMakeupStylePrompt',
  input: {schema: SuggestMakeupStyleInputSchema},
  output: {schema: SuggestMakeupStyleOutputSchema},
  prompt: `You are a professional makeup artist. Analyze the user's photo and provide makeup style suggestions and color palettes tailored to their skin tone.

User Photo: {{media url=photoDataUri}}

Consider the user's skin tone and facial features when making suggestions. Suggest makeup styles that will enhance their natural beauty. Decide when and if to apply particular products based on the user's skin tone. Provide specific color palette recommendations for each suggested style.
`,
});

const suggestMakeupStyleFlow = ai.defineFlow(
  {
    name: 'suggestMakeupStyleFlow',
    inputSchema: SuggestMakeupStyleInputSchema,
    outputSchema: SuggestMakeupStyleOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
