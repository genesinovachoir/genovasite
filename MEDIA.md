# Media System Documentation

## Overview
We have a standardized media system to ensure sustainable performance (LCP, CLS, bandwidth) without manual efforts.

## Workflow: Adding New Images
1. **Drop Raw Images**: Place high-res images to `src/assets/raw`.
2. **Run Optimization**: 
   ```bash
   npm run optimize-media
   ```
   This script:
   - Resize images to [480, 768, 1024, 1440, 1920] px.
   - Generates `.webp` and `.avif` formats.
   - Creates a Blur Placeholder (LQIP).
   - Updates `src/lib/media/manifest.json`.
3. **Use in Components**:
   Import the manifest and use `<OptimizedImage />`.

   ```javascript
   import manifest from '../lib/media/manifest.json';
   import OptimizedImage from '../components/OptimizedImage';

   const myImage = manifest['my-image-filename']; // key is filename without extension

   export const MyComponent = () => (
       <OptimizedImage 
           src={myImage} 
           alt="Description" 
           priority={true} // Use for above-the-fold (LCP)
           sizes="(min-width: 1024px) 50vw, 100vw"
       />
   );
   ```

## Components
### `<OptimizedImage />`
- **Props**:
  - `src`: Asset Object (from manifest) OR string URL.
  - `priority`: `true` for hero images (eager load, high fetchPriority). `false` (default) for lazy load.
  - `sizes`: Responsive sizes definition.
  - `fill`: `true` to absolute fill parent (useful for covers).
- **Features**:
  - Automatic `srcSet` generation.
  - Aspect ratio reservation (CLS prevention).
  - Blur-up effect (using `blurDataURL` from manifest).
  - Async decoding.

## Rules & Conventions
1. **No Raw `<img>`**: Always use `<OptimizedImage />`.
2. **Hero Images**: Must have `priority={true}` and correct `sizes`.
3. **Remote Images**: Can be passed as string to `src`. They won't have auto-blur or auto-srcSet, but will benefit from lazy loading and decoding.
