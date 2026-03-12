import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../../assets/styles/variables/colors';
import metrics from '../../assets/styles/variables/metrics';
import PageHero from '../../components/PageHero/PageHero';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import useReveal from '../../hooks/useReveal';
import NEWS from '../../data/newsData';

const SEC_FILINGS = [
  { type: '10-K', date: 'March 1, 2026', description: 'Annual Report for fiscal year ended December 31, 2025' },
  { type: '10-Q', date: 'November 14, 2025', description: 'Quarterly Report for Q3 2025' },
  { type: '8-K', date: 'October 2, 2025', description: 'Current Report — Management Changes' },
  { type: '10-Q', date: 'August 12, 2025', description: 'Quarterly Report for Q2 2025' },
  { type: 'DEF 14A', date: 'June 5, 2025', description: 'Definitive Proxy Statement for Annual Meeting' },
  { type: '10-Q', date: 'May 15, 2025', description: 'Quarterly Report for Q1 2025' },
];

export default function Investors() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [hash]);

  const [stockRef, stockVisible] = useReveal(0.1);
  const [newsRef, newsVisible] = useReveal(0.1);
  const [filingsRef, filingsVisible] = useReveal(0.1);

  return (
    <>
      <PageHero
        eyebrow="Investors"
        title="Investor Relations"
        subtitle="Access financial information, news, and resources for shareholders and the investment community."
      />

      <StockSection ref={stockRef}>
        <Container>
          <StockCard $visible={stockVisible}>
            <StockHeader>
              <div>
                <StockTicker>ATNM</StockTicker>
                <StockExchange>NYSE American</StockExchange>
              </div>
              <StockLink
                href="https://ir.actiniumpharma.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on IR Site &rarr;
              </StockLink>
            </StockHeader>
            <StockDisclaimer>
              For real-time stock data and comprehensive investor information, please visit our{' '}
              <StockAnchor
                href="https://ir.actiniumpharma.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Investor Relations portal
              </StockAnchor>.
            </StockDisclaimer>
          </StockCard>
        </Container>
      </StockSection>

      <NewsSection id="news" ref={newsRef}>
        <Container>
          <SectionHeader
            label="Press Releases"
            title="News & Events"
            description="The latest news, press releases, and event announcements from Actinium Pharmaceuticals."
            visible={newsVisible}
          />
          <NewsGrid>
            {NEWS.map((item, i) => (
              <NewsCard key={i} $visible={newsVisible} $delay={i * 0.08}>
                <NewsMeta>
                  <NewsDate>{item.date}</NewsDate>
                  <NewsCategory>{item.category}</NewsCategory>
                </NewsMeta>
                <NewsTitle>{item.title}</NewsTitle>
                <NewsExcerpt>{item.excerpt}</NewsExcerpt>
              </NewsCard>
            ))}
          </NewsGrid>
        </Container>
      </NewsSection>

      <FilingsSection id="filings" ref={filingsRef}>
        <Container>
          <SectionHeader
            label="SEC Filings"
            title="Regulatory Filings"
            description="Access our public filings with the U.S. Securities and Exchange Commission."
            visible={filingsVisible}
          />
          <FilingsTable $visible={filingsVisible}>
            <FilingsHeader>
              <FilingsHeaderCell $width="100px">Form</FilingsHeaderCell>
              <FilingsHeaderCell $width="150px">Date</FilingsHeaderCell>
              <FilingsHeaderCell>Description</FilingsHeaderCell>
            </FilingsHeader>
            {SEC_FILINGS.map((filing, i) => (
              <FilingsRow key={i} $visible={filingsVisible} $delay={i * 0.06}>
                <FilingsCell>
                  <FilingType>{filing.type}</FilingType>
                </FilingsCell>
                <FilingsCell>{filing.date}</FilingsCell>
                <FilingsCell>{filing.description}</FilingsCell>
              </FilingsRow>
            ))}
          </FilingsTable>
          <IRLink
            href="https://ir.actiniumpharma.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            View all filings on IR portal &rarr;
          </IRLink>
        </Container>
      </FilingsSection>
    </>
  );
}

const Container = styled.div`
  max-width: ${metrics.maxWidth};
  margin: 0 auto;
  padding: 0 ${metrics.paddingHorizontal};
`;

const StockSection = styled.section`
  padding: clamp(3rem, 6vw, 4rem) 0;
  background: ${colors.bgPrimary};
`;

