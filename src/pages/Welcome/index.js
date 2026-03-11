import React from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Pipeline from './components/Pipeline';
import Mission from './components/Mission';
import Technology from './components/Technology';
import News from './components/News';
import CtaBanner from './components/CtaBanner';
import Footer from './components/Footer';

export default function Welcome() {
  return (
    <>
      <Nav />
      <Hero />
      <Pipeline />
      <Mission />
      <Technology />
      <News />
      <CtaBanner />
      <Footer />
    </>
  );
}
