import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../../assets/styles/variables/colors';
import metrics from '../../assets/styles/variables/metrics';

const LOGO_URL = 'https://d1io3yog0oux5.cloudfront.net/_7a2f79adab42c3713ff32f3f4d0b71d0/actiniumpharma/files/images/logo.png';

const COLUMNS = [
  {
    title: 'Company',
    links: [
      { label: 'About Us', to: '/about' },
      { label: 'Management', to: '/about#management' },
      { label: 'Board of Directors', to: '/about#board' },
      { label: 'Careers', to: '/careers' },
    ],
  },
  {
    title: 'Pipeline',
    links: [
      { label: 'Actimab-A', to: '/pipeline/actimab-a' },
      { label: 'ATNM-400', to: '/pipeline/atnm-400' },
      { label: 'Iomab-ACT', to: '/pipeline/iomab-act' },
      { label: 'Iomab-B', to: '/pipeline/iomab-b' },
    ],
  },
  {
    title: 'Investors',
    links: [
      { label: 'News & Events', to: '/investors#news' },
      { label: 'SEC Filings', to: '/investors#filings' },
      { label: 'Stock Information', href: 'https://ir.actiniumpharma.com', external: true },
      { label: 'Governance', href: 'https://ir.actiniumpharma.com', external: true },
    ],
  },
  {
    title: 'Connect',
    links: [
      { label: 'Contact Us', to: '/contact' },
      { label: 'Investor Relations', to: '/investors' },
      { label: 'Email Alerts', href: 'https://ir.actiniumpharma.com', external: true },
    ],
  },
];

export default function Footer() {
  return (
    <Wrapper>
      <Container>
        <Grid>
          <Brand>
            <LogoLink to="/">
              <LogoImg src={LOGO_URL} alt="Actinium Pharmaceuticals" />
            </LogoLink>
            <BrandDesc>
              A clinical-stage biopharmaceutical company developing targeted
              radiotherapies based on proprietary Actinium-225 technology.
            </BrandDesc>
            <Socials>
              <SocialLink href="https://www.linkedin.com/company/actinium-pharmaceuticals" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">in</SocialLink>
              <SocialLink href="https://twitter.com/ActiniumPharma" target="_blank" rel="noopener noreferrer" aria-label="Twitter">X</SocialLink>
            </Socials>
          </Brand>
          {COLUMNS.map(col => (
            <Column key={col.title}>
              <ColTitle>{col.title}</ColTitle>
              <ColList>
                {col.links.map(link => (
                  <li key={link.label}>
                    {link.external ? (
                      <ColAnchor href={link.href} target="_blank" rel="noopener noreferrer">
                        {link.label}
                      </ColAnchor>
                    ) : (
                      <ColLink to={link.to}>{link.label}</ColLink>
                    )}
                  </li>
                ))}
              </ColList>
            </Column>
          ))}
        </Grid>
        <Bottom>
          <Copyright>&copy; 2026 Actinium Pharmaceuticals, Inc. All rights reserved.</Copyright>
          <Legal>
            <LegalLink to="/contact">Privacy Policy</LegalLink>
            <LegalLink to="/contact">Disclaimer</LegalLink>
          </Legal>
        </Bottom>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.footer`
  background: ${colors.bgDarkDeep};
  padding: 4rem 0 2rem;
`;

const Container = styled.div`
  max-width: ${metrics.maxWidth};
  margin: 0 auto;
  padding: 0 ${metrics.paddingHorizontal};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1.6fr repeat(4, 1fr);
  gap: 2.5rem;
  margin-bottom: 3rem;

  @media (max-width: ${metrics.breakpoints.desktop}) {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
  @media (max-width: ${metrics.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const Brand = styled.div`
  @media (max-width: ${metrics.breakpoints.desktop}) {
    grid-column: 1 / -1;
  }
`;

const LogoLink = styled(Link)`
  display: inline-block;
`;

const LogoImg = styled.img`
  height: 34px;
  width: auto;
  filter: brightness(0) invert(1);
  margin-bottom: 1rem;
`;

const BrandDesc = styled.p`
  font-size: 0.88rem;
  color: ${colors.textOnDarkMuted};
  line-height: 1.65;
  max-width: 280px;
`;

const Socials = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1.25rem;
`;

const SocialLink = styled.a`
  width: 34px;
  height: 34px;
  border-radius: ${metrics.radius.small};
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 600;
  color: ${colors.textOnDarkMuted};
  transition: all 0.25s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.12);
    color: white;
  }
`;

const Column = styled.div``;

const ColTitle = styled.h4`
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${colors.textOnDark};
  margin-bottom: 1rem;
`;

const ColList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
`;

const colLinkStyles = `
  font-size: 0.88rem;
  color: rgba(255, 255, 255, 0.7);
  transition: color 0.2s ease;
  &:hover { color: white; }
`;

const ColLink = styled(Link)`${colLinkStyles}`;
const ColAnchor = styled.a`${colLinkStyles}`;

const Bottom = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding-top: 1.75rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: ${metrics.breakpoints.mobile}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Copyright = styled.p`
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.35);
`;

const Legal = styled.div`
  display: flex;
  gap: 1.25rem;
`;

const LegalLink = styled(Link)`
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.35);
  transition: color 0.2s ease;
  &:hover { color: rgba(255, 255, 255, 0.6); }
`;
