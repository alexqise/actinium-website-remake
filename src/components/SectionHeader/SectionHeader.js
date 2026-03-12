import React from 'react';
import styled from 'styled-components';
import colors from '../../assets/styles/variables/colors';

export default function SectionHeader({ label, title, description, visible = true }) {
  return (
    <Wrapper $visible={visible}>
      {label && <Label>{label}</Label>}
      <Title>{title}</Title>
      {description && <Desc>{description}</Desc>}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-bottom: 3rem;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '20px'});
  transition: all 0.6s ease;
`;

const Label = styled.span`
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: ${colors.blue};
  margin-bottom: 0.75rem;
`;

const Title = styled.h2`
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: clamp(2rem, 3.5vw, 2.75rem);
  font-weight: 400;
  color: ${colors.navy};
  letter-spacing: -0.01em;
  margin-bottom: 0.75rem;
  line-height: 1.15;
`;

const Desc = styled.p`
  font-size: 1.05rem;
  color: ${colors.textSecondary};
  max-width: 520px;
  line-height: 1.65;
`;
