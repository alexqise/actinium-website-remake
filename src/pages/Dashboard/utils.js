/**
 * Utility functions for the Clinical Trial Dashboard.
 */

/**
 * Converts an array of phase strings from the ClinicalTrials.gov API
 * into a human-readable label.
 *
 * @param {string[]|null} phases - e.g. ["PHASE1","PHASE2"]
 * @returns {string} - e.g. "Phase 1 / Phase 2"
 */
export function formatPhase(phases) {
  if (!phases || phases.length === 0) return 'N/A';

  return phases
    .map(p => {
      const match = p.match(/PHASE(\d)/i);
      return match ? `Phase ${match[1]}` : p;
    })
    .join(' / ');
}

/**
 * Converts an API status string into a readable display label.
 *
 * @param {string} status - e.g. "ACTIVE_NOT_RECRUITING"
 * @returns {string} - e.g. "Active, Not Recruiting"
 */
export function formatStatus(status) {
  if (!status) return 'Unknown';

  const label = status
    .replace(/_/g, ' ')
    .replace(/\w\S*/g, word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());

  return label.replace('Active Not', 'Active, Not');
}

/**
 * Returns colour and background values for a given trial status.
 *
 * @param {string} status
 * @returns {{ color: string, bg: string }}
 */
export function getStatusColor(status) {
  const map = {
    RECRUITING:             { color: '#059669', bg: '#ecfdf5' },
    ACTIVE_NOT_RECRUITING:  { color: '#d97706', bg: '#fffbeb' },
    COMPLETED:              { color: '#64748b', bg: '#f1f5f9' },
    TERMINATED:             { color: '#dc2626', bg: '#fef2f2' },
    SUSPENDED:              { color: '#dc2626', bg: '#fef2f2' },
    WITHDRAWN:              { color: '#dc2626', bg: '#fef2f2' },
    NOT_YET_RECRUITING:     { color: '#2563eb', bg: '#eff6ff' },
  };

  return map[status] || { color: '#94a3b8', bg: '#f1f5f9' };
}

/**
 * Formats a date string from the API (e.g. "2023-06" or "2023-06-15")
 * into a short month-year display (e.g. "Jun 2023").
 *
 * @param {string|null} dateStr
 * @returns {string}
 */
export function formatDate(dateStr) {
  if (!dateStr) return '\u2014';

  const parts = dateStr.split('-');
  const year = parts[0];
  const month = parts[1];

  if (!month) return year;

  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];

  const monthIndex = parseInt(month, 10) - 1;
  return `${monthNames[monthIndex]} ${year}`;
}

/**
 * Parses a date string from the API ("2023-06" or "2023-06-15") into a Date object.
 * Appends "-01" if only year-month is provided.
 */
export function parseTrialDate(dateStr) {
  if (!dateStr) return null;
  const parts = dateStr.split('-');
  if (parts.length < 2) return null;
  const normalized = parts.length === 2 ? `${dateStr}-01` : dateStr;
  const d = new Date(normalized);
  return isNaN(d.getTime()) ? null : d;
}

/**
 * Calculates timeline progress between start and completion dates.
 * Returns { percent, label } with percent clamped 0-100.
 */
export function getTimelineProgress(startDate, completionDate, status) {
  if (status === 'COMPLETED') return { percent: 100, label: 'Completed' };
  if (status === 'NOT_YET_RECRUITING') return { percent: 0, label: 'Not started' };

  const start = parseTrialDate(startDate);
  const end = parseTrialDate(completionDate);
  if (!start || !end) return { percent: 0, label: 'Unknown' };

  const now = Date.now();
  const total = end.getTime() - start.getTime();
  if (total <= 0) return { percent: 100, label: 'Completed' };

  const elapsed = now - start.getTime();
  const percent = Math.min(100, Math.max(0, Math.round((elapsed / total) * 100)));
  return { percent, label: `${percent}%` };
}

/**
 * Extracts the highest phase number from an array of phase strings.
 * e.g. ["PHASE1","PHASE2"] → 2
 */
export function getMaxPhaseNumber(phases) {
  if (!phases || phases.length === 0) return 0;
  let max = 0;
  for (const p of phases) {
    const match = p.match(/PHASE(\d)/i);
    if (match) max = Math.max(max, parseInt(match[1], 10));
  }
  return max;
}

/**
 * Filters studies by status and phase.
 */
export function filterStudies(studies, statusFilter, phaseFilter) {
  return studies.filter(study => {
    const status = study.protocolSection?.statusModule?.overallStatus;
    const phases = study.protocolSection?.designModule?.phases;

    if (statusFilter !== 'ALL') {
      if (statusFilter === 'RECRUITING' && status !== 'RECRUITING') return false;
      if (statusFilter === 'ACTIVE' && status !== 'ACTIVE_NOT_RECRUITING') return false;
      if (statusFilter === 'COMPLETED' && status !== 'COMPLETED') return false;
      if (statusFilter === 'OTHER' &&
        ['RECRUITING', 'ACTIVE_NOT_RECRUITING', 'COMPLETED'].includes(status)) return false;
    }

    if (phaseFilter !== 'ALL') {
      const maxPhase = getMaxPhaseNumber(phases);
      const targetPhase = parseInt(phaseFilter, 10);
      if (maxPhase !== targetPhase) return false;
    }

    return true;
  });
}

/**
 * Sorts studies by the given criterion.
 */
export function sortStudies(studies, sortBy) {
  const sorted = [...studies];
  sorted.sort((a, b) => {
    if (sortBy === 'NEWEST') {
      const aDate = parseTrialDate(a.protocolSection?.statusModule?.startDateStruct?.date);
      const bDate = parseTrialDate(b.protocolSection?.statusModule?.startDateStruct?.date);
      return (bDate?.getTime() || 0) - (aDate?.getTime() || 0);
    }
    if (sortBy === 'ENDING_SOON') {
      const aDate = parseTrialDate(a.protocolSection?.statusModule?.completionDateStruct?.date);
      const bDate = parseTrialDate(b.protocolSection?.statusModule?.completionDateStruct?.date);
      return (aDate?.getTime() || Infinity) - (bDate?.getTime() || Infinity);
    }
    if (sortBy === 'ENROLLMENT') {
      const aCount = a.protocolSection?.designModule?.enrollmentInfo?.count || 0;
      const bCount = b.protocolSection?.designModule?.enrollmentInfo?.count || 0;
      return bCount - aCount;
    }
    return 0;
  });
  return sorted;
}
