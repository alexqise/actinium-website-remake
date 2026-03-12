import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const LABELS = {
  about: 'About',
  pipeline: 'Pipeline',
  technology: 'Ac-225 Technology',
  'rd-platform': 'R&D Platform',
  investors: 'Investors',
  careers: 'Careers',
  contact: 'Contact',
  'actimab-a': 'Actimab-A',
  'atnm-400': 'ATNM-400',
  'iomab-act': 'Iomab-ACT',
  'iomab-b': 'Iomab-B',
};

export default function Breadcrumbs() {
  const { pathname } = useLocation();
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 0) return null;

  const crumbs = segments.map((seg, i) => {
    const path = '/' + segments.slice(0, i + 1).join('/');
    const label = LABELS[seg] || seg.charAt(0).toUpperCase() + seg.slice(1);
    const isLast = i === segments.length - 1;
    return { path, label, isLast };
  });

  return (
    <Wrapper>
      <CrumbLink to="/">Home</CrumbLink>
      {crumbs.map(crumb => (
        <React.Fragment key={crumb.path}>
          <Separator>/</Separator>
          {crumb.isLast ? (
            <Current>{crumb.label}</Current>
          ) : (
            <CrumbLink to={crumb.path}>{crumb.label}</CrumbLink>
          )}
        </React.Fragment>
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.nav`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.82rem;
  margin-bottom: 1.5rem;
`;

const CrumbLink = styled(Link)`
  color: rgba(255, 255, 255, 0.6);
  transition: color 0.2s ease;

  &:hover { color: white; }
`;

const Separator = styled.span`
  color: rgba(255, 255, 255, 0.3);
`;

const Current = styled.span`
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
`;
