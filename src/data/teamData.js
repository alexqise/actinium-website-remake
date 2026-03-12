const AVATAR_COLORS = [
  '#0c2d5a', '#2563eb', '#0891b2', '#059669', '#7c3aed', '#d97706', '#dc2626',
];

function getInitials(name) {
  const parts = name.split(' ').filter(p => !p.includes('.') || p.length <= 4);
  const first = parts[0]?.[0] || '';
  const last = parts[parts.length - 1]?.[0] || '';
  return (first + last).toUpperCase();
}

const TEAM = [
  {
    name: 'Sandesh Seth',
    title: 'Chairman & Chief Executive Officer',
    bio: 'Mr. Seth has over 25 years of experience in investment banking, finance, and the pharmaceutical industry. He has been instrumental in guiding Actinium\'s strategic direction since its inception. Prior to Actinium, he held positions at Pfizer, Warner-Lambert, and SmithKline Beecham. Mr. Seth holds an MBA from New York University\'s Stern School of Business.',
  },
  {
    name: 'Adeela Kamal, Ph.D.',
    title: 'EVP, Head of Research & Development',
    bio: 'Dr. Kamal brings over 25 years of biotech and pharmaceutical R&D experience, having advanced more than 20 development candidates across therapeutic areas. She has deep expertise in radiopharmaceuticals and oncology drug development. Dr. Kamal holds a B.S. from MIT and a Ph.D. from UT Southwestern Medical Center.',
  },
  {
    name: 'Monideepa Roy, Ph.D.',
    title: 'SVP, Corporate Development & R&D',
    bio: 'Dr. Roy brings extensive experience in corporate development and R&D strategy. She founded Akamara Therapeutics and has served as a lecturer at Harvard University. Her expertise spans business development, licensing, and strategic partnerships in the biopharmaceutical industry.',
  },
  {
    name: 'Julie Gibson',
    title: 'VP, Portfolio & Clinical Operations',
    bio: 'Ms. Gibson has over 30 years of pharmaceutical industry experience in clinical operations and portfolio management. She has held senior positions at Telix Pharmaceuticals, Baxter International, and Takeda, bringing deep expertise in clinical trial execution and operational strategy.',
  },
  {
    name: 'Paul Diamond, Ph.D., Esq.',
    title: 'VP, Legal & Intellectual Property',
    bio: 'Dr. Diamond has over 20 years of experience in intellectual property law and patent strategy in the life sciences sector. Prior to Actinium, he practiced at White & Case LLP. He holds a Ph.D. from Harvard University and a J.D. from Fordham University School of Law.',
  },
  {
    name: 'Ryan Chu, CFA',
    title: 'VP, Finance & Investor Relations',
    bio: 'Mr. Chu brings over 20 years of healthcare investing and financial analysis experience. He has held positions across investment banking, equity research, and corporate finance in the biopharmaceutical sector. Mr. Chu holds a B.S. from Yale University and is a CFA charterholder.',
  },
  {
    name: 'Gary Siegel',
    title: 'VP, Controller',
    bio: 'Mr. Siegel brings significant public company finance and accounting experience. He has previously held controller and financial leadership positions at Bellerophon Therapeutics and Pfizer. Mr. Siegel holds an MBA from Carnegie Mellon University\'s Tepper School of Business.',
  },
];

export default TEAM.map((member, i) => ({
  ...member,
  initials: getInitials(member.name),
  color: AVATAR_COLORS[i % AVATAR_COLORS.length],
}));
