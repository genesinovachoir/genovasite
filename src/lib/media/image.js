import { BREAKPOINTS } from './constants';

/**
 * Generates a standard srcSet string for a given base path and available widths.
 * This assumes the naming convention: filename-{width}.{ext}
 * 
 * @param {string} basePath - Path to the image file (excluding extension)
 * @param {string} extension - File extension (e.g., 'webp')
 * @param {number[]} [widths] - Array of available widths
 * @returns {string} srcSet string
 */
export function generateSrcSet(basePath, extension, widths = BREAKPOINTS) {
    return widths
        .map(width => `${basePath}-${width}.${extension} ${width}w`)
        .join(', ');
}

/**
 * Helper to construct sizes attribute based on simple column logic.
 * 
 * @param {string | object} config - Simple string (e.g., "100vw") or object mapping breakpoints to widths.
 * @returns {string} sizes string
 */
export function constructSizes(config = "100vw") {
    if (typeof config === 'string') return config;

    // Example config: { mobile: '100vw', tablet: '50vw', desktop: '33vw' }
    // This is a simplified helper; for complex cases, just pass the string directly.
    const parts = [];
    if (config.desktop) parts.push(`(min-width: 1024px) ${config.desktop}`);
    if (config.tablet) parts.push(`(min-width: 768px) ${config.tablet}`);
    if (config.mobile) parts.push(config.mobile);

    return parts.join(', ') || "100vw";
}
