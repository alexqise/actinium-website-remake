import React from 'react';
import styled from 'styled-components';
import colors from '../../../assets/styles/variables/colors';
import { formatDate, getTimelineProgress } from '../utils';

export default function TimelineBar({
  startDate,
  completionDate,
  completionDateType,
  overallStatus,
}) {
  if (!startDate && !completionDate) {
    return <Unavailable>Timeline unavailable</Unavailable>;
  }

  const { percent } = getTimelineProgress(startDate, completionDate, overallStatus);
  const isCompleted = overallStatus === 'COMPLETED';
  const barColor = isCompleted ? colors.teal : colors.blue;

  const completionLabel = completionDate
    ? `${formatDate(completionDate)}${completionDateType === 'ESTIMATED' ? ' (Est.)' : ''}`
    : '\u2014';

  return (
    <Wrapper>
      <Track>
        <Fill style={{ width: `${percent}%`, background: barColor }} />
        {percent > 0 && percent < 100 && (
          <Diamond style={{ left: `${percent}%` }} />
        )}
      </Track>
      <Dates>
        <DateLabel>{formatDate(startDate)}</DateLabel>
        <DateLabel>{completionLabel}</DateLabel>
      </Dates>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
`;

const Track = styled.div`
  position: relative;
  height: 6px;
  border-radius: 3px;
  background: ${colors.bgTertiary};
  overflow: visible;
`;

const Fill = styled.div`
  height: 100%;
  border-radius: 3px;
  transition: width 0.6s ease;
`;

const Diamond = styled.div`
  position: absolute;
  top: 50%;
  width: 8px;
  height: 8px;
  background: ${colors.navy};
  transform: translate(-50%, -50%) rotate(45deg);
  border-radius: 1px;
`;

const Dates = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 6px;
`;

const DateLabel = styled.span`
  font-size: 0.7rem;
  color: ${colors.textTertiary};
`;

const Unavailable = styled.p`
  font-size: 0.75rem;
  color: ${colors.textTertiary};
  font-style: italic;
  margin: 0;
`;
