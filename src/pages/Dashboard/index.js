import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../../assets/styles/variables/colors';
import metrics from '../../assets/styles/variables/metrics';
import useScrolled from '../../hooks/useScrolled';
import SummaryBar from './components/SummaryBar';
import TrialCard from './components/TrialCard';
import FilterBar from './components/FilterBar';
import LoadingState from './components/LoadingState';
import ErrorState from './components/ErrorState';
import { filterStudies, sortStudies } from './utils';

const LOGO_URL =
  'https://d1io3yog0oux5.cloudfront.net/_7a2f79adab42c3713ff32f3f4d0b71d0/actiniumpharma/files/images/logo.png';

const API_BASE = 'https://clinicaltrials.gov/api/v2/studies';
const REFRESH_INTERVAL_MS = 5 * 60 * 1000;

export default function Dashboard() {
  const [studies, setStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastRefreshed, setLastRefreshed] = useState(null);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [phaseFilter, setPhaseFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState('NEWEST');

  const scrolled = useScrolled();

  const filteredStudies = useMemo(() => {
    const filtered = filterStudies(studies, statusFilter, phaseFilter);
    return sortStudies(filtered, sortBy);
  }, [studies, statusFilter, phaseFilter, sortBy]);

  const fetchStudies = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      let accumulated = [];
      let pageToken = null;

      do {
        const params = new URLSearchParams({
          'query.spons': 'Actinium+Pharmaceuticals',
          pageSize: '50',
        });

        if (pageToken) {
          params.set('pageToken', pageToken);
        }

        const response = await fetch(`${API_BASE}?${params.toString()}`);

        if (!response.ok) {
          throw new Error(`API returned ${response.status}`);
        }

        const data = await response.json();
        accumulated = accumulated.concat(data.studies || []);
        pageToken = data.nextPageToken || null;
      } while (pageToken);

      setStudies(accumulated);
      setLastRefreshed(new Date());
    } catch (err) {
      setError(err.message || 'Failed to fetch clinical trial data.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStudies();

    const interval = setInterval(fetchStudies, REFRESH_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [fetchStudies]);

  const formattedTime = lastRefreshed
    ? lastRefreshed.toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit',
      })
    : null;

  return (
    <PageWrapper>
      {/* ---- Nav ---- */}
      <Nav $scrolled={scrolled}>
        <NavInner>
          <LogoLink to="/">
            <Logo src={LOGO_URL} alt="Actinium Pharmaceuticals" />
          </LogoLink>
          <NavRight>
            <NavTitle>Clinical Trials Dashboard</NavTitle>
            <RefreshButton
              onClick={fetchStudies}
              disabled={loading}
              title="Refresh data"
            >
              <RefreshIcon $spinning={loading}>&#8635;</RefreshIcon>
            </RefreshButton>
          </NavRight>
        </NavInner>
      </Nav>

      {/* ---- Header ---- */}
      <Header>
        <HeaderInner>
          <TitleRow>
            <PageTitle>Actinium Pharmaceuticals</PageTitle>
            <TickerBadge>NASDAQ: ATNM</TickerBadge>
          </TitleRow>
          <TrialCount>
            {studies.length} Clinical Trial{studies.length !== 1 ? 's' : ''}
          </TrialCount>
          <HeaderMeta>
            <Subtitle>Live data from ClinicalTrials.gov</Subtitle>
            {formattedTime && (
              <LastUpdated>Last updated: {formattedTime}</LastUpdated>
            )}
          </HeaderMeta>
        </HeaderInner>
      </Header>

      {/* ---- Main content ---- */}
      <Main>
        <ContentInner>
          {loading && studies.length === 0 ? (
            <LoadingState />
          ) : error ? (
            <ErrorState message={error} onRetry={fetchStudies} />
          ) : (
            <>
              <SummaryBar studies={studies} />
              <FilterBar
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                phaseFilter={phaseFilter}
                setPhaseFilter={setPhaseFilter}
                sortBy={sortBy}
                setSortBy={setSortBy}
                totalCount={studies.length}
                filteredCount={filteredStudies.length}
              />
              {filteredStudies.length === 0 ? (
                <EmptyState>
                  <EmptyText>No trials match your filters</EmptyText>
                  <ClearButton
                    onClick={() => {
                      setStatusFilter('ALL');
                      setPhaseFilter('ALL');
                    }}
                  >
                    Clear filters
                  </ClearButton>
                </EmptyState>
              ) : (
                <TrialGrid>
                  {filteredStudies.map(study => {
                    const nctId =
                      study.protocolSection?.identificationModule?.nctId;
                    return <TrialCard key={nctId} study={study} />;
                  })}
                </TrialGrid>
              )}
            </>
          )}
        </ContentInner>
      </Main>

      {/* ---- Footer ---- */}
      <FooterBar>
        Data sourced from ClinicalTrials.gov &middot; Auto-refreshes every 5 min
      </FooterBar>
    </PageWrapper>
  );
}

