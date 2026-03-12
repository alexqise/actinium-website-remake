import React from 'react';
import Hero from './components/Hero';
import Pipeline from './components/Pipeline';
import Mission from './components/Mission';
import Technology from './components/Technology';
import News from './components/News';
import CtaBanner from './components/CtaBanner';

export default function Home() {
  return (
    <>
      <Hero />
      <Pipeline />
      <Mission />
      <Technology />
      <News />
      <CtaBanner />
    </>
  );
}
