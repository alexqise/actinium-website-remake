import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../../assets/styles/variables/colors';
import metrics from '../../assets/styles/variables/metrics';
import PageHero from '../../components/PageHero/PageHero';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import useReveal from '../../hooks/useReveal';
import teamData from '../../data/teamData';
import boardData from '../../data/boardData';

export default function About() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [hash]);

  const [overviewRef, overviewVisible] = useReveal(0.1);
  const [teamRef, teamVisible] = useReveal(0.1);
  const [boardRef, boardVisible] = useReveal(0.1);

  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Advancing the Science of Targeted Alpha Therapy"
        subtitle="A clinical-stage biopharmaceutical company developing targeted radiotherapies for patients with significant unmet medical needs."
      />

      <OverviewSection ref={overviewRef}>
        <Container>
          <OverviewGrid $visible={overviewVisible}>
            <OverviewText>
              <SectionHeader
                label="Our Story"
                title="Pioneering Targeted Radiotherapy"
                visible={overviewVisible}
              />
              <Paragraph>
                Actinium Pharmaceuticals is a clinical-stage biopharmaceutical company
                developing targeted radiotherapies based on its proprietary Actinium-225
                (Ac-225) technology platform. Founded with the vision of harnessing the
                power of alpha-emitting radioisotopes for cancer treatment, the company
                has built a diversified pipeline addressing significant unmet medical needs.
              </Paragraph>
              <Paragraph>
                Our approach combines proprietary radioisotope manufacturing capabilities
                with proven antibody-drug conjugation expertise to deliver potent,
                targeted therapies that destroy cancer cells while minimizing damage
                to surrounding healthy tissue.
              </Paragraph>
              <Paragraph>
                Headquartered in New York City, Actinium is traded on the NYSE American
                exchange under the ticker symbol ATNM. The company has a team of experienced
                pharmaceutical professionals dedicated to advancing its pipeline and
                manufacturing capabilities.
              </Paragraph>
            </OverviewText>
            <ValueCards>
              <ValueCard>
                <ValueTitle>Mission</ValueTitle>
                <ValueDesc>Deliver transformative targeted radiotherapies for patients battling cancers with limited treatment options.</ValueDesc>
              </ValueCard>
              <ValueCard>
                <ValueTitle>Innovation</ValueTitle>
                <ValueDesc>Proprietary Ac-225 manufacturing and conjugation technology enabling a diversified therapeutic pipeline.</ValueDesc>
              </ValueCard>
              <ValueCard>
                <ValueTitle>Patients First</ValueTitle>
                <ValueDesc>Every decision guided by the goal of bringing effective therapies to patients who need them most.</ValueDesc>
              </ValueCard>
            </ValueCards>
          </OverviewGrid>
        </Container>
      </OverviewSection>

      <TeamSection id="management" ref={teamRef}>
        <Container>
          <SectionHeader
            label="Leadership"
            title="Management Team"
            description="An experienced team of pharmaceutical and biotech professionals driving our mission forward."
            visible={teamVisible}
          />
          <TeamGrid>
            {teamData.map((member, i) => (
              <TeamCard key={member.name} $visible={teamVisible} $delay={i * 0.08}>
                <Avatar $color={member.color}>{member.initials}</Avatar>
                <MemberName>{member.name}</MemberName>
                <MemberTitle>{member.title}</MemberTitle>
                <MemberBio>{member.bio}</MemberBio>
              </TeamCard>
            ))}
          </TeamGrid>
        </Container>
      </TeamSection>

      <BoardSection id="board" ref={boardRef}>
        <Container>
          <SectionHeader
            label="Governance"
            title="Board of Directors"
            description="Distinguished leaders bringing decades of pharmaceutical, medical, and business expertise."
            visible={boardVisible}
          />
          <BoardGrid>
            {boardData.map((member, i) => (
              <BoardCard key={member.name} $visible={boardVisible} $delay={i * 0.08}>
                <BoardAvatar $color={member.color}>{member.initials}</BoardAvatar>
                <div>
                  <BoardName>{member.name}</BoardName>
                  <BoardTitle>{member.title}</BoardTitle>
                  <BoardBio>{member.bio}</BoardBio>
                </div>
              </BoardCard>
            ))}
          </BoardGrid>
        </Container>
      </BoardSection>
    </>
  );
}

