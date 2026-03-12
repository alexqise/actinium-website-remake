import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../../../assets/styles/variables/colors';
import metrics from '../../../assets/styles/variables/metrics';
import useReveal from '../../../hooks/useReveal';
import NEWS from '../../../data/newsData';

export default function News() {
  const [ref, visible] = useReveal(0.1);
  const displayNews = NEWS.slice(0, 3);

  return (
    <Wrapper id="news">
      <Container ref={ref}>
        <Header>
          <div>
            <Label $visible={visible}>Latest Updates</Label>
            <Title $visible={visible}>News &amp; Events</Title>
          </div>
          <ViewAll to="/investors#news" $visible={visible}>
            View All News <span>&rarr;</span>
          </ViewAll>
        </Header>
        <Grid>
          {displayNews.map((item, i) => (
            <Card key={i} $visible={visible} $delay={i * 0.1}>
              <DateLabel>{item.date}</DateLabel>
              <CardTitle>{item.title}</CardTitle>
              <Excerpt>{item.excerpt}</Excerpt>
              <ReadMore to="/investors#news">Read more &rarr;</ReadMore>
            </Card>
          ))}
        </Grid>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  padding: clamp(5rem, 10vw, 8rem) 0;
  background: ${colors.bgSecondary};
  border-top: 1px solid ${colors.borderLight};
`;

const Container = styled.div`
  max-width: ${metrics.maxWidth};
  margin: 0 auto;
  padding: 0 ${metrics.paddingHorizontal};
`;

const Header = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
  gap: 1rem;
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
  margin-bottom: 0.5rem;
  opacity: ${p => p.$visible ? 1 : 0};
  transition: opacity 0.6s ease;

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
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '20px'});
  transition: all 0.6s ease 0.1s;
`;

const ViewAll = styled(Link)`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${colors.blue};
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  opacity: ${p => p.$visible ? 1 : 0};
  transition: opacity 0.6s ease 0.2s, gap 0.25s ease;

  &:hover { gap: 0.6rem; }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;

  @media (max-width: ${metrics.breakpoints.desktop}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: ${metrics.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.article`
  background: ${colors.bgPrimary};
  border: 1px solid ${colors.border};
  border-radius: ${metrics.radius.large};
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '15px'});
  transition: all 0.5s ease ${p => p.$delay}s;
`;

const DateLabel = styled.span`
  font-size: 0.8rem;
  font-weight: 600;
  color: ${colors.blue};
  margin-bottom: 0.65rem;
`;

const CardTitle = styled.h3`
  font-family: 'Source Sans 3', sans-serif;
  font-size: 1.05rem;
  font-weight: 600;
  color: ${colors.navy};
  line-height: 1.4;
  margin-bottom: 0.65rem;
`;

const Excerpt = styled.p`
  font-size: 0.9rem;
  color: ${colors.textSecondary};
  line-height: 1.6;
  flex: 1;
`;

const ReadMore = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  margin-top: 1rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: ${colors.blue};
  transition: gap 0.25s ease;

  &:hover { gap: 0.5rem; }
`;