const StockCard = styled.div`
  background: ${colors.bgSecondary};
  border: 1px solid ${colors.borderLight};
  border-radius: ${metrics.radius.xl};
  padding: 2rem 2.5rem;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '20px'});
  transition: all 0.6s ease;
`;

const StockHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const StockTicker = styled.div`
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: 2rem;
  font-weight: 400;
  color: ${colors.navy};
`;

const StockExchange = styled.div`
  font-size: 0.82rem;
  font-weight: 500;
  color: ${colors.textTertiary};
`;

const StockLink = styled.a`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${colors.blue};
  transition: opacity 0.2s ease;

  &:hover { opacity: 0.8; }
`;

const StockDisclaimer = styled.p`
  font-size: 0.9rem;
  color: ${colors.textSecondary};
  line-height: 1.6;
`;

const StockAnchor = styled.a`
  color: ${colors.blue};
  font-weight: 500;

  &:hover { text-decoration: underline; }
`;

const NewsSection = styled.section`
  padding: clamp(4rem, 8vw, 6rem) 0;
  background: ${colors.bgSecondary};
  border-top: 1px solid ${colors.borderLight};
`;

const NewsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const NewsCard = styled.article`
  background: ${colors.bgPrimary};
  border: 1px solid ${colors.border};
  border-radius: ${metrics.radius.large};
  padding: 1.75rem;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '15px'});
  transition: all 0.5s ease ${p => p.$delay}s;
`;

const NewsMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.65rem;
`;

const NewsDate = styled.span`
  font-size: 0.8rem;
  font-weight: 600;
  color: ${colors.blue};
`;

const NewsCategory = styled.span`
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: ${colors.textTertiary};
  padding: 0.15rem 0.5rem;
  background: ${colors.bgSecondary};
  border-radius: 100px;
`;

const NewsTitle = styled.h3`
  font-size: 1.05rem;
  font-weight: 600;
  color: ${colors.navy};
  line-height: 1.4;
  margin-bottom: 0.5rem;
`;

const NewsExcerpt = styled.p`
  font-size: 0.9rem;
  color: ${colors.textSecondary};
  line-height: 1.6;
`;

const FilingsSection = styled.section`
  padding: clamp(4rem, 8vw, 6rem) 0;
  background: ${colors.bgPrimary};
`;

const FilingsTable = styled.div`
  border: 1px solid ${colors.border};
  border-radius: ${metrics.radius.large};
  overflow: hidden;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '20px'});
  transition: all 0.6s ease 0.2s;
`;

const FilingsHeader = styled.div`
  display: flex;
  background: ${colors.bgSecondary};
  border-bottom: 1px solid ${colors.border};
  padding: 0.85rem 1.25rem;
  gap: 1rem;

  @media (max-width: ${metrics.breakpoints.mobile}) {
    display: none;
  }
`;

const FilingsHeaderCell = styled.div`
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${colors.textTertiary};
  ${p => p.$width && `width: ${p.$width}; min-width: ${p.$width};`}
  ${p => !p.$width && 'flex: 1;'}
`;

const FilingsRow = styled.div`
  display: flex;
  padding: 1rem 1.25rem;
  gap: 1rem;
  border-bottom: 1px solid ${colors.borderLight};
  opacity: ${p => p.$visible ? 1 : 0};
  transition: opacity 0.4s ease ${p => 0.3 + p.$delay}s;

  &:last-child { border-bottom: none; }

  &:hover { background: ${colors.bgSecondary}; }

  @media (max-width: ${metrics.breakpoints.mobile}) {
    flex-direction: column;
    gap: 0.25rem;
  }
`;

const FilingsCell = styled.div`
  font-size: 0.9rem;
  color: ${colors.textSecondary};
  line-height: 1.5;

  &:first-child { width: 100px; min-width: 100px; }
  &:nth-child(2) { width: 150px; min-width: 150px; }
  &:last-child { flex: 1; }

  @media (max-width: ${metrics.breakpoints.mobile}) {
    &:first-child, &:nth-child(2) { width: auto; min-width: 0; }
  }
`;

const FilingType = styled.span`
  font-weight: 700;
  color: ${colors.navy};
`;

const IRLink = styled.a`
  display: inline-flex;
  align-items: center;
  margin-top: 2rem;
  font-size: 0.92rem;
  font-weight: 600;
  color: ${colors.blue};
  transition: opacity 0.2s ease;

  &:hover { opacity: 0.8; }
`;
