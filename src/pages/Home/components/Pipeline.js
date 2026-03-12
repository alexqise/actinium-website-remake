import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../../../assets/styles/variables/colors';
import metrics from '../../../assets/styles/variables/metrics';
import useReveal from '../../../hooks/useReveal';

const PIPELINE_DATA = [
  {
    phase: 'Late Stage',
    phaseColor: '#059669',
    phaseBg: '#ecfdf5',
    name: 'Actimab-A',
    slug: 'actimab-a',
    description: 'CD33 targeting, mutation agnostic therapy for relapsed/refractory acute myeloid leukemia.',
  },
  {
    phase: 'Clinical',
    phaseColor: colors.blue,
    phaseBg: colors.blueFaint,
    name: 'ATNM-400',
    slug: 'atnm-400',
    description: 'First-in-class Ac-225 pan-tumor radiotherapy for mCRPC, NSCLC, and breast cancer.',
  },
  {
    phase: 'Development',
    phaseColor: '#d97706',
    phaseBg: '#fffbeb',
    name: 'Iomab-ACT / Iomab-B',
    slug: 'iomab-act',
    description: 'Targeted conditioning and targeted radiotherapy pipeline expanding treatment frontiers.',
  },
  {
    phase: 'Platform',
    phaseColor: colors.textTertiary,
    phaseBg: colors.bgSecondary,
    name: 'Ac-225 Manufacturing',
    slug: null,
    description: 'Proprietary Actinium-225 manufacturing technology platform enabling scaled production.',
  },
];

export default function Pipeline() {
  const [ref, visible] = useReveal(0.1);

  return (
    <Wrapper id="pipeline">
      <Container ref={ref}>
        <Header $visible={visible}>
          <Label>Our Pipeline</Label>
          <Title>Transforming Cancer Treatment</Title>
          <Desc>
            A diversified portfolio of targeted radiotherapies addressing
            significant unmet medical needs across multiple cancer types.
          </Desc>
        </Header>
        <Grid>
          {PIPELINE_DATA.map((item, i) => (
            <Card
              key={item.name}
              as={item.slug ? Link : 'div'}
              to={item.slug ? `/pipeline/${item.slug}` : undefined}
              $visible={visible}
              $delay={i * 0.1}
            >
              <Phase $color={item.phaseColor} $bg={item.phaseBg}>
                {item.phase}
              </Phase>
              <CardName>{item.name}</CardName>
              <CardDesc>{item.description}</CardDesc>
              {item.slug && (
                <LearnMore>
                  Learn more <span>&rarr;</span>
                </LearnMore>
              )}
            </Card>
          ))}
        </Grid>
        <ViewAllRow $visible={visible}>
          <ViewAllLink to="/pipeline">
            View Full Pipeline <span>&rarr;</span>
          </ViewAllLink>
        </ViewAllRow>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  padding: clamp(5rem, 10vw, 8rem) 0;
  background: ${colors.bgPrimary};
`;

const Container = styled.div`
  max-width: ${metrics.maxWidth};
  margin: 0 auto;
  padding: 0 ${metrics.paddingHorizontal};
`;

const Header = styled.div`
  margin-bottom: 3rem;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '30px'});
  transition: all 0.7s ease;
`;

const Label = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: ${colors.blue};
  margin-bottom: 0.75rem;

  &::before {
    content: '';
    width: 20px;
    height: 1.5px;
    background: ${colors.blue};
  }
`;

const Title = styled.h2`
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: clamp(2rem, 3.5vw, 2.75rem);
  font-weight: 400;
  color: ${colors.navy};
  letter-spacing: -0.01em;
  margin-bottom: 0.75rem;
`;

const Desc = styled.p`
  font-size: 1.05rem;
  color: ${colors.textSecondary};
  max-width: 520px;
  line-height: 1.65;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;

  @media (max-width: ${metrics.breakpoints.desktop}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: ${metrics.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: ${colors.bgPrimary};
  border: 1px solid ${colors.border};
  border-radius: ${metrics.radius.large};
  padding: 1.75rem;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '15px'});
  transition: all 0.5s ease ${p => p.$delay}s;
  display: block;
`;

const Phase = styled.span`
  display: inline-block;
  padding: 0.25rem 0.7rem;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  border-radius: 100px;
  color: ${p => p.$color};
  background: ${p => p.$bg};
  margin-bottom: 1rem;
`;

const CardName = styled.h3`
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: 1.3rem;
  font-weight: 400;
  color: ${colors.navy};
  margin-bottom: 0.6rem;
`;

const CardDesc = styled.p`
  font-size: 0.92rem;
  color: ${colors.textSecondary};
  line-height: 1.6;
`;

const LearnMore = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  margin-top: 1.25rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: ${colors.blue};
`;

const ViewAllRow = styled.div`
  text-align: center;
  margin-top: 2.5rem;
  opacity: ${p => p.$visible ? 1 : 0};
  transition: opacity 0.6s ease 0.5s;
`;

const ViewAllLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.95rem;
  font-weight: 600;
  color: ${colors.blue};
  transition: gap 0.25s ease;

  &:hover { gap: 0.6rem; }
`;
