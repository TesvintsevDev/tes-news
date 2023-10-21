import React, { FC, Fragment } from 'react';
import './Page.css';
import { Navigation } from '../Navigation/Navigation';

export const Page: FC = ({ children }) => {
  return (
    <Fragment>
      <header className="header">
        <div className="container">
          <Navigation placement="header" className="header__navigation" />
        </div>
      </header>

      <main>{children}</main>

      <footer className="footer">
        <div className="container">
          <Navigation placement="footer" className="footer__navigation" />
          <div className="footer__bottom">
            <p className="footer__text">
              Новостная лента сделана{' '}
              <a className="footer__link" href="https://tesvintsevDev.github.io" target="_blank" rel="noreferrer">
                TES.inc{' '}
              </a>
              при поддержке{' '}
              <a href="https://karpov.courses/frontend" target="_blank" rel="noreferrer" className="footer__link">
                Karpov.Courses
              </a>
            </p>
            <p className="footer__text footer__text--gray">© 2023</p>
          </div>
        </div>
      </footer>
    </Fragment>
  );
};
