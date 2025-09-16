
/**
 * GSAP Utility wrapper to handle CDN loaded GSAP
 * This provides TypeScript types and safe access to GSAP and its plugins
 */

// Define the global GSAP types based on CDN loading
declare global {
  interface Window {
    gsap: any;
    ScrollTrigger: any;
  }
}

// Export gsap from window if available
export const gsap = typeof window !== 'undefined' ? window.gsap : null;
export const ScrollTrigger = typeof window !== 'undefined' ? window.ScrollTrigger : null;

// Register ScrollTrigger plugin if available
export const registerScrollTrigger = () => {
  if (gsap && ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    return true;
  }
  return false;
};

// Helper for fromTo animation
export const fromTo = (
  element: string | Element | Element[] | NodeList,
  fromVars: Record<string, any>,
  toVars: Record<string, any>
) => {
  if (gsap) {
    return gsap.fromTo(element, fromVars, toVars);
  }
  return null;
};

// Helper for timeline creation
export const createTimeline = (vars?: Record<string, any>) => {
  if (gsap) {
    return gsap.timeline(vars);
  }
  return null;
};

// Helper for ScrollTrigger creation
export const createScrollTrigger = (config: Record<string, any>) => {
  if (ScrollTrigger) {
    return ScrollTrigger.create(config);
  }
  return null;
};
