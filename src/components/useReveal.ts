"use client";

import { useEffect } from "react";

export function useReveal(selector = ".snap-section") {
  useEffect(() => {
    const setupObserver = () => {
      const sections = document.querySelectorAll<HTMLElement>(selector);
      
      if (sections.length === 0) {
        // Retry after a short delay if sections aren't ready
        setTimeout(setupObserver, 200);
        return;
      }

      // Function to check if element is in viewport
      const isInViewport = (element: HTMLElement) => {
        const rect = element.getBoundingClientRect();
        return (
          rect.top < window.innerHeight * 0.8 &&
          rect.bottom > window.innerHeight * 0.2
        );
      };

      // Check initial visibility for sections already in viewport
      sections.forEach((section) => {
        if (isInViewport(section)) {
          section.classList.add("is-visible");
        }
      });

      // Create IntersectionObserver for sections not yet visible
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
            }
          });
        },
        {
          threshold: 0.1, // Trigger earlier (when 10% visible)
          rootMargin: "0px 0px -150px 0px", // Trigger when section is 150px from viewport
        }
      );

      // Observe all sections
      sections.forEach((section) => {
        observer.observe(section);
      });

      // Cleanup function
      return () => {
        sections.forEach((section) => {
          observer.unobserve(section);
        });
      };
    };

    // Use requestAnimationFrame to ensure DOM is ready
    const rafId = requestAnimationFrame(() => {
      setTimeout(setupObserver, 100);
    });

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [selector]);
}
