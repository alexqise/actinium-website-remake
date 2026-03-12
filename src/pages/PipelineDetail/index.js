import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../../assets/styles/variables/colors';
import metrics from '../../assets/styles/variables/metrics';
import PageHero from '../../components/PageHero/PageHero';
import useReveal from '../../hooks/useReveal';
import { getPipelineBySlug } from '../../data/pipelineData';

export default function PipelineDetail() {
  const { slug } = useParams();
  const drug = getPipelineBySlug(slug);

  if (!drug) return <Navigate to="/pipeline" replace />;

  return <PipelineDetailContent drug={drug} />;
}

function PipelineDetailContent({ drug }) {
  const [mechRef, mechVisible] = useReveal(0.1);
  const [dataRef, dataVisible] = useReveal(0.1);
  const [timelineRef, timelineVisible] = useReveal(0.1);

  return (
    <>
      <PageHero
        eyebrow={drug.status}
        title={drug.name}
        subtitle={drug.indication}
      />

      <OverviewSection>
        <Container>
          <OverviewGrid>
            <div>
              <OverviewLabel>Target</OverviewLabel>
              <OverviewValue>{drug.target}</OverviewValue>
            </div>
            <div>
              <OverviewLabel>Phase</OverviewLabel>
              <OverviewValue>
                <PhaseBadge $color={drug.phaseColor} $bg={drug.phaseBg}>
                  {drug.phase}
                </PhaseBadge>
              </OverviewValue>
            </div>
            <div>
              <OverviewLabel>Indication</OverviewLabel>
              <OverviewValue>{drug.indication}</OverviewValue>
            </div>
            {drug.fastTrack && (
              <div>
                <OverviewLabel>Designation</OverviewLabel>
                <OverviewValue>
                  <FastTrackBadge>FDA Fast Track</FastTrackBadge>
                </OverviewValue>
              </div>
            )}
          </OverviewGrid>
        </Container>
      </OverviewSection>

      <MechSection ref={mechRef}>
        <Container>
          <SplitGrid>
            <div>
              <SectionLabel $visible={mechVisible}>About</SectionLabel>
              <SectionTitle $visible={mechVisible}>{drug.name}</SectionTitle>
              <SectionText $visible={mechVisible}>{drug.description}</SectionText>
            </div>
            <div>
              <SectionLabel $visible={mechVisible}>Mechanism of Action</SectionLabel>
              <SectionText $visible={mechVisible}>{drug.mechanism}</SectionText>
            </div>
          </SplitGrid>
        </Container>
      </MechSection>

      <DataSection ref={dataRef}>
        <Container>
          <SectionLabel $visible={dataVisible}>Clinical Data</SectionLabel>
          <SectionTitle $visible={dataVisible}>Key Metrics</SectionTitle>
          <DataGrid>
            {drug.clinicalData.map((item, i) => (
              <DataCard key={item.label} $visible={dataVisible} $delay={i * 0.1}>
                <DataValue>{item.value}</DataValue>
                <DataLabel>{item.label}</DataLabel>
                <DataDetail>{item.detail}</DataDetail>
              </DataCard>
            ))}
          </DataGrid>
        </Container>
      </DataSection>

      <TimelineSection ref={timelineRef}>
        <Container>
          <SectionLabel $visible={timelineVisible}>Development</SectionLabel>
          <SectionTitle $visible={timelineVisible}>Timeline</SectionTitle>
          <Timeline>
            {drug.timeline.map((item, i) => (
              <TimelineItem key={i} $visible={timelineVisible} $delay={i * 0.1}>
                <TimelineDot />
                <TimelineYear>{item.year}</TimelineYear>
                <TimelineEvent>{item.event}</TimelineEvent>
              </TimelineItem>
            ))}
          </Timeline>
          <BackLink to="/pipeline">&larr; Back to Pipeline Overview</BackLink>
        </Container>
      </TimelineSection>
    </>
  );
}

const Container = styled.div`
  max-width: ${metrics.maxWidth};
  margin: 0 auto;
  padding: 0 ${metrics.paddingHorizontal};
`;

