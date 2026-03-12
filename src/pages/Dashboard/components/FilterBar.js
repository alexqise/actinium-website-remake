import React from 'react';
import styled from 'styled-components';
import colors from '../../../assets/styles/variables/colors';
import metrics from '../../../assets/styles/variables/metrics';
import { getStatusColor } from '../utils';

const STATUS_OPTIONS = [
  { value: 'ALL', label: 'All', status: null },
  { value: 'RECRUITING', label: 'Recruiting', status: 'RECRUITING' },
  { value: 'ACTIVE', label: 'Active', status: 'ACTIVE_NOT_RECRUITING' },
  { value: 'COMPLETED', label: 'Completed', status: 'COMPLETED' },
  { value: 'OTHER', label: 'Other', status: null },
];

const PHASE_OPTIONS = [
  { value: 'ALL', label: 'All' },
  { value: '1', label: 'Phase 1' },
  { value: '2', label: 'Phase 2' },
  { value: '3', label: 'Phase 3' },
  { value: '4', label: 'Phase 4' },
];

export default function FilterBar({
  statusFilter,
  setStatusFilter,
  phaseFilter,
  setPhaseFilter,
  sortBy,
  setSortBy,
  totalCount,
  filteredCount,
}) {
  const hasActiveFilters = statusFilter !== 'ALL' || phaseFilter !== 'ALL';

  const clearFilters = () => {
    setStatusFilter('ALL');
    setPhaseFilter('ALL');
  };

  return (
    <Wrapper>
      <FilterRow>
        <FilterGroup>
          <GroupLabel>Status</GroupLabel>
          <Pills>
            {STATUS_OPTIONS.map(opt => (
              <Pill
                key={opt.value}
                $active={statusFilter === opt.value}
                onClick={() => setStatusFilter(opt.value)}
              >
                {opt.status && (
                  <PillDot $color={getStatusColor(opt.status).color} />
                )}
                {opt.label}
              </Pill>
            ))}
          </Pills>
        </FilterGroup>

        <FilterGroup>
          <GroupLabel>Phase</GroupLabel>
          <Pills>
            {PHASE_OPTIONS.map(opt => (
              <Pill
                key={opt.value}
                $active={phaseFilter === opt.value}
                onClick={() => setPhaseFilter(opt.value)}
              >
                {opt.label}
              </Pill>
            ))}
          </Pills>
        </FilterGroup>

        <FilterGroup>
          <GroupLabel>Sort</GroupLabel>
          <SortSelect value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="NEWEST">Newest First</option>
            <option value="ENDING_SOON">Ending Soon</option>
            <option value="ENROLLMENT">Enrollment (High→Low)</option>
          </SortSelect>
        </FilterGroup>
      </FilterRow>

      {hasActiveFilters && (
        <ActiveInfo>
          Showing {filteredCount} of {totalCount} trial{totalCount !== 1 ? 's' : ''}
          <ClearLink onClick={clearFilters}>Clear</ClearLink>
        </ActiveInfo>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const FilterRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  align-items: flex-end;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const GroupLabel = styled.span`
  font-size: 0.65rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: ${colors.textTertiary};
`;

const Pills = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
`;

const Pill = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 0.35rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 500;
  border: none;
  border-radius: 100px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  background: ${p => (p.$active ? colors.blue : colors.bgTertiary)};
  color: ${p => (p.$active ? '#fff' : colors.textSecondary)};

  &:hover {
    background: ${p => (p.$active ? colors.blue : colors.border)};
  }
`;

const PillDot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${p => p.$color};
`;

const SortSelect = styled.select`
  appearance: none;
  background: ${colors.bgTertiary} url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%2394a3b8'/%3E%3C/svg%3E") no-repeat right 10px center;
  border: 1px solid ${colors.border};
  border-radius: ${metrics.radius.small};
  padding: 0.4rem 2rem 0.4rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: ${colors.textSecondary};
  cursor: pointer;
  transition: border-color 0.2s ease;

  &:hover,
  &:focus {
    border-color: ${colors.blue};
    outline: none;
  }
`;

const ActiveInfo = styled.span`
  font-size: 0.78rem;
  color: ${colors.textTertiary};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ClearLink = styled.button`
  background: none;
  border: none;
  color: ${colors.blue};
  font-size: 0.78rem;
  font-weight: 500;
  cursor: pointer;
  padding: 0;
  text-decoration: underline;

  &:hover {
    color: ${colors.navyLight};
  }
`;
