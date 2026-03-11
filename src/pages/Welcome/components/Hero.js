import React from 'react';
import styled, { keyframes } from 'styled-components';
import colors from '../../../assets/styles/variables/colors';
import metrics from '../../../assets/styles/variables/metrics';

export default function Hero() {
  return (
    <Wrapper id="hero">
      <BgPattern />
      <Content>
        <Eyebrow>Pioneering Targeted Alpha Therapy</Eyebrow>
        <Title>
          Targeted Radiotherapies{' '}
          <TitleItalic>for Patients with</TitleItalic>{' '}
          Unmet Needs
        </Title>
        <Subtitle>
          Developing Actinium-225 based targeted radiotherapy to transform
          cancer treatment for patients who need it most.
        </Subtitle>
        <Actions>
          <PrimaryBtn href="#pipeline">
            Explore Our Pipeline
            <Arrow>&rarr;</Arrow>
          </PrimaryBtn>
          <SecondaryBtn href="#">Investor Relations</SecondaryBtn>
        </Actions>
      </Content>
      <ScrollHint>
        <ScrollLine />
      </ScrollHint>
    </Wrapper>
  );
}

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(28px); }
  to { opacity: 1; transform: translateY(0); }
`;

const scrollPulse = keyframes`
  0% { transform: scaleY(0); opacity: 0; transform-origin: top; }
  40% { transform: scaleY(1); opacity: 1; transform-origin: top; }
  40.01% { transform-origin: bottom; }
  80%, 100% { transform: scaleY(0); opacity: 0; transform-origin: bottom; }
`;

const Wrapper = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: linear-gradient(168deg, ${colors.bgPrimary} 0%, ${colors.bgSecondary} 40%, ${colors.blueFaint} 100%);
`;

const BgPattern = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0.4;
  background-image:
    radial-gradient(circle at 75% 25%, ${colors.bluePale} 0%, transparent 50%),
    radial-gradient(circle at 20% 80%, rgba(8, 145, 178, 0.06) 0%, transparent 40%);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(90deg, transparent 49.5%, ${colors.border} 49.5%, ${colors.border} 50.5%, transparent 50.5%),
      linear-gradient(0deg, transparent 49.5%, ${colors.border} 49.5%, ${colors.border} 50.5%, transparent 50.5%);
    background-size: 120px 120px;
    opacity: 0.35;
    mask-image: radial-gradient(ellipse 70% 70% at 70% 40%, black 0%, transparent 70%);
    -webkit-mask-image: radial-gradient(ellipse 70% 70% at 70% 40%, black 0%, transparent 70%);
  }
`;

const Content = styled.div`
  position: relative;
  max-width: ${metrics.maxWidth};
  margin: 0 auto;
  padding: calc(${metrics.navHeight} + 4rem) ${metrics.paddingHorizontal} 5rem;
  width: 100%;

  @media (max-width: ${metrics.breakpoints.tablet}) {
    padding-top: calc(${metrics.navHeight} + 3rem);
    padding-bottom: 4rem;
  }
`;

const Eyebrow = styled.span`
  display: inline-block;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${colors.blue};
  margin-bottom: 1.5rem;
  animation: ${fadeUp} 0.7s ease both;
  animation-delay: 0.1s;
  opacity: 0;
`;

const Title = styled.h1`
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: clamp(2.75rem, 5.5vw, 4.25rem);
  font-weight: 400;
  line-height: 1.12;
  letter-spacing: -0.015em;
  color: ${colors.navy};
  max-width: 720px;
  margin-bottom: 1.5rem;
  animation: ${fadeUp} 0.7s ease both;
  animation-delay: 0.25s;
  opacity: 0;
`;

const TitleItalic = styled.em`
  font-style: italic;
  color: ${colors.textSecondary};
`;

const Subtitle = styled.p`
  font-size: clamp(1.05rem, 1.8vw, 1.2rem);
  line-height: 1.7;
  color: ${colors.textSecondary};
  max-width: 540px;
  margin-bottom: 2.25rem;
  animation: ${fadeUp} 0.7s ease both;
  animation-delay: 0.4s;
  opacity: 0;
`;

const Actions = styled.div`
  display: flex;
  gap: 0.875rem;
  flex-wrap: wrap;
  animation: ${fadeUp} 0.7s ease both;
  animation-delay: 0.55s;
  opacity: 0;
`;

const Arrow = styled.span`
  display: inline-block;
  transition: transform 0.25s ease;
  margin-left: 0.35rem;
`;

const PrimaryBtn = styled.a`
  display: inline-flex;
  align-items: center;
  padding: 0.8rem 1.75rem;
  font-size: 0.95rem;
  font-weight: 600;
  color: white;
  background: ${colors.navy};
  border-radius: ${metrics.radius.medium};
  transition: all 0.3s ease;

  &:hover {
    background: ${colors.navyLight};
    transform: translateY(-1px);
    box-shadow: ${colors.shadowLg};

    ${Arrow} { transform: translateX(3px); }
  }
`;

const SecondaryBtn = styled.a`
  display: inline-flex;
  align-items: center;
  padding: 0.8rem 1.75rem;
  font-size: 0.95rem;
  font-weight: 600;
  color: ${colors.navy};
  background: white;
  border: 1.5px solid ${colors.border};
  border-radius: ${metrics.radius.medium};
  transition: all 0.3s ease;

  &:hover {
    border-color: ${colors.navy};
    transform: translateY(-1px);
    box-shadow: ${colors.shadowMd};
  }
`;

const ScrollHint = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);

  @media (max-width: ${metrics.breakpoints.tablet}) {
    display: none;
  }
`;

const ScrollLine = styled.div`
  width: 1px;
  height: 44px;
  background: ${colors.navy};
  animation: ${scrollPulse} 2.5s ease-in-out infinite;
`;
