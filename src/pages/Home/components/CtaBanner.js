import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../../../assets/styles/variables/colors';
import metrics from '../../../assets/styles/variables/metrics';
import useReveal from '../../../hooks/useReveal';

export default function CtaBanner() {
  const [ref, visible] = useReveal(0.15);

  return (
    <Wrapper id="cta">
      <Container>
        <Inner ref={ref} $visible={visible}>
          <Title>Join Us in Transforming Cancer Treatment</Title>
          <Desc>
            Stay informed about our latest breakthroughs, clinical trials,
            and company milestones.
          </Desc>
          <Form onSubmit={e => e.preventDefault()}>
            <Input
              type="email"
              placeholder="Enter your email"
              aria-label="Email address"
              required
            />
            <SubmitBtn type="submit">Subscribe</SubmitBtn>
          </Form>
          <Links>
            <LinkItem to="/careers">Explore Careers &rarr;</LinkItem>
            <LinkItem to="/contact">Contact Us &rarr;</LinkItem>
            <LinkItem to="/investors">Investor Relations &rarr;</LinkItem>
          </Links>
        </Inner>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  padding: clamp(3rem, 6vw, 5rem) 0;
  background: ${colors.bgPrimary};
`;

const Container = styled.div`
  max-width: ${metrics.maxWidth};
  margin: 0 auto;
  padding: 0 ${metrics.paddingHorizontal};
`;

const Inner = styled.div`
  background: ${colors.bgDark};
  border-radius: ${metrics.radius.xl};
  padding: clamp(2.5rem, 5vw, 4rem);
  text-align: center;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '20px'});
  transition: all 0.6s ease;
`;

const Title = styled.h2`
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: clamp(1.75rem, 3vw, 2.25rem);
  font-weight: 400;
  color: ${colors.textOnDark};
  margin-bottom: 0.75rem;
`;

const Desc = styled.p`
  font-size: 1rem;
  color: ${colors.textOnDarkMuted};
  max-width: 440px;
  margin: 0 auto 2rem;
  line-height: 1.65;
`;

const Form = styled.form`
  display: flex;
  gap: 0.6rem;
  max-width: 420px;
  margin: 0 auto 1.75rem;

  @media (max-width: ${metrics.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const Input = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: ${metrics.radius.small};
  color: white;
  font-size: 0.92rem;
  transition: border-color 0.25s ease;

  &::placeholder { color: rgba(255, 255, 255, 0.4); }
  &:focus { border-color: rgba(255, 255, 255, 0.4); }
`;

const SubmitBtn = styled.button`
  padding: 0.75rem 1.5rem;
  background: white;
  color: ${colors.navy};
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: ${metrics.radius.small};
  transition: background 0.25s ease;
  white-space: nowrap;

  &:hover { background: ${colors.bgSecondary}; }
`;

const Links = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const LinkItem = styled(Link)`
  font-size: 0.88rem;
  font-weight: 500;
  color: ${colors.textOnDarkMuted};
  transition: color 0.25s ease;

  &:hover { color: white; }
`;
