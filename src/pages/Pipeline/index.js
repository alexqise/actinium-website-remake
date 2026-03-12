import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../../assets/styles/variables/colors';
import metrics from '../../assets/styles/variables/metrics';
import PageHero from '../../components/PageHero/PageHero';
import useReveal from '../../hooks/useReveal';
import PIPELINE from '../../data/pipelineData';

const PHASES = ['Preclinical', 'Phase 1', 'Phase 2', 'Phase 3', 'Filed'];

function getPhaseRange(phaseNumber) {
  if (phaseNumber >= 2.5) return { start: 0, end: 4 };
  if (phaseNumber >= 1) return { start: 0, end: 2 };
  return { start: 0, end: 1 };
}

export default function PipelineOverview() {
  const [chartRef, chartVisible] = useReveal(0.1);
  const [cardsRef, cardsVisible] = useReveal(0.1);

  return (
    <>
      <PageHero
        eyebrow="Our Pipeline"
        title="Transforming Cancer Treatment"
        subtitle="A diversified portfolio of targeted radiotherapies addressing significant unmet medical needs across multiple cancer types."
      />

      <ChartSection ref={chartRef}>
        <Container>
          <ChartHeader $visible={chartVisible}>
            <ChartTitle>Development Pipeline</ChartTitle>
            <ChartSubtitle>Click on any program to learn more</ChartSubtitle>
          </ChartHeader>
          <Chart $visible={chartVisible}>
            <PhaseHeaders>
              <PhaseLabel />
              {PHASES.map(phase => (
                <PhaseLabel key={phase}>{phase}</PhaseLabel>
              ))}
            </PhaseHeaders>
            {PIPELINE.map((drug, i) => {
              const range = getPhaseRange(drug.phaseNumber);
              return (
                <DrugRow key={drug.slug} $delay={i * 0.1} $visible={chartVisible}>
                  <DrugLabel>{drug.name}</DrugLabel>
                  {PHASES.map((_, j) => (
                    <PhaseCell key={j}>
                      {j >= range.start && j <= range.end && (
                        <PhaseBar
                          as={Link}
                          to={`/pipeline/${drug.slug}`}
                          $color={drug.phaseColor}
                          $bg={drug.phaseBg}
                          $isFirst={j === range.start}
                          $isLast={j === range.end}
                        >
                          {j === range.end && (
                            <PhaseBadge $color={drug.phaseColor}>
                              {drug.phase}
                            </PhaseBadge>
                          )}
                        </PhaseBar>
                      )}
                    </PhaseCell>
                  ))}
                </DrugRow>
              );
            })}
          </Chart>
        </Container>
      </ChartSection>

      <CardsSection ref={cardsRef}>
        <Container>
          <CardsGrid>
            {PIPELINE.map((drug, i) => (
              <ProgramCard
                key={drug.slug}
                as={Link}
                to={`/pipeline/${drug.slug}`}
                $visible={cardsVisible}
                $delay={i * 0.1}
              >
                <Phase $color={drug.phaseColor} $bg={drug.phaseBg}>
                  {drug.status}
                  {drug.fastTrack && <FastTrack>FDA Fast Track</FastTrack>}
                </Phase>
                <CardName>{drug.name}</CardName>
                <CardTarget>{drug.target} &middot; {drug.indication}</CardTarget>
                <CardDesc>{drug.shortDescription}</CardDesc>
                <LearnMore>
                  View details <span>&rarr;</span>
                </LearnMore>
              </ProgramCard>
            ))}
          </CardsGrid>
        </Container>
      </CardsSection>
    </>
  );
}

const Container = styled.div`
  max-width: ${metrics.maxWidth};
  margin: 0 auto;
  padding: 0 ${metrics.paddingHorizontal};
`;

const ChartSection = styled.section`
  padding: clamp(4rem, 8vw, 6rem) 0;
  background: ${colors.bgPrimary};
`;

const ChartHeader = styled.div`
  margin-bottom: 2.5rem;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '20px'});
  transition: all 0.6s ease;
`;

