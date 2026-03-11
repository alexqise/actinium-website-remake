import { useEffect, useRef, useState } from 'react';

export default function useReveal(threshold = 0.15, rootMargin = '0px 0px -60px 0px') {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.unobserve(node);
  }, [threshold, rootMargin]);

  return [ref, isVisible];
}
