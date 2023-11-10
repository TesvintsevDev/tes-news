import React, { FC } from 'react';
import { Logo } from '@components/Logo/Logo';
import { Navigation } from '@components/Navigation/Navigation';
import './Footer.css';

export const Footer: FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <Logo />
          <Navigation className="footer__navigation" />
        </div>
        <div className="footer__bottom">
            © 2023 Новостная лента сделана{' '}
            <a className="footer__link" href="https://tesvintsevDev.github.io" target="_blank" rel="noreferrer">
              TES inc.{' '}
            </a>
              при поддержке{' '}
            <a href="https://karpov.courses/frontend" target="_blank" rel="noreferrer" className="footer__link">
              Karpov.Courses
            </a>
          </div>
      </div>
    </footer>
  );
};
