import React from 'react';
import styled, { keyframes } from 'styled-components';
import colors from '../../../assets/styles/variables/colors';
import metrics from '../../../assets/styles/variables/metrics';

export default function LoadingState() {
  return (
    <Grid>
      {[0, 1, 2, 3].map(i => (
        <SkeletonCard key={i}>
          <SkeletonRow>
            <SkeletonPill width="80px" />
            <SkeletonPill width="90px" />
          </SkeletonRow>
          <SkeletonLine width="85%" height="16px" />
          <SkeletonLine width="60%" height="12px" />
          <SkeletonDivider />
          <SkeletonMetrics>
            <SkeletonDots />
            <SkeletonCircle />
          </SkeletonMetrics>
          <SkeletonBar />
        </SkeletonCard>
      ))}
    </Grid>
  );
}

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;

  @media (max-width: ${metrics.breakpoints.desktop}) {
    grid-template-columns: 1fr;
  }
`;

const SkeletonCard = styled.div`
  background: ${colors.bgPrimary};
  border: 1px solid ${colors.border};
  border-left: 3px solid ${colors.border};
  border-radius: ${metrics.radius.large};
  padding: 1.5rem;
  animation: ${pulse} 1.8s ease-in-out infinite;
`;

const SkeletonRow = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const SkeletonPill = styled.div`
  height: 20px;
  width: ${p => p.width || '60px'};
  background: ${colors.bgTertiary};
  border-radius: 100px;
`;

const SkeletonLine = styled.div`
  height: ${p => p.height || '12px'};
  width: ${p => p.width || '100%'};
  background: ${colors.bgTertiary};
  border-radius: 4px;
  margin-bottom: 0.5rem;
`;

const SkeletonDivider = styled.div`
  height: 1px;
  background: ${colors.borderLight};
  margin: 1rem 0;
`;

const SkeletonMetrics = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const SkeletonDots = styled.div`
  width: 100px;
  height: 10px;
  background: ${colors.bgTertiary};
  border-radius: 5px;
`;

const SkeletonCircle = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: ${colors.bgTertiary};
`;

const SkeletonBar = styled.div`
  height: 6px;
  width: 100%;
  background: ${colors.bgTertiary};
  border-radius: 3px;
`;
