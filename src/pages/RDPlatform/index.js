import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../../assets/styles/variables/colors';
import metrics from '../../assets/styles/variables/metrics';
import PageHero from '../../components/PageHero/PageHero';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import useReveal from '../../hooks/useReveal';

const CAPABILITIES = [
  {
    title: 'Radiochemistry',
    description: 'Expert radiochemistry capabilities for labeling antibodies and other targeting vectors with Actinium-225 and other therapeutic radioisotopes.',
  },
  {
    title: 'Antibody Engineering',
    description: 'In-house expertise in antibody selection, modification, and optimization for optimal radioisotope conjugation and tumor targeting.',
  },
  {
    title: 'Preclinical Development',
    description: 'Comprehensive preclinical evaluation platform including in vitro assays, biodistribution studies, and efficacy models.',
  },
  {
    title: 'Manufacturing Scale-up',
    description: 'Proprietary processes for scaling radiopharmaceutical production from research to clinical and commercial quantities.',
  },
  {
    title: 'Clinical Development',
    description: 'End-to-end clinical trial design and execution capabilities with expertise in oncology and radiopharmaceutical regulatory pathways.',
  },
  {
    title: 'Quality & Regulatory',
    description: 'Robust quality management systems and deep regulatory expertise supporting IND/NDA submissions across multiple programs.',
  },
];

const PARTNERSHIPS = [
  {
    title: 'Academic Collaborations',
    description: 'Partnerships with leading cancer research institutions to advance understanding of targeted alpha therapy mechanisms and identify new therapeutic targets.',
  },
  {
    title: 'Manufacturing Partners',
    description: 'Strategic relationships with cyclotron facilities and radiochemistry partners to ensure reliable supply of Actinium-225 and other radioisotopes.',
  },
  {
    title: 'Clinical Networks',
    description: 'Established networks of leading oncology clinical sites experienced in radiopharmaceutical administration and patient monitoring.',
  },
];

export default function RDPlatform() {
  const [capRef, capVisible] = useReveal(0.1);
  const [partRef, partVisible] = useReveal(0.1);

  return (
    <>
      <PageHero
        eyebrow="R&D Platform"
        title="Integrated Drug Development"
        subtitle="An end-to-end platform for discovering, developing, and manufacturing targeted radiotherapies."
      />

      <CapabilitiesSection ref={capRef}>
        <Container>
          <SectionHeader
            label="Capabilities"
            title="Our R&D Platform"
            description="Actinium's integrated R&D platform spans the full drug development lifecycle, from target identification through clinical development and manufacturing."
            visible={capVisible}
          />
          <CapGrid>
            {CAPABILITIES.map((cap, i) => (
              <CapCard key={cap.title} $visible={capVisible} $delay={i * 0.05}>
                <CapTitle>{cap.title}</CapTitle>
                <CapDesc>{cap.description}</CapDesc>
              </CapCard>
            ))}
          </CapGrid>
        </Container>
      </CapabilitiesSection>

      <PartnershipsSection ref={partRef}>
        <Container>
          <SectionHeader
            label="Collaboration"
            title="Strategic Partnerships"
            description="We work with leading institutions and organizations to advance our pipeline and expand our capabilities."
            visible={partVisible}
          />
          <PartGrid>
            {PARTNERSHIPS.map((part, i) => (
              <PartCard key={part.title} $visible={partVisible} $delay={i * 0.05}>
                <PartTitle>{part.title}</PartTitle>
                <PartDesc>{part.description}</PartDesc>
              </PartCard>
            ))}
          </PartGrid>
          <CTARow>
            <CTALink to="/pipeline">Explore Our Pipeline &rarr;</CTALink>
            <CTALink to="/technology">Learn About Ac-225 &rarr;</CTALink>
          </CTARow>
        </Container>
      </PartnershipsSection>
    </>
  );
}

const Container = styled.div`
  max-width: ${metrics.maxWidth};
  margin: 0 auto;
  padding: 0 ${metrics.paddingHorizontal};
`;

const CapabilitiesSection = styled.section`
  padding: clamp(4rem, 8vw, 6rem) 0;
  background: ${colors.bgPrimary};
`;

const CapGrid = styled.div`
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

const CapCard = styled.div`
  background: ${colors.bgSecondary};
  border: 1px solid ${colors.borderLight};
  border-radius: ${metrics.radius.large};
  padding: 2rem;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '15px'});
  transition: all 0.5s ease ${p => p.$delay}s;
`;

const CapTitle = styled.h3`
  font-size: 1.05rem;
  font-weight: 600;
  color: ${colors.navy};
  margin-bottom: 0.5rem;
`;

const CapDesc = styled.p`
  font-size: 0.9rem;
  color: ${colors.textSecondary};
  line-height: 1.6;
`;

const PartnershipsSection = styled.section`
  padding: clamp(4rem, 8vw, 6rem) 0;
  background: ${colors.bgSecondary};
  border-top: 1px solid ${colors.borderLight};
`;

const PartGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;

  @media (max-width: ${metrics.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const PartCard = styled.div`
  background: ${colors.bgPrimary};
  border: 1px solid ${colors.border};
  border-radius: ${metrics.radius.large};
  padding: 2rem;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '15px'});
  transition: all 0.5s ease ${p => p.$delay}s;
`;

const PartTitle = styled.h3`
  font-size: 1.05rem;
  font-weight: 600;
  color: ${colors.navy};
  margin-bottom: 0.65rem;
`;

const PartDesc = styled.p`
  font-size: 0.9rem;
  color: ${colors.textSecondary};
  line-height: 1.6;
`;

const CTARow = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 3rem;
  flex-wrap: wrap;
`;

const CTALink = styled(Link)`
  font-size: 0.95rem;
  font-weight: 600;
  color: ${colors.blue};
`;
