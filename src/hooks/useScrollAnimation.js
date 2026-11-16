import { useEffect, useRef, useState } from 'react';

export function useScrollAnimation(threshold = 0.15) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Check if element is already in viewport
    const rect = el.getBoundingClientRect();
    if (rect.top <= window.innerHeight) {
      setIsVisible(true);
      el.classList?.add('visible');
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          entry.target.classList?.add('visible');
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  // Create a tuple that also works as an object and ref object
  const result = [ref, isVisible];
  result.ref = ref;
  result.isVisible = isVisible;
  // Proxy .current to ref.current so `ref={animRef}` works directly
  Object.defineProperty(result, 'current', {
    get() {
      return ref.current;
    },
    set(val) {
      ref.current = val;
    },
  });

  return result;
}

export function useScrollAnimationGroup(count, threshold = 0.15, stagger = 100) {
  const refs = useRef([]);
  const [visibleItems, setVisibleItems] = useState(new Set());

  useEffect(() => {
    const observers = [];
    refs.current.forEach((el, index) => {
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleItems((prev) => new Set([...prev, index]));
              el.classList?.add('visible');
            }, index * stagger);
            observer.unobserve(entry.target);
          }
        },
        { threshold }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, [count, threshold, stagger]);

  return [refs, visibleItems];
}

export default useScrollAnimation;
