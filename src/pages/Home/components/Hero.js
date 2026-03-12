import React from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import colors from '../../../assets/styles/variables/colors';
import metrics from '../../../assets/styles/variables/metrics';

export default function Hero() {
  return (
    <Wrapper id="hero">
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
          <PrimaryBtn to="/pipeline">
            Explore Our Pipeline
            <Arrow>&rarr;</Arrow>
          </PrimaryBtn>
          <SecondaryBtn to="/investors">Investor Relations</SecondaryBtn>
        </Actions>
      </Content>
    </Wrapper>
  );
}

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Wrapper = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: ${colors.bgSecondary};
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
  animation: ${fadeUp} 0.6s ease both;
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
  animation: ${fadeUp} 0.6s ease both;
  animation-delay: 0.2s;
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
  animation: ${fadeUp} 0.6s ease both;
  animation-delay: 0.3s;
  opacity: 0;
`;

const Actions = styled.div`
  display: flex;
  gap: 0.875rem;
  flex-wrap: wrap;
  animation: ${fadeUp} 0.6s ease both;
  animation-delay: 0.4s;
  opacity: 0;
`;

const Arrow = styled.span`
  display: inline-block;
  transition: transform 0.25s ease;
  margin-left: 0.35rem;
`;

const PrimaryBtn = styled(Link)`
  display: inline-flex;
  align-items: center;
  padding: 0.8rem 1.75rem;
  font-size: 0.95rem;
  font-weight: 600;
  color: white;
  background: ${colors.navy};
  border-radius: ${metrics.radius.medium};
  transition: background 0.25s ease;

  &:hover {
    background: ${colors.navyLight};
    ${Arrow} { transform: translateX(3px); }
  }
`;

const SecondaryBtn = styled(Link)`
  display: inline-flex;
  align-items: center;
  padding: 0.8rem 1.75rem;
  font-size: 0.95rem;
  font-weight: 600;
  color: ${colors.navy};
  background: white;
  border: 1.5px solid ${colors.border};
  border-radius: ${metrics.radius.medium};
  transition: border-color 0.25s ease;

  &:hover {
    border-color: ${colors.navy};
  }
`;
