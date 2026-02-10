import { useEffect, useRef } from 'react';

export function useScrollAnimation<T extends HTMLElement = HTMLElement>(delay: number = 0) {
    const ref = useRef<T>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        // Build the observer
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Add animation class — fill-mode: both handles
                        // opacity during delay and after completion
                        entry.target.classList.add('animate-fade-in-up');

                        // Stop observing
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px',
            }
        );

        // If delay is set, apply it directly to style
        if (delay > 0) {
            element.style.animationDelay = `${delay}ms`;
        }

        observer.observe(element);

        return () => {
            if (element) observer.unobserve(element);
        };
    }, [delay]);

    return ref;
}
