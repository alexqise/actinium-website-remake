import React from 'react';
import styled from 'styled-components';
import colors from '../../assets/styles/variables/colors';
import metrics from '../../assets/styles/variables/metrics';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';

export default function PageHero({ eyebrow, title, subtitle }) {
  return (
    <Wrapper>
      <Content>
        <Breadcrumbs />
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <Title>{title}</Title>
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
      </Content>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  padding: calc(${metrics.navHeight} + 3rem) 0 3.5rem;
  background: ${colors.bgDark};
`;

const Content = styled.div`
  max-width: ${metrics.maxWidth};
  margin: 0 auto;
  padding: 0 ${metrics.paddingHorizontal};
`;

const Eyebrow = styled.span`
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: ${colors.tealLight};
  margin-bottom: 0.75rem;
`;

const Title = styled.h1`
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: clamp(2.25rem, 4.5vw, 3.25rem);
  font-weight: 400;
  line-height: 1.15;
  color: ${colors.textOnDark};
  max-width: 600px;
  margin-bottom: 0.75rem;
`;

const Subtitle = styled.p`
  font-size: clamp(1rem, 1.5vw, 1.1rem);
  line-height: 1.7;
  color: ${colors.textOnDarkMuted};
  max-width: 520px;
`;