/* ------------------------------------------------------------------ */
/*  Styled Components                                                  */
/* ------------------------------------------------------------------ */

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${colors.bgSecondary};
`;

/* ---- Nav ---- */

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: ${metrics.navHeight};
  display: flex;
  align-items: center;
  background: ${p =>
    p.$scrolled ? 'rgba(255, 255, 255, 0.92)' : colors.bgPrimary};
  backdrop-filter: ${p => (p.$scrolled ? 'blur(12px)' : 'none')};
  border-bottom: 1px solid ${p => (p.$scrolled ? colors.border : 'transparent')};
  transition: all 0.3s ease;
`;

const NavInner = styled.div`
  width: 100%;
  max-width: ${metrics.maxWidthWide};
  margin: 0 auto;
  padding: 0 ${metrics.paddingHorizontal};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
`;

const Logo = styled.img`
  height: 36px;
  width: auto;
`;

const NavRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const NavTitle = styled.span`
  font-size: 0.85rem;
  font-weight: 600;
  color: ${colors.textSecondary};
  letter-spacing: 0.01em;

  @media (max-width: ${metrics.breakpoints.mobile}) {
    display: none;
  }
`;

const RefreshButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: 1px solid ${colors.border};
  border-radius: ${metrics.radius.small};
  background: ${colors.bgPrimary};
  color: ${colors.textSecondary};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    border-color: ${colors.blue};
    color: ${colors.blue};
    background: ${colors.blueFaint};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const RefreshIcon = styled.span`
  font-size: 1.15rem;
  line-height: 1;
  display: inline-block;
  transition: transform 0.3s ease;

  ${p =>
    p.$spinning &&
    `
    animation: spin 1s linear infinite;
  `}

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

/* ---- Header ---- */

const Header = styled.header`
  background: ${colors.bgSecondary};
  padding-top: calc(${metrics.navHeight} + 2.5rem);
  padding-bottom: 2rem;
`;

const HeaderInner = styled.div`
  max-width: ${metrics.maxWidthWide};
  margin: 0 auto;
  padding: 0 ${metrics.paddingHorizontal};
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.85rem;
  margin-bottom: 0.5rem;
`;

const PageTitle = styled.h1`
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 400;
  color: ${colors.navy};
  margin: 0;
  line-height: 1.2;
`;

const TickerBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.65rem;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: ${colors.blue};
  background: ${colors.blueFaint};
  border-radius: 999px;
  white-space: nowrap;
`;

const TrialCount = styled.p`
  font-size: 1.05rem;
  font-weight: 600;
  color: ${colors.textPrimary};
  margin: 0 0 0.35rem;
`;

const HeaderMeta = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem 1.25rem;
`;

const Subtitle = styled.span`
  font-size: 0.85rem;
  color: ${colors.textTertiary};
`;

const LastUpdated = styled.span`
  font-size: 0.8rem;
  color: ${colors.textTertiary};

  &::before {
    content: '';
    display: inline-block;
    width: 6px;
    height: 6px;
    background: #34d399;
    border-radius: 50%;
    margin-right: 0.4rem;
    vertical-align: middle;
  }
`;

/* ---- Main ---- */

const Main = styled.main`
  flex: 1;
  padding-bottom: 3rem;
`;

const ContentInner = styled.div`
  max-width: ${metrics.maxWidthWide};
  margin: 0 auto;
  padding: 0 ${metrics.paddingHorizontal};
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const TrialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;

  @media (max-width: ${metrics.breakpoints.desktop}) {
    grid-template-columns: 1fr;
  }
`;

/* ---- Empty state ---- */

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1.5rem;
  background: ${colors.bgPrimary};
  border: 1px solid ${colors.border};
  border-radius: ${metrics.radius.large};
  text-align: center;
`;

const EmptyText = styled.p`
  font-size: 0.95rem;
  color: ${colors.textTertiary};
  margin: 0 0 1rem;
`;

const ClearButton = styled.button`
  padding: 0.5rem 1.25rem;
  font-size: 0.8rem;
  font-weight: 500;
  color: ${colors.blue};
  background: ${colors.blueFaint};
  border: 1px solid ${colors.borderAccent};
  border-radius: ${metrics.radius.small};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${colors.bluePale};
  }
`;

/* ---- Footer ---- */

const FooterBar = styled.footer`
  text-align: center;
  padding: 1.5rem ${metrics.paddingHorizontal};
  font-size: 0.78rem;
  color: ${colors.textTertiary};
  border-top: 1px solid ${colors.border};
  background: ${colors.bgPrimary};
`;
