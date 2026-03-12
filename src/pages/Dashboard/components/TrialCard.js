import React from 'react';
import styled from 'styled-components';
import colors from '../../../assets/styles/variables/colors';
import metrics from '../../../assets/styles/variables/metrics';
import StatusIndicator from './StatusIndicator';
import PhaseSteps from './PhaseSteps';
import EnrollmentRing from './EnrollmentRing';
import TimelineBar from './TimelineBar';
export default function TrialCard({ study }) {
  const identification = study.protocolSection.identificationModule;
  const statusModule = study.protocolSection.statusModule;
  const designModule = study.protocolSection?.designModule;
  const conditionsModule = study.protocolSection?.conditionsModule;

  const title = identification.briefTitle;
  const nctId = identification.nctId;
  const phases = designModule?.phases;
  const overallStatus = statusModule.overallStatus;
  const conditions = conditionsModule?.conditions;

  const enrollmentCount = designModule?.enrollmentInfo?.count;
  const enrollmentType = designModule?.enrollmentInfo?.type;
  const startDate = statusModule?.startDateStruct?.date;
  const completionDate = statusModule?.completionDateStruct?.date;
  const completionDateType = statusModule?.completionDateStruct?.type;

  const displayConditions = conditions?.slice(0, 3) || [];
  const overflowCount = conditions ? conditions.length - 3 : 0;

  return (
    <Card>
      {/* Title header */}
      <TitleHeader>
        <Title>{title}</Title>
      </TitleHeader>

      {/* Status row: status + NCT link */}
      <HeaderRow>
        <StatusIndicator status={overallStatus} />
        <NctLink
          href={`https://clinicaltrials.gov/study/${nctId}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {nctId} &#8599;
        </NctLink>
      </HeaderRow>

      {/* Condition tags */}
      {displayConditions.length > 0 && (
        <ConditionRow>
          {displayConditions.map((c, i) => (
            <ConditionTag key={i}>{c}</ConditionTag>
          ))}
          {overflowCount > 0 && (
            <ConditionTag $muted>+{overflowCount}</ConditionTag>
          )}
        </ConditionRow>
      )}

      {/* Metrics row: PhaseSteps + EnrollmentRing */}
      <MetricsRow>
        <MetricBlock>
          <MetricLabel>Phase</MetricLabel>
          <PhaseSteps phases={phases} />
        </MetricBlock>
        <MetricBlock>
          <MetricLabel>Enrollment</MetricLabel>
          <EnrollmentRing count={enrollmentCount} type={enrollmentType} />
        </MetricBlock>
      </MetricsRow>

      {/* Timeline */}
      <TimelineSection>
        <TimelineBar
          startDate={startDate}
          completionDate={completionDate}
          completionDateType={completionDateType}
          overallStatus={overallStatus}
        />
      </TimelineSection>
    </Card>
  );
}

const Card = styled.div`
  background: ${colors.bgPrimary};
  border: 1px solid ${colors.border};
  border-radius: ${metrics.radius.large};
  overflow: hidden;
`;

const TitleHeader = styled.div`
  background: ${colors.bgSecondary};
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid ${colors.borderLight};
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem 0;
  margin-bottom: 0.75rem;
`;

const NctLink = styled.a`
  font-size: 0.7rem;
  font-weight: 600;
  color: ${colors.textTertiary};
  text-decoration: none;
  letter-spacing: 0.02em;
  flex-shrink: 0;

  &:hover {
    color: ${colors.blue};
  }
`;

const Title = styled.h3`
  font-family: 'Source Sans 3', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  color: ${colors.navy};
  margin: 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ConditionRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  padding: 0 1.5rem;
  margin-bottom: 1.25rem;
`;

const ConditionTag = styled.span`
  font-size: 0.65rem;
  font-weight: 500;
  padding: 0.2rem 0.5rem;
  border-radius: 100px;
  background: ${p => (p.$muted ? 'transparent' : colors.bgTertiary)};
  color: ${p => (p.$muted ? colors.textTertiary : colors.textSecondary)};
`;

const MetricsRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.5rem;
  border-top: 1px solid ${colors.borderLight};
  border-bottom: 1px solid ${colors.borderLight};
  margin-bottom: 1rem;
`;

const MetricBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const MetricLabel = styled.span`
  font-size: 0.65rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: ${colors.textTertiary};
`;

const TimelineSection = styled.div`
  padding: 0 1.5rem 1.5rem;
`;
