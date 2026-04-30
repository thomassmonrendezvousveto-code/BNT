'use client';

import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  /** Décalage de l'animation en ms (utile pour staggered cascades). */
  delay?: number;
  /** Distance verticale initiale (px). Par défaut 14. */
  y?: number;
  /** Active une fois et n'observe plus (par défaut true). */
  once?: boolean;
  /** Classe optionnelle du wrapper. */
  className?: string;
  /** Styles additionnels. */
  style?: CSSProperties;
  /** Tag HTML du wrapper. Par défaut div. */
  as?: 'div' | 'section' | 'article' | 'span';
};

/**
 * Reveal — wrap un bloc pour le faire apparaître en fade-up
 * lorsqu'il entre dans le viewport. Léger, sans dépendance.
 * Respecte prefers-reduced-motion (apparaît immédiatement).
 */
export function Reveal({
  children,
  delay = 0,
  y = 14,
  once = true,
  className,
  style,
  as = 'div',
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof window !== 'undefined') {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduce) {
        setVisible(true);
        return;
      }
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) io.unobserve(entry.target);
          } else if (!once) {
            setVisible(false);
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  const finalStyle: CSSProperties = {
    transform: visible ? 'translate3d(0,0,0)' : `translate3d(0,${y}px,0)`,
    opacity: visible ? 1 : 0,
    transition: `opacity 600ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform 700ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
    willChange: 'opacity, transform',
    ...style,
  };

  const Tag = as as 'div';
  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement>}
      className={className}
      style={finalStyle}
    >
      {children}
    </Tag>
  );
}
