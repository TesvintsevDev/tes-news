import React, { FC, Fragment } from 'react';
import './Page.css';
import { Navigation } from '../Navigation/Navigation';
import { Logo } from '../Logo/Logo';
import { ColorSchemeSwitcher } from '@components/ColorSchemeSwitcher/ColorSchemeSwitcher';

export const Page: FC = ({ children }) => {
  return (
    <Fragment>
      <header className="header">
        <div className="container header__container">
          <Logo />
          <Navigation className="header__navigation" />
            <div className="header__controls">
                <ColorSchemeSwitcher />
            </div>
        </div>
      </header>

      <main>{children}</main>

      <footer className="footer">
        <div className="container">
          <div className="footer__top">
            <Logo />
            <Navigation className="footer__navigation" />
          </div>
          <div className="footer__bottom">
              © 2023 Новостная лента сделана{' '}
              <a className="footer__link" href="https://tesvintsevDev.github.io" target="_blank" rel="noreferrer">
                TES.inc{' '}
              </a>
              при поддержке{' '}
              <a href="https://karpov.courses/frontend" target="_blank" rel="noreferrer" className="footer__link">
                Karpov.Courses
              </a>              
          </div>
        </div>
      </footer>
    </Fragment>
  );
};
