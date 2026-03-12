import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { getStatusColor, formatStatus } from '../utils';

export default function StatusIndicator({ status }) {
  const { color } = getStatusColor(status);
  const isRecruiting = status === 'RECRUITING';

  return (
    <Wrapper>
      <Dot $color={color} $pulse={isRecruiting} />
      <Label $color={color}>{formatStatus(status)}</Label>
    </Wrapper>
  );
}

const pulse = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.4); }
`;

const Wrapper = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
`;

const Dot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${p => p.$color};
  flex-shrink: 0;

  ${p =>
    p.$pulse &&
    css`animation: ${pulse} 2s ease-in-out infinite;`}
`;

const Label = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  color: ${p => p.$color};
  letter-spacing: 0.01em;
`;
