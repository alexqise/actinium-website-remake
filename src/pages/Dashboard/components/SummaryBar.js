import React from 'react';
import styled from 'styled-components';
import colors from '../../../assets/styles/variables/colors';
import metrics from '../../../assets/styles/variables/metrics';
import useReveal from '../../../hooks/useReveal';
import useCountUp from '../../../hooks/useCountUp';

function countByStatus(studies, status) {
  return studies.filter(
    s => s.protocolSection?.statusModule?.overallStatus === status
  ).length;
}

function StatCard({ value, label, isVisible, delay }) {
  const count = useCountUp(value, isVisible);
  return (
    <Stat $visible={isVisible} $delay={delay}>
      <StatValue>{count}</StatValue>
      <StatLabel>{label}</StatLabel>
    </Stat>
  );
}

export default function SummaryBar({ studies = [] }) {
  const [ref, visible] = useReveal(0.1);

  const stats = [
    { value: studies.length, label: 'Total Studies' },
    { value: countByStatus(studies, 'RECRUITING'), label: 'Recruiting' },
    { value: countByStatus(studies, 'ACTIVE_NOT_RECRUITING'), label: 'Active, Not Recruiting' },
    { value: countByStatus(studies, 'COMPLETED'), label: 'Completed' },
  ];

  return (
    <Grid ref={ref}>
      {stats.map((stat, i) => (
        <StatCard
          key={stat.label}
          value={stat.value}
          label={stat.label}
          isVisible={visible}
          delay={i * 0.1}
        />
      ))}
    </Grid>
  );
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;

  @media (max-width: ${metrics.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: ${metrics.breakpoints.mobile}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Stat = styled.div`
  text-align: center;
  padding: 1.75rem 1rem;
  background: ${colors.bgPrimary};
  border: 1px solid ${colors.border};
  border-radius: ${metrics.radius.large};
  opacity: ${p => (p.$visible ? 1 : 0)};
  transform: translateY(${p => (p.$visible ? 0 : '30px')});
  transition: all 0.7s ease;
  transition-delay: ${p => p.$delay}s;
`;

const StatValue = styled.div`
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: clamp(2rem, 3vw, 2.75rem);
  font-weight: 400;
  color: ${colors.navy};
  line-height: 1.1;
  margin-bottom: 0.35rem;
`;

const StatLabel = styled.div`
  font-size: 0.78rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: ${colors.textTertiary};
`;