const OverviewSection = styled.section`
  padding: 2.5rem 0;
  background: ${colors.bgSecondary};
  border-bottom: 1px solid ${colors.borderLight};
`;

const OverviewGrid = styled.div`
  display: flex;
  gap: 3rem;
  flex-wrap: wrap;
`;

const OverviewLabel = styled.div`
  font-size: 0.72rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${colors.textTertiary};
  margin-bottom: 0.35rem;
`;

const OverviewValue = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: ${colors.navy};
`;

const PhaseBadge = styled.span`
  display: inline-block;
  padding: 0.2rem 0.65rem;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 100px;
  color: ${p => p.$color};
  background: ${p => p.$bg};
`;

const FastTrackBadge = styled.span`
  display: inline-block;
  padding: 0.2rem 0.65rem;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 100px;
  color: white;
  background: ${colors.blue};
`;

const MechSection = styled.section`
  padding: clamp(4rem, 8vw, 6rem) 0;
  background: ${colors.bgPrimary};
`;

const SplitGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;

  @media (max-width: ${metrics.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
`;

const SectionLabel = styled.span`
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: ${colors.blue};
  margin-bottom: 0.75rem;
  opacity: ${p => p.$visible ? 1 : 0};
  transition: opacity 0.6s ease;
`;

const SectionTitle = styled.h2`
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: clamp(1.75rem, 3vw, 2.25rem);
  font-weight: 400;
  color: ${colors.navy};
  margin-bottom: 1.25rem;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '20px'});
  transition: all 0.6s ease 0.1s;
`;

const SectionText = styled.p`
  font-size: 1rem;
  color: ${colors.textSecondary};
  line-height: 1.75;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '20px'});
  transition: all 0.6s ease 0.2s;
`;

const DataSection = styled.section`
  padding: clamp(4rem, 8vw, 6rem) 0;
  background: ${colors.bgSecondary};
  border-top: 1px solid ${colors.borderLight};
`;

const DataGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-top: 1rem;

  @media (max-width: ${metrics.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const DataCard = styled.div`
  background: ${colors.bgPrimary};
  border: 1px solid ${colors.border};
  border-radius: ${metrics.radius.large};
  padding: 2rem;
  text-align: center;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '25px'});
  transition: all 0.5s ease ${p => 0.2 + p.$delay}s;
`;

const DataValue = styled.div`
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: 2.25rem;
  font-weight: 400;
  color: ${colors.navy};
  margin-bottom: 0.35rem;
`;

const DataLabel = styled.div`
  font-size: 0.88rem;
  font-weight: 600;
  color: ${colors.textPrimary};
  margin-bottom: 0.25rem;
`;

const DataDetail = styled.div`
  font-size: 0.82rem;
  color: ${colors.textTertiary};
`;

const TimelineSection = styled.section`
  padding: clamp(4rem, 8vw, 6rem) 0;
  background: ${colors.bgPrimary};
`;

const Timeline = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-top: 1rem;
  position: relative;
  padding-left: 2rem;

  &::before {
    content: '';
    position: absolute;
    left: 6px;
    top: 6px;
    bottom: 6px;
    width: 2px;
    background: ${colors.borderLight};
  }
`;

const TimelineItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem 0;
  position: relative;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateX(${p => p.$visible ? 0 : '-20px'});
  transition: all 0.5s ease ${p => 0.2 + p.$delay}s;
`;

const TimelineDot = styled.div`
  position: absolute;
  left: -2rem;
  top: 1.15rem;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: ${colors.blue};
  border: 3px solid ${colors.bgPrimary};
  z-index: 1;
`;

const TimelineYear = styled.span`
  font-size: 0.88rem;
  font-weight: 700;
  color: ${colors.navy};
  min-width: 50px;
`;

const TimelineEvent = styled.span`
  font-size: 0.95rem;
  color: ${colors.textSecondary};
  line-height: 1.5;
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  margin-top: 3rem;
  font-size: 0.92rem;
  font-weight: 600;
  color: ${colors.blue};
  transition: gap 0.25s ease;

  &:hover { gap: 0.6rem; }
`;
