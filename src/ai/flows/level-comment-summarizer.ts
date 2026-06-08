'use server';
/**
 * @fileOverview This file implements a Genkit flow for summarizing user comments for a Geometry Dash level.
 *
 * - summarizeLevelComments - A function that takes an array of comments and returns an AI-generated summary.
 * - LevelCommentSummarizerInput - The input type for the summarizeLevelComments function.
 * - LevelCommentSummarizerOutput - The return type for the summarizeLevelComments function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const LevelCommentSummarizerInputSchema = z.object({
  comments: z
    .array(z.string())
    .describe('An array of user comments for a Geometry Dash level.'),
});
export type LevelCommentSummarizerInput = z.infer<typeof LevelCommentSummarizerInputSchema>;

const LevelCommentSummarizerOutputSchema = z.object({
  summary: z
    .string()
    .describe(
      'A concise summary of the provided user comments, capturing general sentiment and key themes.'
    ),
});
export type LevelCommentSummarizerOutput = z.infer<typeof LevelCommentSummarizerOutputSchema>;

const commentSummarizerPrompt = ai.definePrompt({
  name: 'commentSummarizerPrompt',
  input: { schema: LevelCommentSummarizerInputSchema },
  output: { schema: LevelCommentSummarizerOutputSchema },
  prompt: `You are an AI assistant tasked with summarizing user comments for a Geometry Dash level.
Read the following comments and provide a concise summary that captures the general sentiment, common themes, and key discussion points.
The summary should be no more than 3-4 sentences.

Comments:
{{#each comments}}
- {{{this}}}
{{/each}}`,
});

const levelCommentSummarizerFlow = ai.defineFlow(
  {
    name: 'levelCommentSummarizerFlow',
    inputSchema: LevelCommentSummarizerInputSchema,
    outputSchema: LevelCommentSummarizerOutputSchema,
  },
  async (input) => {
    const { output } = await commentSummarizerPrompt(input);
    return output!;
  }
);

export async function summarizeLevelComments(
  input: LevelCommentSummarizerInput
): Promise<LevelCommentSummarizerOutput> {
  return levelCommentSummarizerFlow(input);
}
