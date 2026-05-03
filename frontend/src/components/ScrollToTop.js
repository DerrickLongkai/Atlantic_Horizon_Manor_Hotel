import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  // Extract the current route path
  const { pathname } = useLocation();

  useEffect(() => {
    // Whenever the route changes, scroll the window back to the top
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // This component does not render any visible UI
};

export default ScrollToTop;
