import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import colors from '../../../assets/styles/variables/colors';

const SIZE = 72;
const STROKE = 5;
const RADIUS = 30;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function useCountUp(target, duration = 800) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const observed = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || target == null) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !observed.current) {
          observed.current = true;
          const start = performance.now();
          const animate = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            setValue(Math.round(progress * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return [value, ref];
}

export default function EnrollmentRing({ count, type }) {
  const [displayCount, wrapperRef] = useCountUp(count || 0);

  const isActual = type === 'ACTUAL';
  const ringColor = isActual ? colors.teal : colors.blue;
  const fillPercent = isActual ? 1 : 0.6;
  const offset = CIRCUMFERENCE * (1 - fillPercent);

  return (
    <Wrapper ref={wrapperRef}>
      <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke={colors.bgTertiary}
          strokeWidth={STROKE}
        />
        <ForegroundCircle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke={ringColor}
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          $color={ringColor}
        />
      </svg>
      <CenterText>
        <Count>{count != null ? displayCount.toLocaleString() : '\u2014'}</Count>
        <TypeLabel>{isActual ? 'Enrolled' : 'Estimated'}</TypeLabel>
      </CenterText>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  width: ${SIZE}px;
  height: ${SIZE}px;
  flex-shrink: 0;
`;

const ForegroundCircle = styled.circle`
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
  transition: stroke-dashoffset 0.8s ease;
`;

const CenterText = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Count = styled.span`
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: 1.1rem;
  font-weight: 400;
  color: ${colors.textPrimary};
  line-height: 1.1;
`;

const TypeLabel = styled.span`
  font-size: 0.5rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: ${colors.textTertiary};
`;
