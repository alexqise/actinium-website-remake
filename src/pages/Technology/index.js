import React from 'react';
import styled, { keyframes } from 'styled-components';
import colors from '../../assets/styles/variables/colors';
import metrics from '../../assets/styles/variables/metrics';
import PageHero from '../../components/PageHero/PageHero';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import useReveal from '../../hooks/useReveal';
import { SPECS, ADVANTAGES, MANUFACTURING_STEPS, PATENTS } from '../../data/technologyData';

export default function Technology() {
  const [overviewRef, overviewVisible] = useReveal(0.1);
  const [specsRef, specsVisible] = useReveal(0.1);
  const [mfgRef, mfgVisible] = useReveal(0.1);
  const [patentsRef, patentsVisible] = useReveal(0.1);

  return (
    <>
      <PageHero
        eyebrow="Our Technology"
        title="The Power of Actinium-225"
        subtitle="A uniquely potent alpha-emitting radioisotope with exceptional properties for targeted cancer therapy."
      />

      <AtomSection ref={overviewRef}>
        <Container>
          <AtomGrid>
            <AtomVisualCol $visible={overviewVisible}>
              <AtomVisual>
                <Ring $size={80} $delay={0} />
                <Ring $size={140} $delay={0.5} />
                <Ring $size={200} $delay={1} />
                <Ring $size={260} $delay={1.5} />
                <Core>
                  <CoreLabel>Ac</CoreLabel>
                  <CoreNumber>225</CoreNumber>
                </Core>
              </AtomVisual>
            </AtomVisualCol>
            <div>
              <SectionHeader
                label="Alpha Therapy"
                title="Why Actinium-225?"
                description="Actinium-225 is an alpha-emitting radioisotope with unique properties that make it exceptionally suited for targeted cancer therapy. Its high linear energy transfer destroys cancer cells with surgical precision."
                visible={overviewVisible}
              />
              <AdvantagesGrid>
                {ADVANTAGES.map((adv, i) => (
                  <AdvantageCard key={adv.title} $visible={overviewVisible} $delay={i * 0.08}>
                    <AdvTitle>{adv.title}</AdvTitle>
                    <AdvDesc>{adv.description}</AdvDesc>
                  </AdvantageCard>
                ))}
              </AdvantagesGrid>
            </div>
          </AtomGrid>
        </Container>
      </AtomSection>

      <SpecsSection ref={specsRef}>
        <Container>
          <SectionHeader
            label="Specifications"
            title="Ac-225 Technical Profile"
            visible={specsVisible}
          />
          <SpecsGrid>
            {SPECS.map((spec, i) => (
              <SpecCard key={spec.label} $visible={specsVisible} $delay={i * 0.08}>
                <SpecValue>{spec.value}</SpecValue>
                <SpecLabel>{spec.label}</SpecLabel>
              </SpecCard>
            ))}
          </SpecsGrid>
        </Container>
      </SpecsSection>

      <MfgSection ref={mfgRef}>
        <Container>
          <SectionHeader
            label="Manufacturing"
            title="Proprietary Production Process"
            description="Actinium has developed cyclotron-based manufacturing technology that produces high-purity Actinium-225, addressing a critical supply constraint in the field."
            visible={mfgVisible}
          />
          <StepsGrid>
            {MANUFACTURING_STEPS.map((step, i) => (
              <StepCard key={step.step} $visible={mfgVisible} $delay={i * 0.1}>
                <StepNumber>{step.step}</StepNumber>
                <div>
                  <StepTitle>{step.title}</StepTitle>
                  <StepDesc>{step.description}</StepDesc>
                </div>
              </StepCard>
            ))}
          </StepsGrid>
        </Container>
      </MfgSection>

      <PatentsSection ref={patentsRef}>
        <Container>
          <PatentsCard $visible={patentsVisible}>
            <SectionHeader
              label="Intellectual Property"
              title="Patent Portfolio"
              description={PATENTS.description}
              visible={patentsVisible}
            />
            <PatentsList>
              {PATENTS.areas.map(area => (
                <PatentItem key={area}>{area}</PatentItem>
              ))}
            </PatentsList>
          </PatentsCard>
        </Container>
      </PatentsSection>
    </>
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

const Container = styled.div`
  max-width: ${metrics.maxWidth};
  margin: 0 auto;
  padding: 0 ${metrics.paddingHorizontal};
`;

const AtomSection = styled.section`
  padding: clamp(4rem, 8vw, 6rem) 0;
  background: ${colors.bgPrimary};
`;

const AtomGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: 4rem;
  align-items: start;

  @media (max-width: ${metrics.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const AtomVisualCol = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 320px;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: scale(${p => p.$visible ? 1 : 0.9});
  transition: all 0.8s ease;
  position: sticky;
  top: calc(${metrics.navHeight} + 2rem);

  @media (max-width: ${metrics.breakpoints.tablet}) {
    position: static;
    min-height: 260px;
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
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${colors.navy};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: ${corePulse} 2.5s ease-in-out infinite;
`;

const CoreLabel = styled.span`
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: 1.1rem;
  color: white;
  font-weight: 400;
  line-height: 1;
`;

const CoreNumber = styled.span`
  font-size: 0.55rem;
  color: rgba(255,255,255,0.6);
  font-weight: 600;
`;

const AdvantagesGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const AdvantageCard = styled.div`
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '15px'});
  transition: all 0.5s ease ${p => 0.3 + p.$delay}s;
`;

const AdvTitle = styled.h4`
  font-size: 0.95rem;
  font-weight: 600;
  color: ${colors.navy};
  margin-bottom: 0.2rem;
`;

const AdvDesc = styled.p`
  font-size: 0.88rem;
  color: ${colors.textSecondary};
  line-height: 1.55;
`;

const SpecsSection = styled.section`
  padding: clamp(4rem, 8vw, 6rem) 0;
  background: ${colors.bgSecondary};
  border-top: 1px solid ${colors.borderLight};
`;

const SpecsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;

  @media (max-width: ${metrics.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: ${metrics.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const SpecCard = styled.div`
  background: ${colors.bgPrimary};
  border: 1px solid ${colors.border};
  border-radius: ${metrics.radius.large};
  padding: 1.75rem;
  text-align: center;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '25px'});
  transition: all 0.5s ease ${p => 0.2 + p.$delay}s;
`;

const SpecValue = styled.div`
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: 1.5rem;
  font-weight: 400;
  color: ${colors.navy};
  margin-bottom: 0.35rem;
`;

const SpecLabel = styled.div`
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: ${colors.textTertiary};
`;

const MfgSection = styled.section`
  padding: clamp(4rem, 8vw, 6rem) 0;
  background: ${colors.bgPrimary};
`;

const StepsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;

  @media (max-width: ${metrics.breakpoints.desktop}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: ${metrics.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const StepCard = styled.div`
  background: ${colors.bgSecondary};
  border: 1px solid ${colors.borderLight};
  border-radius: ${metrics.radius.large};
  padding: 1.75rem;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '25px'});
  transition: all 0.5s ease ${p => 0.2 + p.$delay}s;
`;

const StepNumber = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${colors.navy};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const StepTitle = styled.h4`
  font-size: 0.95rem;
  font-weight: 600;
  color: ${colors.navy};
  margin-bottom: 0.35rem;
`;

const StepDesc = styled.p`
  font-size: 0.88rem;
  color: ${colors.textSecondary};
  line-height: 1.55;
`;

const PatentsSection = styled.section`
  padding: clamp(4rem, 8vw, 6rem) 0;
  background: ${colors.bgSecondary};
  border-top: 1px solid ${colors.borderLight};
`;

const PatentsCard = styled.div`
  background: ${colors.bgPrimary};
  border: 1px solid ${colors.border};
  border-radius: ${metrics.radius.xl};
  padding: clamp(2rem, 4vw, 3rem);
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '30px'});
  transition: all 0.7s ease;
`;

const PatentsList = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem 2rem;

  @media (max-width: ${metrics.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const PatentItem = styled.li`
  font-size: 0.95rem;
  color: ${colors.textSecondary};
  line-height: 1.6;
  padding-left: 1.5rem;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.55em;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${colors.blue};
    opacity: 0.4;
  }
`;
