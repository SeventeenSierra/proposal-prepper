// SPDX-License-Identifier: AGPL-3.0-or-later
// SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC

/**
 * Generates a unique identifier (UUID v4)
 * Provides a fallback for environments where self.crypto.randomUUID is not available
 * 
 * @returns A unique string identifier
 */
export function generateUUID(): string {
    // Try native randomUUID first
    if (
        typeof globalThis !== 'undefined' &&
        globalThis.crypto &&
        typeof globalThis.crypto.randomUUID === 'function'
    ) {
        try {
            return globalThis.crypto.randomUUID();
        } catch (e) {
            console.warn('Native randomUUID failed, using fallback', e);
        }
    }

    // Fallback implementation of UUID v4 using crypto.getRandomValues if available
    const buf = new Uint8Array(16);
    if (typeof globalThis !== 'undefined' && globalThis.crypto && globalThis.crypto.getRandomValues) {
        globalThis.crypto.getRandomValues(buf);
    } else {
        // True fallback for very restricted environments
        for (let i = 0; i < 16; i++) {
            buf[i] = Math.floor(Math.random() * 256);
        }
    }

    // Set version (4) and variant (10xx)
    buf[6] = (buf[6] & 0x0f) | 0x40;
    buf[8] = (buf[8] & 0x3f) | 0x80;

    let i = 0;
    const chars = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
    return chars.replace(/[xy]/g, (c) => {
        const r = buf[i++] % 16;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}
