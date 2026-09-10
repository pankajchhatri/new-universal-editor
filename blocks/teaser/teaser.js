import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

/**
 * loads and decorates the teaser block
 * @param {Element} block The teaser block element
 */
export default function decorate(block) {
  const [imageWrapper, textWrapper] = block.children;

  if (imageWrapper) {
    imageWrapper.classList.add('teaser-image');
    const img = imageWrapper.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      img.closest('picture').replaceWith(optimizedPic);
    }
  }

  if (textWrapper) {
    textWrapper.classList.add('teaser-content');
    const content = textWrapper.firstElementChild;
    if (content) {
      // the first paragraph before the heading is authored as the eyebrow/subtitle
      const heading = content.querySelector('h1, h2, h3, h4, h5, h6');
      const firstEl = content.firstElementChild;
      if (heading && firstEl && firstEl !== heading && !firstEl.querySelector('a')) {
        firstEl.classList.add('teaser-subtitle');
      }
    }
  }
}