const ChartTitle = styled.h2`
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: clamp(1.75rem, 3vw, 2.25rem);
  font-weight: 400;
  color: ${colors.navy};
  margin-bottom: 0.35rem;
`;

const ChartSubtitle = styled.p`
  font-size: 0.95rem;
  color: ${colors.textTertiary};
`;

const Chart = styled.div`
  border: 1px solid ${colors.border};
  border-radius: ${metrics.radius.large};
  overflow: hidden;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '20px'});
  transition: all 0.7s ease 0.2s;

  @media (max-width: ${metrics.breakpoints.tablet}) {
    overflow-x: auto;
    min-width: 0;
  }
`;

const PhaseHeaders = styled.div`
  display: grid;
  grid-template-columns: 160px repeat(5, 1fr);
  background: ${colors.bgSecondary};
  border-bottom: 1px solid ${colors.border};

  @media (max-width: ${metrics.breakpoints.tablet}) {
    min-width: 600px;
  }
`;

const PhaseLabel = styled.div`
  padding: 0.85rem 1rem;
  font-size: 0.78rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${colors.textTertiary};
  text-align: center;

  &:first-child {
    text-align: left;
  }
`;

const DrugRow = styled.div`
  display: grid;
  grid-template-columns: 160px repeat(5, 1fr);
  border-bottom: 1px solid ${colors.borderLight};
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateX(${p => p.$visible ? 0 : '-20px'});
  transition: all 0.5s ease ${p => 0.3 + p.$delay}s;

  &:last-child { border-bottom: none; }

  @media (max-width: ${metrics.breakpoints.tablet}) {
    min-width: 600px;
  }
`;

const DrugLabel = styled.div`
  padding: 1.15rem 1rem;
  font-size: 0.92rem;
  font-weight: 600;
  color: ${colors.navy};
  display: flex;
  align-items: center;
`;

const PhaseCell = styled.div`
  padding: 0.85rem 0.25rem;
  display: flex;
  align-items: center;
`;

const PhaseBar = styled.div`
  width: 100%;
  height: 36px;
  background: ${p => p.$bg};
  border: 1px solid ${p => p.$color}33;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 0.5rem;
  transition: all 0.25s ease;
  cursor: pointer;

  border-radius: ${p => {
    const left = p.$isFirst ? '6px' : '0';
    const right = p.$isLast ? '6px' : '0';
    return `${left} ${right} ${right} ${left}`;
  }};
`;

const PhaseBadge = styled.span`
  font-size: 0.68rem;
  font-weight: 600;
  color: ${p => p.$color};
  white-space: nowrap;
`;

const CardsSection = styled.section`
  padding: 0 0 clamp(4rem, 8vw, 6rem);
  background: ${colors.bgPrimary};
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;

  @media (max-width: ${metrics.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const ProgramCard = styled.div`
  background: ${colors.bgSecondary};
  border: 1px solid ${colors.borderLight};
  border-radius: ${metrics.radius.large};
  padding: 2rem;
  display: block;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '15px'});
  transition: all 0.5s ease ${p => p.$delay}s;
`;

const Phase = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;

  padding: 0.25rem 0.7rem;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  border-radius: 100px;
  color: ${p => p.$color};
  background: ${p => p.$bg};
`;

const FastTrack = styled.span`
  display: inline-flex;
  padding: 0.2rem 0.5rem;
  font-size: 0.65rem;
  font-weight: 700;
  color: white;
  background: ${colors.blue};
  border-radius: 100px;
`;

const CardName = styled.h3`
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: 1.4rem;
  font-weight: 400;
  color: ${colors.navy};
  margin-bottom: 0.35rem;
`;

const CardTarget = styled.p`
  font-size: 0.82rem;
  font-weight: 500;
  color: ${colors.textTertiary};
  margin-bottom: 0.75rem;
`;

const CardDesc = styled.p`
  font-size: 0.92rem;
  color: ${colors.textSecondary};
  line-height: 1.6;
`;

const LearnMore = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  margin-top: 1.25rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: ${colors.blue};
`;
