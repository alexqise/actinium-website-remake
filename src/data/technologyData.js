export const SPECS = [
  { label: 'Manufacturing Method', value: 'Cyclotron Production' },
  { label: 'Purity', value: '>99%' },
  { label: 'Cost per mCi', value: '$650 - $1,000' },
  { label: 'Production Cycle', value: '120 - 150 hours' },
  { label: 'Half-Life', value: '10 days' },
  { label: 'Emission Type', value: 'Alpha Particles' },
];

export const ADVANTAGES = [
  {
    title: 'Potent Alpha Particles',
    description: 'Alpha particles deliver high linear energy transfer (LET) over short distances (50-80 micrometers), causing irreparable double-strand DNA breaks in targeted cancer cells while sparing surrounding healthy tissue.',
  },
  {
    title: 'Precision Targeting',
    description: 'Conjugated to monoclonal antibodies that bind specifically to tumor-associated antigens, ensuring precise delivery of Actinium-225 to cancer cells with minimal off-target effects.',
  },
  {
    title: 'Optimal Half-Life',
    description: 'The 10-day half-life of Actinium-225 balances therapeutic efficacy with practical considerations for manufacturing, shipping, and clinical administration.',
  },
  {
    title: 'Proprietary Manufacturing',
    description: 'Actinium has developed proprietary cyclotron-based manufacturing technology that enables production of high-purity Actinium-225, addressing a critical supply constraint in the field.',
  },
  {
    title: 'Daughter Isotope Cascade',
    description: 'Actinium-225 generates a cascade of four alpha particles through its decay chain, amplifying the therapeutic effect and increasing the probability of cancer cell destruction.',
  },
  {
    title: 'Clinical Versatility',
    description: 'The technology platform is adaptable to multiple targeting vectors and cancer types, enabling a diversified pipeline of targeted alpha therapies.',
  },
];

export const MANUFACTURING_STEPS = [
  { step: 1, title: 'Proton Irradiation', description: 'Radium-226 targets are irradiated with high-energy protons in a cyclotron.' },
  { step: 2, title: 'Chemical Separation', description: 'Actinium-225 is chemically separated and purified from the irradiated target material.' },
  { step: 3, title: 'Quality Control', description: 'Rigorous quality control testing ensures >99% radionuclidic purity.' },
  { step: 4, title: 'Conjugation', description: 'Purified Ac-225 is conjugated to targeting antibodies via chelation chemistry.' },
];

export const PATENTS = {
  description: 'Actinium holds a portfolio of patents and patent applications covering its Actinium-225 manufacturing technology, radiolabeling methods, and therapeutic compositions.',
  areas: [
    'Cyclotron-based Ac-225 production methods',
    'Novel chelation and conjugation chemistry',
    'Therapeutic compositions and dosing regimens',
    'Manufacturing process improvements',
  ],
};
