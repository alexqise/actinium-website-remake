const AVATAR_COLORS = [
  '#0c2d5a', '#7c3aed', '#059669', '#d97706', '#0891b2', '#dc2626',
];

function getInitials(name) {
  const parts = name.split(' ').filter(p => !p.includes('.') || p.length <= 4);
  const first = parts[0]?.[0] || '';
  const last = parts[parts.length - 1]?.[0] || '';
  return (first + last).toUpperCase();
}

const BOARD = [
  {
    name: 'Sandesh Seth',
    title: 'Chairman & Chief Executive Officer',
    bio: 'Mr. Seth has served as Chairman and CEO of Actinium Pharmaceuticals since inception, bringing over 25 years of investment banking, finance, and pharmaceutical industry experience.',
  },
  {
    name: 'C. David Nicholson, Ph.D.',
    title: 'Lead Independent Director',
    bio: 'Dr. Nicholson previously served as Chief Research & Development Officer at Allergan plc and held senior R&D leadership positions at Bayer and Organon. He brings decades of global pharmaceutical R&D leadership experience.',
  },
  {
    name: 'Ajit Shetty, Ph.D.',
    title: 'Director',
    bio: 'Dr. Shetty brings 36 years of experience at Johnson & Johnson and Janssen Pharmaceutica, where he served as Global Chairman. He was awarded the title of Baron by the King of Belgium for his contributions to the Belgian pharmaceutical industry.',
  },
  {
    name: 'Richard I. Steinhart',
    title: 'Director & Audit Committee Chair',
    bio: 'Mr. Steinhart has served as CFO of BioXcel Therapeutics and brings extensive financial leadership experience in publicly traded biopharmaceutical companies. He is a Certified Public Accountant.',
  },
  {
    name: 'Jeffrey W. Chell, M.D.',
    title: 'Director',
    bio: 'Dr. Chell served as CEO of the National Marrow Donor Program (NMDP), where he tripled the size of the Be The Match bone marrow registry. He brings deep expertise in hematology and transplant medicine.',
  },
  {
    name: 'June Almenoff, M.D., Ph.D.',
    title: 'Director',
    bio: 'Dr. Almenoff served as President and Chief Medical Officer of Furiex Pharmaceuticals and spent 12 years at GlaxoSmithKline in senior R&D leadership roles. She is the author of over 70 peer-reviewed publications.',
  },
];

export default BOARD.map((member, i) => ({
  ...member,
  initials: getInitials(member.name),
  color: AVATAR_COLORS[i % AVATAR_COLORS.length],
}));
