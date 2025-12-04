'use server';
/**
 * @fileOverview A Genkit flow for generating a short executive summary of a compliance report.
 *
 * - summarizeComplianceReport - A function that generates the compliance report summary.
 * - SummarizeComplianceReportInput - The input type for the summarizeComplianceReport function.
 * - SummarizeComplianceReportOutput - The return type for the summarizeComplianceReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeComplianceReportInputSchema = z.object({
  reportText: z
    .string()
    .describe('The full text of the compliance report to summarize.'),
});
export type SummarizeComplianceReportInput = z.infer<
  typeof SummarizeComplianceReportInputSchema
>;

const SummarizeComplianceReportOutputSchema = z.object({
  summary: z
    .string()
    .describe(
      'A short, one-sentence executive summary of the compliance report.'
    ),
});
export type SummarizeComplianceReportOutput = z.infer<
  typeof SummarizeComplianceReportOutputSchema
>;

export async function summarizeComplianceReport(
  input: SummarizeComplianceReportInput
): Promise<SummarizeComplianceReportOutput> {
  return summarizeComplianceReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeComplianceReportPrompt',
  input: {schema: SummarizeComplianceReportInputSchema},
  output: {schema: SummarizeComplianceReportOutputSchema},
  prompt: `You are an expert compliance officer.

  You will receive a compliance report as text. You will generate a short, one-sentence executive summary of the compliance report. The summary should include the overall compliance status of the proposal.

  Compliance Report:
  {{reportText}}`,
});

const summarizeComplianceReportFlow = ai.defineFlow(
  {
    name: 'summarizeComplianceReportFlow',
    inputSchema: SummarizeComplianceReportInputSchema,
    outputSchema: SummarizeComplianceReportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
