import React from 'react';
import styled from 'styled-components';
import colors from '../../../assets/styles/variables/colors';
import metrics from '../../../assets/styles/variables/metrics';

export default function ErrorState({ message, onRetry }) {
  return (
    <Wrapper>
      <Card>
        <Icon>!</Icon>
        <Title>Something went wrong</Title>
        <Message>{message || 'An unexpected error occurred.'}</Message>
        {onRetry && (
          <RetryButton onClick={onRetry}>Try Again</RetryButton>
        )}
      </Card>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem 0;
`;

const Card = styled.div`
  background: ${colors.bgPrimary};
  border: 1px solid ${colors.border};
  border-radius: ${metrics.radius.large};
  padding: 2.5rem 3rem;
  text-align: center;
  max-width: 420px;
  width: 100%;
  box-shadow: ${colors.shadowMd};
`;

const Icon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #fef2f2;
  color: #ef4444;
  font-size: 1.5rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.25rem;
`;

const Title = styled.h3`
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: 1.3rem;
  font-weight: 400;
  color: ${colors.navy};
  margin-bottom: 0.5rem;
`;

const Message = styled.p`
  font-size: 0.95rem;
  color: ${colors.textSecondary};
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const RetryButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.65rem 1.5rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: ${colors.bgPrimary};
  background: ${colors.blue};
  border: none;
  border-radius: ${metrics.radius.small};
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: ${colors.blueLight};
  }
`;
