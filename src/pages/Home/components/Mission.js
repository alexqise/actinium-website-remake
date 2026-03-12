import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../../../assets/styles/variables/colors';
import metrics from '../../../assets/styles/variables/metrics';
import useReveal from '../../../hooks/useReveal';
import useCountUp from '../../../hooks/useCountUp';

const STATS = [
  { value: 4, suffix: '+', label: 'Pipeline Programs' },
  { value: 225, suffix: '+', label: 'Patients Treated' },
  { value: 20, suffix: '+', label: 'Years of Innovation' },
];

function StatItem({ value, suffix, label, isVisible }) {
  const count = useCountUp(value, isVisible);
  return (
    <Stat>
      <StatValue>{count}{suffix}</StatValue>
      <StatLabel>{label}</StatLabel>
    </Stat>
  );
}

export default function Mission() {
  const [ref, visible] = useReveal(0.1);

  return (
    <Wrapper id="about">
      <Container ref={ref}>
        <TextCol $visible={visible}>
          <Label>Our Mission</Label>
          <Title>
            Advancing the Science of Targeted Alpha Therapy
          </Title>
          <Desc>
            Actinium Pharmaceuticals is a clinical-stage biopharmaceutical
            company developing targeted radiotherapies based on its proprietary
            Actinium-225 technology. Our mission is to deliver transformative
            therapies for patients battling cancers with limited treatment
            options.
          </Desc>
          <LearnMoreLink to="/about">
            Learn more about us <span>&rarr;</span>
          </LearnMoreLink>
        </TextCol>
        <StatsCol $visible={visible}>
          {STATS.map(stat => (
            <StatItem key={stat.label} {...stat} isVisible={visible} />
          ))}
        </StatsCol>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  padding: clamp(5rem, 10vw, 8rem) 0;
  background: ${colors.bgSecondary};
  border-top: 1px solid ${colors.borderLight};
  border-bottom: 1px solid ${colors.borderLight};
`;

const Container = styled.div`
  max-width: ${metrics.maxWidth};
  margin: 0 auto;
  padding: 0 ${metrics.paddingHorizontal};
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: ${metrics.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const TextCol = styled.div`
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '30px'});
  transition: all 0.7s ease;
`;

const Label = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: ${colors.blue};
  margin-bottom: 0.75rem;

  &::before {
    content: '';
    width: 20px;
    height: 1.5px;
    background: ${colors.blue};
  }
`;

const Title = styled.h2`
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: clamp(2rem, 3.5vw, 2.75rem);
  font-weight: 400;
  color: ${colors.navy};
  letter-spacing: -0.01em;
  margin-bottom: 1.25rem;
  line-height: 1.15;
`;

const Desc = styled.p`
  font-size: 1.05rem;
  color: ${colors.textSecondary};
  line-height: 1.7;
  max-width: 500px;
`;

const LearnMoreLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  margin-top: 1.5rem;
  font-size: 0.95rem;
  font-weight: 600;
  color: ${colors.blue};
  transition: gap 0.25s ease;

  &:hover { gap: 0.6rem; }
`;

const StatsCol = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '30px'});
  transition: all 0.7s ease 0.2s;

  @media (max-width: ${metrics.breakpoints.mobile}) {
    grid-template-columns: repeat(3, 1fr);
    gap: 0.75rem;
  }
`;

const Stat = styled.div`
  text-align: center;
  padding: 1.75rem 1rem;
  background: ${colors.bgPrimary};
  border: 1px solid ${colors.border};
  border-radius: ${metrics.radius.large};
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
