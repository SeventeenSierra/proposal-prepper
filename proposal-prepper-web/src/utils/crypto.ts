// SPDX-License-Identifier: AGPL-3.0-or-later
// SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC

/**
 * Generates a unique identifier (UUID v4)
 * Provides a fallback for environments where self.crypto.randomUUID is not available
 * (e.g., non-secure contexts or certain polyfill configurations)
 * 
 * @returns A unique string identifier
 */
export function generateUUID(): string {
    // Try native randomUUID first
    if (
        typeof self !== 'undefined' &&
        self.crypto &&
        typeof self.crypto.randomUUID === 'function'
    ) {
        try {
            return self.crypto.randomUUID();
        } catch (e) {
            console.warn('Native randomUUID failed, using fallback', e);
        }
    }

    // Fallback implementation of UUID v4
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}
