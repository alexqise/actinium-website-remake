import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../../assets/styles/variables/colors';
import metrics from '../../assets/styles/variables/metrics';
import useScrolled from '../../hooks/useScrolled';
import NAV_ITEMS from './navData';
import DropdownMenu from './DropdownMenu';

const LOGO_URL = 'https://d1io3yog0oux5.cloudfront.net/_7a2f79adab42c3713ff32f3f4d0b71d0/actiniumpharma/files/images/logo.png';

export default function Nav() {
  const scrolled = useScrolled(40);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleLinkClick = () => {
    setMenuOpen(false);
    setMobileExpanded(null);
  };

  const handleNavItemClick = (item, e) => {
    if (item.children && window.innerWidth <= 1024) {
      e.preventDefault();
      setMobileExpanded(mobileExpanded === item.label ? null : item.label);
    } else {
      handleLinkClick();
    }
  };

  const handleHashLink = (to) => {
    const [path, hash] = to.split('#');
    navigate(path);
    if (hash) {
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <>
      <Wrapper $scrolled={scrolled}>
        <Inner>
          <LogoLink to="/" onClick={handleLinkClick}>
            <Logo src={LOGO_URL} alt="Actinium Pharmaceuticals" />
          </LogoLink>
          <Links $open={menuOpen}>
            {NAV_ITEMS.map(item => (
              <NavItem key={item.label}>
                <StyledNavLink
                  to={item.to}
                  onClick={(e) => handleNavItemClick(item, e)}
                  $active={pathname === item.to || pathname.startsWith(item.to + '/')}
                >
                  {item.label}
                  {item.children && <Chevron $expanded={mobileExpanded === item.label}>&#9662;</Chevron>}
                </StyledNavLink>
                {item.children && (
                  <DropdownMenu
                    items={item.children}
                    mobileOpen={mobileExpanded === item.label}
                    onItemClick={(e) => {
                      const target = e.currentTarget;
                      const to = target.getAttribute('to') || target.getAttribute('href');
                      if (to && to.includes('#')) {
                        e.preventDefault();
                        handleHashLink(to);
                      }
                      handleLinkClick();
                    }}
                  />
                )}
              </NavItem>
            ))}
            <li>
              <ContactBtn to="/contact" onClick={handleLinkClick}>
                Contact
              </ContactBtn>
            </li>
          </Links>
          <Hamburger
            onClick={() => setMenuOpen(!menuOpen)}
            $open={menuOpen}
            aria-label="Toggle navigation"
          >
            <span /><span /><span />
          </Hamburger>
        </Inner>
      </Wrapper>
      {menuOpen && <Overlay onClick={() => { setMenuOpen(false); setMobileExpanded(null); }} />}
    </>
  );
}

const Wrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.97);
  backdrop-filter: blur(12px);
  box-shadow: ${p => p.$scrolled ? '0 1px 0 rgba(0,0,0,0.06)' : 'none'};
  transition: box-shadow 0.3s ease;
  height: ${metrics.navHeight};
`;

const Inner = styled.div`
  max-width: ${metrics.maxWidthWide};
  margin: 0 auto;
  padding: 0 ${metrics.paddingHorizontal};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LogoLink = styled(Link)`
  flex-shrink: 0;
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  height: 38px;
  width: auto;

  @media (max-width: ${metrics.breakpoints.tablet}) {
    height: 32px;
  }
`;

const Links = styled.ul`
  display: flex;
  align-items: center;
  gap: 0.25rem;

  @media (max-width: ${metrics.breakpoints.desktop}) {
    position: fixed;
    top: 0;
    right: 0;
    width: min(340px, 85vw);
    height: 100vh;
    flex-direction: column;
    align-items: flex-start;
    background: ${colors.bgPrimary};
    padding: 5rem 2rem 2rem;
    gap: 0.15rem;
    box-shadow: -8px 0 30px rgba(0,0,0,0.1);
    transform: translateX(${p => p.$open ? '0' : '100%'});
    transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 101;
    overflow-y: auto;

    li { width: 100%; }
  }
`;

const NavItem = styled.li`
  position: relative;

  &:hover > div {
    @media (min-width: ${metrics.breakpoints.desktop}) {
      opacity: 1;
      visibility: visible;
      transform: translateX(-50%) translateY(0);
    }
  }
`;

const StyledNavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem 0.85rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: ${p => p.$active ? colors.blue : colors.textSecondary};
  border-radius: ${metrics.radius.small};
  transition: color 0.2s ease, background 0.2s ease;
  white-space: nowrap;

  &:hover {
    color: ${colors.navy};
    background: ${colors.bgSecondary};
  }

  @media (max-width: ${metrics.breakpoints.desktop}) {
    padding: 0.75rem 1rem;
    font-size: 1rem;
  }
`;

const Chevron = styled.span`
  font-size: 0.6rem;
  transition: transform 0.2s ease;
  ${p => p.$expanded && 'transform: rotate(180deg);'}
`;

const ContactBtn = styled(Link)`
  display: inline-flex;
  align-items: center;
  padding: 0.45rem 1.25rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: ${colors.blue};
  border: 1.5px solid ${colors.borderAccent};
  border-radius: 100px;
  transition: all 0.25s ease;
  white-space: nowrap;
  margin-left: 0.5rem;

  &:hover {
    background: ${colors.blueFaint};
    border-color: ${colors.blue};
  }

  @media (max-width: ${metrics.breakpoints.desktop}) {
    margin-left: 0;
    margin-top: 0.75rem;
  }
`;

const Hamburger = styled.button`
  display: none;
  flex-direction: column;
  gap: 5px;
  padding: 6px;
  z-index: 102;

  span {
    display: block;
    width: 22px;
    height: 2px;
    background: ${colors.textPrimary};
    border-radius: 2px;
    transition: all 0.3s ease;
  }

  ${p => p.$open && `
    span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
    span:nth-child(2) { opacity: 0; }
    span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }
  `}

  @media (max-width: ${metrics.breakpoints.desktop}) {
    display: flex;
  }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.3);
  z-index: 99;
`;
