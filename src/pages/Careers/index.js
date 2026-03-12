import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../../assets/styles/variables/colors';
import metrics from '../../assets/styles/variables/metrics';
import PageHero from '../../components/PageHero/PageHero';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import useReveal from '../../hooks/useReveal';

const REASONS = [
  {
    title: 'Meaningful Work',
    description: 'Contribute to the development of targeted radiotherapies that have the potential to transform cancer treatment for patients with limited options.',
  },
  {
    title: 'Cutting-Edge Science',
    description: 'Work at the forefront of radiopharmaceutical development, using proprietary Actinium-225 technology to advance the field of targeted alpha therapy.',
  },
  {
    title: 'Collaborative Culture',
    description: 'Join a team of passionate professionals who share a commitment to scientific excellence and improving patient outcomes.',
  },
  {
    title: 'Growth & Development',
    description: 'Advance your career in a dynamic, growing organization with opportunities to contribute across multiple programs and functions.',
  },
  {
    title: 'NYC Location',
    description: 'Based in the heart of Manhattan at 100 Park Avenue, with easy access to transit and the vibrant New York City life sciences ecosystem.',
  },
  {
    title: 'Innovation-Driven',
    description: 'Be part of a company that values creative problem-solving and embraces new approaches to some of the toughest challenges in oncology.',
  },
];

export default function Careers() {
  const [reasonsRef, reasonsVisible] = useReveal(0.1);
  const [ctaRef, ctaVisible] = useReveal(0.1);

  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Join Our Team"
        subtitle="Help us advance the science of targeted alpha therapy and make a meaningful impact on patients' lives."
      />

      <ReasonsSection ref={reasonsRef}>
        <Container>
          <SectionHeader
            label="Why Actinium"
            title="Why Work With Us"
            description="At Actinium Pharmaceuticals, we're building the future of targeted cancer therapy. Here's why talented professionals choose to join our team."
            visible={reasonsVisible}
          />
          <ReasonsGrid>
            {REASONS.map((reason, i) => (
              <ReasonCard key={reason.title} $visible={reasonsVisible} $delay={i * 0.05}>
                <ReasonTitle>{reason.title}</ReasonTitle>
                <ReasonDesc>{reason.description}</ReasonDesc>
              </ReasonCard>
            ))}
          </ReasonsGrid>
        </Container>
      </ReasonsSection>

      <CTASection ref={ctaRef}>
        <Container>
          <CTACard $visible={ctaVisible}>
            <CTATitle>Interested in Joining Us?</CTATitle>
            <CTAText>
              We're always looking for talented, passionate people to join our team.
              If you're interested in contributing to our mission of transforming cancer
              treatment through targeted radiotherapy, we'd love to hear from you.
            </CTAText>
            <CTAActions>
              <CTAButton to="/contact">Get in Touch</CTAButton>
              <CTALink to="/about">Meet Our Team &rarr;</CTALink>
            </CTAActions>
          </CTACard>
        </Container>
      </CTASection>
    </>
  );
}

const Container = styled.div`
  max-width: ${metrics.maxWidth};
  margin: 0 auto;
  padding: 0 ${metrics.paddingHorizontal};
`;

const ReasonsSection = styled.section`
  padding: clamp(4rem, 8vw, 6rem) 0;
  background: ${colors.bgPrimary};
`;

const ReasonsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;

  @media (max-width: ${metrics.breakpoints.desktop}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: ${metrics.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const ReasonCard = styled.div`
  background: ${colors.bgSecondary};
  border: 1px solid ${colors.borderLight};
  border-radius: ${metrics.radius.large};
  padding: 2rem;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '15px'});
  transition: all 0.5s ease ${p => p.$delay}s;
`;

const ReasonTitle = styled.h3`
  font-size: 1.05rem;
  font-weight: 600;
  color: ${colors.navy};
  margin-bottom: 0.5rem;
`;

const ReasonDesc = styled.p`
  font-size: 0.9rem;
  color: ${colors.textSecondary};
  line-height: 1.6;
`;

const CTASection = styled.section`
  padding: 0 0 clamp(4rem, 8vw, 6rem);
  background: ${colors.bgPrimary};
`;

const CTACard = styled.div`
  background: ${colors.bgDark};
  border-radius: ${metrics.radius.xl};
  padding: clamp(2.5rem, 5vw, 4rem);
  text-align: center;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '20px'});
  transition: all 0.6s ease;
`;

const CTATitle = styled.h2`
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: clamp(1.75rem, 3vw, 2.25rem);
  font-weight: 400;
  color: ${colors.textOnDark};
  margin-bottom: 0.75rem;
`;

const CTAText = styled.p`
  font-size: 1rem;
  color: ${colors.textOnDarkMuted};
  max-width: 520px;
  margin: 0 auto 2rem;
  line-height: 1.65;
`;

const CTAActions = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const CTAButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  padding: 0.8rem 2rem;
  font-size: 0.95rem;
  font-weight: 600;
  color: ${colors.navy};
  background: white;
  border-radius: ${metrics.radius.medium};
  transition: background 0.25s ease;

  &:hover { background: ${colors.bgSecondary}; }
`;

const CTALink = styled(Link)`
  font-size: 0.92rem;
  font-weight: 500;
  color: ${colors.textOnDarkMuted};
  transition: color 0.25s ease;

  &:hover { color: white; }
`;
