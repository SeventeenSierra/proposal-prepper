'use server';

/**
 * @fileOverview A flow that provides actionable recommendations for addressing sections identified as non-compliant, including links to relevant regulatory guidance.
 *
 * - getActionableRecommendations - A function that takes non-compliant text and returns actionable recommendations.
 * - ActionableRecommendationsInput - The input type for the getActionableRecommendations function.
 * - ActionableRecommendationsOutput - The return type for the getActionableRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ActionableRecommendationsInputSchema = z.object({
  nonCompliantText: z.string().describe('The text identified as non-compliant.'),
});
export type ActionableRecommendationsInput = z.infer<typeof ActionableRecommendationsInputSchema>;

const ActionableRecommendationsOutputSchema = z.object({
  recommendations: z.array(
    z.object({
      recommendation: z.string().describe('A specific recommendation to address the non-compliance.'),
      regulatoryGuidance: z.string().optional().describe('Link to relevant regulatory guidance, if available.'),
    })
  ).describe('A list of actionable recommendations.'),
});
export type ActionableRecommendationsOutput = z.infer<typeof ActionableRecommendationsOutputSchema>;

export async function getActionableRecommendations(
  input: ActionableRecommendationsInput
): Promise<ActionableRecommendationsOutput> {
  return actionableRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'actionableRecommendationsPrompt',
  input: {schema: ActionableRecommendationsInputSchema},
  output: {schema: ActionableRecommendationsOutputSchema},
  prompt: `You are an expert in regulatory compliance. Given the following non-compliant text, provide actionable recommendations for addressing the issues, including links to relevant regulatory guidance when available.\n\nNon-Compliant Text: {{{nonCompliantText}}}`,
});

const actionableRecommendationsFlow = ai.defineFlow(
  {
    name: 'actionableRecommendationsFlow',
    inputSchema: ActionableRecommendationsInputSchema,
    outputSchema: ActionableRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
