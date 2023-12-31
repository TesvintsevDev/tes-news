import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Logo } from '@components/Logo/Logo';
import { Navigation } from '@components/Navigation/Navigation';
import './Footer.css';

export const Footer: FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <Logo />
          <Navigation className="footer__navigation" />
        </div>
        <div
          className="footer__bottom"
          dangerouslySetInnerHTML={{
            __html: t('footer_link', {
              link: `<a class="footer__link" href="https://tesvintsevDev.github.io" target="_blank" rel="noreferrer">Tes Inc.</a>`,
            }),
          }}
        />
      </div>
    </footer>
  );
};
