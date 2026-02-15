import React, { useState } from 'react';
import { generateSrcSet, constructSizes } from '../lib/media/image';

/**
 * Standardized Media Image Component.
 * 
 * @param {Object} props
 * @param {string | Object} props.src - Can be a direct URL string or an Asset Object from manifest
 * @param {string} props.alt - Alt text is mandatory
 * @param {string} [props.className] - Class for the wrapper
 * @param {string} [props.imgClassName] - Class for the img element
 * @param {boolean} [props.priority=false] - If true, loads eagerly with high fetchPriority (LCP candidates)
 * @param {string|Object} [props.sizes="100vw"] - Sizes attribute or config object
 * @param {object} [props.style] - Styles for the wrapper
 * @param {boolean} [props.fill=false] - If true, fills parent container (absolute positioning)
 */
const OptimizedImage = ({
    src,
    alt,
    className = '',
    imgClassName = '',
    priority = false,
    sizes = "100vw",
    style = {},
    fill = false,
    ...props
}) => {
    const [isLoaded, setIsLoaded] = useState(false);

    // Normalize input: src can be string or object
    const isAssetObject = typeof src === 'object' && src !== null && src.src;

    // Derived values
    const imageSrc = isAssetObject ? src.src : src;
    const blurDataURL = isAssetObject ? src.blurDataURL : props.blurDataURL;
    const width = isAssetObject ? src.width : props.width;
    const height = isAssetObject ? src.height : props.height;

    // Generate srcSet if it's an asset object and we have variants
    // Note: The script outputs: name-width.format. 
    // We need to know the base path. 
    // If src.variants is present, we can construct it.
    let generatedSrcSet = props.srcSet;

    if (isAssetObject && !generatedSrcSet && src.variants) {
        // Prefer AVIF -> WebP -> fallback
        // Current logic: just use WebP for simplicity in this V1 or check browser support?
        // Actually, the <img> 'srcSet' can only be one format.
        // For multi-format, we need <picture>, but <img srcSet> with WebP is 96% safe now.
        // Let's stick to WebP srcSet for simplicty in <OptimizedImage> 
        // or just use the `variants.webp` array.

        if (src.variants.webp) {
            // src.src is like /images/optimized/name-1920.webp
            // We need base: /images/optimized/name
            const base = imageSrc.substring(0, imageSrc.lastIndexOf('-'));
            generatedSrcSet = generateSrcSet(base, 'webp', src.variants.webp);
        }
    }

    const compiledSizes = constructSizes(sizes);

    // Aspect Ratio Container Strategy (prevention of CLS)
    // If fill=true, we rely on parent.
    // If width/height known, we use aspect-ratio.
    const wrapperStyle = {
        position: 'relative',
        overflow: 'hidden',
        ...style
    };

    if (!fill && width && height) {
        wrapperStyle.aspectRatio = `${width} / ${height}`;
    }

    return (
        <div className={`optimized-image-wrapper ${className}`} style={wrapperStyle}>
            {/* Blur Placeholder */}
            {blurDataURL && !isLoaded && (
                <img
                    src={blurDataURL}
                    aria-hidden="true"
                    alt=""
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        filter: 'blur(20px)',
                        transform: 'scale(1.1)', // Remove blur edges
                        zIndex: 0,
                    }}
                />
            )}

            <img
                src={imageSrc}
                srcSet={generatedSrcSet}
                sizes={compiledSizes}
                alt={alt}
                width={width} // Always pass attributes if known
                height={height}
                loading={priority ? "eager" : "lazy"}
                fetchPriority={priority ? "high" : "auto"}
                decoding="async"
                onLoad={() => setIsLoaded(true)}
                className={`optimized-image ${imgClassName} ${isLoaded ? 'loaded' : 'loading'}`}
                style={{
                    position: fill ? 'absolute' : 'relative',
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    zIndex: 1,
                    opacity: isLoaded ? 1 : 0,
                    transition: 'opacity 0.5s ease-in-out',
                    ...props.style
                }}
            />
        </div>
    );
};

export default OptimizedImage;
