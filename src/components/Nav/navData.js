const NAV_ITEMS = [
  {
    label: 'About',
    to: '/about',
    children: [
      { label: 'Overview', to: '/about' },
      { label: 'Management Team', to: '/about#management' },
      { label: 'Board of Directors', to: '/about#board' },
    ],
  },
  {
    label: 'Pipeline',
    to: '/pipeline',
    children: [
      { label: 'Overview', to: '/pipeline' },
      { label: 'Actimab-A', to: '/pipeline/actimab-a' },
      { label: 'ATNM-400', to: '/pipeline/atnm-400' },
      { label: 'Iomab-ACT', to: '/pipeline/iomab-act' },
      { label: 'Iomab-B', to: '/pipeline/iomab-b' },
    ],
  },
  { label: 'Ac-225 Technology', to: '/technology' },
  { label: 'R&D Platform', to: '/rd-platform' },
  {
    label: 'Investors',
    to: '/investors',
    children: [
      { label: 'Overview', to: '/investors' },
      { label: 'News & Events', to: '/investors#news' },
      { label: 'SEC Filings', to: '/investors#filings' },
      { label: 'Stock Information', href: 'https://ir.actiniumpharma.com', external: true },
    ],
  },
  { label: 'Careers', to: '/careers' },
];

export default NAV_ITEMS;
