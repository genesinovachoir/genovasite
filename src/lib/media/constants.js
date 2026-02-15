/**
 * @typedef {Object} ImageAsset
 * @property {string} id - Unique identifier for the asset
 * @property {string} src - Fallback URL (usually the largest optimized version)
 * @property {string} [srcSet] - Responsive srcSet string
 * @property {number} width - Intrinsic width
 * @property {number} height - Intrinsic height
 * @property {string} [blurDataURL] - Base64 encoded placeholder
 * @property {string} alt - Alt text description
 * @property {string} [mime] - Mime type
 * @property {number} [duration] - Duration in seconds (for video/audio)
 */

/**
 * Standard breakpoints for responsive images
 */
export const BREAKPOINTS = [480, 768, 1024, 1440, 1920];

/**
 * Default formats to generate
 */
export const FORMATS = ['avif', 'webp', 'jpeg'];

/**
 * Default quality settings
 */
export const QUALITY = {
    avif: 80,
    webp: 85,
    jpeg: 90,
};
