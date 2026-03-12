import React from 'react';
import styled from 'styled-components';
import colors from '../../../assets/styles/variables/colors';
import { getMaxPhaseNumber } from '../utils';

const STEPS = [1, 2, 3, 4];

export default function PhaseSteps({ phases }) {
  const maxPhase = getMaxPhaseNumber(phases);

  return (
    <Wrapper>
      {STEPS.map((step, i) => {
        const filled = step <= maxPhase;
        const isCurrent = step === maxPhase;
        return (
          <React.Fragment key={step}>
            {i > 0 && <Line $filled={step <= maxPhase} />}
            <StepGroup>
              <Dot $filled={filled} $current={isCurrent} />
              <Label $filled={filled}>{step}</Label>
            </StepGroup>
          </React.Fragment>
        );
      })}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0;
`;

const StepGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

const Dot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${p => (p.$filled ? colors.blue : 'transparent')};
  border: 2px solid ${p => (p.$filled ? colors.blue : colors.border)};
  position: relative;
  flex-shrink: 0;

  ${p =>
    p.$current &&
    `
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
  `}
`;

const Line = styled.div`
  width: 16px;
  height: 2px;
  background: ${p => (p.$filled ? colors.blue : colors.border)};
  margin-top: 4px;
  flex-shrink: 0;
`;

const Label = styled.span`
  font-size: 0.6rem;
  font-weight: 600;
  color: ${p => (p.$filled ? colors.textSecondary : colors.textTertiary)};
`;
