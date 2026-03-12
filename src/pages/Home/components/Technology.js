import React from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import colors from '../../../assets/styles/variables/colors';
import metrics from '../../../assets/styles/variables/metrics';
import useReveal from '../../../hooks/useReveal';

const FEATURES = [
  {
    title: 'Potent Alpha Particles',
    desc: 'Alpha particles deliver high linear energy transfer over short distances, causing irreparable double-strand DNA breaks in targeted cancer cells.',
  },
  {
    title: 'Precision Targeting',
    desc: 'Conjugated to monoclonal antibodies that bind specifically to tumor-associated antigens, ensuring precise delivery to cancer cells.',
  },
  {
    title: '10-Day Half-Life',
    desc: 'Optimal half-life balances therapeutic efficacy with practical considerations for manufacturing and clinical use.',
  },
];

export default function Technology() {
  const [ref, visible] = useReveal(0.1);

  return (
    <Wrapper id="technology">
      <Container ref={ref}>
        <VisualCol $visible={visible}>
          <AtomVisual>
            <Ring $size={80} $delay={0} />
            <Ring $size={140} $delay={0.5} />
            <Ring $size={200} $delay={1} />
            <Ring $size={260} $delay={1.5} />
            <Core>
              <CoreLabel>Ac</CoreLabel>
            </Core>
          </AtomVisual>
        </VisualCol>
        <TextCol>
          <Label $visible={visible}>Our Technology</Label>
          <Title $visible={visible}>
            The Power of Actinium-225
          </Title>
          <Desc $visible={visible}>
            Actinium-225 is an alpha-emitting radioisotope with unique properties
            that make it exceptionally effective for targeted cancer therapy.
          </Desc>
          <Features>
            {FEATURES.map((feat, i) => (
              <Feature key={feat.title} $visible={visible} $delay={0.15 * i}>
                <FeatureTitle>{feat.title}</FeatureTitle>
                <FeatureDesc>{feat.desc}</FeatureDesc>
              </Feature>
            ))}
          </Features>
          <LearnMoreLink to="/technology">
            Explore our technology <span>&rarr;</span>
          </LearnMoreLink>
        </TextCol>
      </Container>
    </Wrapper>
  );
}

const ringPulse = keyframes`
  0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
  50% { transform: translate(-50%, -50%) scale(1.04); opacity: 0.5; }
`;

const corePulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.15); }
  50% { box-shadow: 0 0 0 16px rgba(37, 99, 235, 0); }
`;

const Wrapper = styled.section`
  padding: clamp(5rem, 10vw, 8rem) 0;
  background: ${colors.bgPrimary};
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

const VisualCol = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 360px;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: scale(${p => p.$visible ? 1 : 0.9});
  transition: all 0.8s ease;

  @media (max-width: ${metrics.breakpoints.tablet}) {
    min-height: 280px;
    order: -1;
  }
`;

const AtomVisual = styled.div`
  position: relative;
  width: 280px;
  height: 280px;
`;

const Ring = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: ${p => p.$size}px;
  height: ${p => p.$size}px;
  border-radius: 50%;
  border: 1px solid ${colors.bluePale};
  animation: ${ringPulse} 3s ease-in-out ${p => p.$delay}s infinite;
`;

const Core = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: ${colors.navy};
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${corePulse} 2.5s ease-in-out infinite;
`;

const CoreLabel = styled.span`
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: 1.1rem;
  color: white;
  font-weight: 400;
`;

const TextCol = styled.div``;

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
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '20px'});
  transition: all 0.6s ease;

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
  margin-bottom: 1rem;
  line-height: 1.15;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '20px'});
  transition: all 0.6s ease 0.1s;
`;

const Desc = styled.p`
  font-size: 1.05rem;
  color: ${colors.textSecondary};
  line-height: 1.7;
  max-width: 480px;
  margin-bottom: 2rem;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '20px'});
  transition: all 0.6s ease 0.2s;
`;

const Features = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const Feature = styled.div`
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '15px'});
  transition: all 0.5s ease ${p => 0.3 + p.$delay}s;
`;

const FeatureTitle = styled.h4`
  font-size: 0.95rem;
  font-weight: 600;
  color: ${colors.navy};
  margin-bottom: 0.2rem;
`;

const FeatureDesc = styled.p`
  font-size: 0.88rem;
  color: ${colors.textSecondary};
  line-height: 1.55;
`;

const LearnMoreLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  margin-top: 2rem;
  font-size: 0.95rem;
  font-weight: 600;
  color: ${colors.blue};
  transition: gap 0.25s ease;

  &:hover { gap: 0.6rem; }
`;
