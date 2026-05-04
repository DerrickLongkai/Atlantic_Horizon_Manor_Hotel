import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * COMPONENT: ScrollToTop
 * 
 * Automatically scrolls the window to the top when the route changes.
 *
 * PURPOSE:
 * - When users navigate to a new page, they should start at the top
 * - Without this component, users would stay at their previous scroll position
 * - Improves user experience for page navigation
 *
 */
const ScrollToTop = () => {
  /**
   * Extract the current route pathname
   * pathname updates whenever the user navigates to a new route
   */
  const { pathname } = useLocation();

  /**
   * Effect: Run whenever pathname changes
   * This ensures we scroll to the top on every route change
   */
  useEffect(() => {
    // Scroll the window to coordinates (0, 0) — top-left of the page
    window.scrollTo(0, 0);
  }, [pathname]); // Dependencies array: run effect when pathname changes

  /**
   * Render nothing to the DOM
   * This component is purely functional, not presentational
   */
  return null;
};

export default ScrollToTop;