const Container = styled.div`
  max-width: ${metrics.maxWidth};
  margin: 0 auto;
  padding: 0 ${metrics.paddingHorizontal};
`;

const OverviewSection = styled.section`
  padding: clamp(4rem, 8vw, 6rem) 0;
  background: ${colors.bgPrimary};
`;

const OverviewGrid = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 3rem;
  align-items: start;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '30px'});
  transition: all 0.7s ease;

  @media (max-width: ${metrics.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const OverviewText = styled.div``;

const Paragraph = styled.p`
  font-size: 1.02rem;
  color: ${colors.textSecondary};
  line-height: 1.75;
  margin-bottom: 1.25rem;
`;

const ValueCards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const ValueCard = styled.div`
  background: ${colors.bgSecondary};
  border: 1px solid ${colors.borderLight};
  border-radius: ${metrics.radius.large};
  padding: 1.5rem;
`;

const ValueTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: ${colors.navy};
  margin-bottom: 0.35rem;
`;

const ValueDesc = styled.p`
  font-size: 0.9rem;
  color: ${colors.textSecondary};
  line-height: 1.6;
`;

const TeamSection = styled.section`
  padding: clamp(4rem, 8vw, 6rem) 0;
  background: ${colors.bgSecondary};
  border-top: 1px solid ${colors.borderLight};
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;

  @media (max-width: ${metrics.breakpoints.desktop}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: ${metrics.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const TeamCard = styled.div`
  background: ${colors.bgPrimary};
  border: 1px solid ${colors.border};
  border-radius: ${metrics.radius.large};
  padding: 2rem;
  text-align: center;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '25px'});
  transition: all 0.5s ease ${p => p.$delay}s;

`;

const Avatar = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: ${p => p.$color};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.35rem;
  font-weight: 600;
  margin: 0 auto 1.25rem;
  letter-spacing: 0.03em;
`;

const MemberName = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${colors.navy};
  margin-bottom: 0.25rem;
`;

const MemberTitle = styled.p`
  font-size: 0.85rem;
  font-weight: 500;
  color: ${colors.blue};
  margin-bottom: 1rem;
`;

const MemberBio = styled.p`
  font-size: 0.88rem;
  color: ${colors.textSecondary};
  line-height: 1.6;
  text-align: left;
`;

const BoardSection = styled.section`
  padding: clamp(4rem, 8vw, 6rem) 0;
  background: ${colors.bgPrimary};
`;

const BoardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;

  @media (max-width: ${metrics.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const BoardCard = styled.div`
  display: flex;
  gap: 1.25rem;
  align-items: flex-start;
  background: ${colors.bgSecondary};
  border: 1px solid ${colors.borderLight};
  border-radius: ${metrics.radius.large};
  padding: 1.75rem;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '25px'});
  transition: all 0.5s ease ${p => p.$delay}s;

`;

const BoardAvatar = styled.div`
  width: 52px;
  height: 52px;
  min-width: 52px;
  border-radius: 50%;
  background: ${p => p.$color};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.03em;
`;

const BoardName = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: ${colors.navy};
  margin-bottom: 0.15rem;
`;

const BoardTitle = styled.p`
  font-size: 0.82rem;
  font-weight: 500;
  color: ${colors.blue};
  margin-bottom: 0.65rem;
`;

const BoardBio = styled.p`
  font-size: 0.85rem;
  color: ${colors.textSecondary};
  line-height: 1.6;
`;
