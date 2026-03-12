import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../../assets/styles/variables/colors';
import metrics from '../../assets/styles/variables/metrics';

export default function DropdownMenu({ items, mobileOpen, onItemClick }) {
  return (
    <Wrapper $mobileOpen={mobileOpen}>
      {items.map(item =>
        item.external ? (
          <ExternalLink
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onItemClick}
          >
            {item.label}
            <ExternalIcon>&nearr;</ExternalIcon>
          </ExternalLink>
        ) : (
          <DropLink key={item.label} to={item.to} onClick={onItemClick}>
            {item.label}
          </DropLink>
        )
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  min-width: 200px;
  background: ${colors.bgPrimary};
  border: 1px solid ${colors.border};
  border-radius: ${metrics.radius.medium};
  box-shadow: ${colors.shadowXl};
  padding: 0.5rem;
  opacity: 0;
  visibility: hidden;
  transform: translateX(-50%) translateY(8px);
  transition: opacity 0.2s ease, visibility 0.2s ease, transform 0.2s ease;
  z-index: 200;

  @media (max-width: ${metrics.breakpoints.desktop}) {
    position: static;
    transform: none;
    box-shadow: none;
    border: none;
    opacity: ${p => p.$mobileOpen ? 1 : 0};
    visibility: ${p => p.$mobileOpen ? 'visible' : 'hidden'};
    max-height: ${p => p.$mobileOpen ? '300px' : '0'};
    overflow: hidden;
    transition: max-height 0.3s ease, opacity 0.2s ease, visibility 0.2s ease;
    padding: ${p => p.$mobileOpen ? '0 0 0.5rem 1rem' : '0 0 0 1rem'};
    min-width: 0;
    background: transparent;
  }
`;

const linkStyles = `
  display: block;
  padding: 0.5rem 0.85rem;
  font-size: 0.88rem;
  font-weight: 500;
  color: ${colors.textSecondary};
  border-radius: 6px;
  transition: color 0.2s ease, background 0.2s ease;
  white-space: nowrap;

  &:hover {
    color: ${colors.navy};
    background: ${colors.bgSecondary};
  }
`;

const DropLink = styled(Link)`${linkStyles}`;

const ExternalLink = styled.a`
  ${linkStyles}
  display: flex;
  align-items: center;
  gap: 0.35rem;
`;

const ExternalIcon = styled.span`
  font-size: 0.75rem;
  opacity: 0.5;
`;
