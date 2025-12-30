/*
 * SPDX-License-Identifier: AGPL-3.0-or-later
 * SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC
 */

/**
 * Seed data for FAR (Federal Acquisition Regulation) compliance documents
 * 
 * These are Justification & Approval (J&A) documents used for demo and testing.
 * Physical PDFs are located in: proposal-prepper-seed--data/FAR/
 * 
 * For future AWS/Strands work, grant data is in: proposal-prepper-seed--data/Grant/
 */

export interface FARDocument {
    id: string;
    filename: string;
    title: string;
    category: 'demo' | 'test';
    description: string;
    size?: number;
}

/**
 * FAR J&A Documents for Demo Mode (Presentation scenarios)
 * These are real J&A documents for demonstrating compliance analysis
 */
export const farDemoDocuments: FARDocument[] = [
    {
        id: '36C24619Q0395-0328',
        filename: '36C24619Q0395-0328.pdf',
        title: 'J&A: Solicitation 0328',
        category: 'demo',
        description: 'Justification and Approval document for federal procurement',
        size: 481516,
    },
    {
        id: '36C24619Q0395-1042',
        filename: '36C24619Q0395-1042.pdf',
        title: 'J&A: Solicitation 1042',
        category: 'demo',
        description: 'Justification and Approval document for federal procurement',
        size: 315076,
    },
    {
        id: '36C24619Q0395-2225',
        filename: '36C24619Q0395-2225.pdf',
        title: 'J&A: Solicitation 2225',
        category: 'demo',
        description: 'Justification and Approval document for federal procurement',
        size: 280112,
    },
];

/**
 * FAR J&A Documents for Test Mode (Validation test cases)
 * These documents test specific compliance scenarios
 */
export const farTestDocuments: FARDocument[] = [
    {
        id: '36C24619Q0395-2237',
        filename: '36C24619Q0395-2237.pdf',
        title: 'Test Case: Small Document',
        category: 'test',
        description: 'Small J&A document for testing file size handling',
        size: 159301,
    },
    {
        id: '36C24619Q0395-2247',
        filename: '36C24619Q0395-2247.pdf',
        title: 'Test Case: Medium Document',
        category: 'test',
        description: 'Medium-sized J&A document for standard validation',
        size: 247834,
    },
    {
        id: '36C24619Q0395-5340',
        filename: '36C24619Q0395-5340.pdf',
        title: 'Test Case: Large Document',
        category: 'test',
        description: 'Large J&A document for testing performance',
        size: 2534820,
    },
];

/**
 * All FAR documents (demo + test)
 */
export const farDocuments: FARDocument[] = [
    ...farDemoDocuments,
    ...farTestDocuments,
    // Additional documents not categorized yet
    {
        id: '36C24619Q0395-2289',
        filename: '36C24619Q0395-2289.pdf',
        title: 'J&A: Solicitation 2289',
        category: 'demo',
        description: 'Justification and Approval document',
        size: 308757,
    },
    {
        id: '36C24619Q0395-2428',
        filename: '36C24619Q0395-2428.pdf',
        title: 'J&A: Solicitation 2428',
        category: 'demo',
        description: 'Justification and Approval document',
        size: 437838,
    },
    {
        id: '36C24619Q0395-3327',
        filename: '36C24619Q0395-3327.pdf',
        title: 'J&A: Solicitation 3327',
        category: 'demo',
        description: 'Justification and Approval document',
        size: 133775,
    },
    {
        id: '36C24619Q0395-6235',
        filename: '36C24619Q0395-6235.pdf',
        title: 'J&A: Solicitation 6235',
        category: 'demo',
        description: 'Justification and Approval document',
        size: 835610,
    },
    {
        id: '36C24619Q0395-9021',
        filename: '36C24619Q0395-9021.pdf',
        title: 'J&A: Solicitation 9021',
        category: 'demo',
        description: 'Justification and Approval document',
        size: 280978,
    },
];

/**
 * Legacy compatibility: Empty grant array
 * @deprecated Use farDocuments instead
 */
export const seedGrants: any[] = [];

/**
 * Get FAR document by ID
 */
export function getFARDocumentById(id: string): FARDocument | undefined {
    return farDocuments.find(doc => doc.id === id);
}

/**
 * Get FAR documents by category
 */
export function getFARDocumentsByCategory(category: 'demo' | 'test'): FARDocument[] {
    return farDocuments.filter(doc => doc.category === category);
}

/**
 * Legacy stub functions for backward compatibility
 * @deprecated These will be removed once the app is updated
 */
export function getSeedGrantById(_id: string): any | undefined {
    return undefined;
}

export function getSeedGrantByIdOrRandom(_id: string): any {
    return {};
}

export function seedGrantToUploadSession(_grant: any): any {
    return {};
}

export function seedGrantToAnalysisResult(_grant: any): any {
    return {};
}
