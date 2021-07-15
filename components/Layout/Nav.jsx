import React from 'react';
import Link from 'next/link';
import utilsClasses from '../../styles/utils.module.scss';
import layoutClasses from './Layout.module.scss';
import homeClasses from '../../styles/home.module.scss';

export default function Nav({ home }) {
  return (
    <nav
      className={[
        layoutClasses.nav,
        home ? homeClasses.container : utilsClasses.container,
      ].join(' ')}
    >
      <Link href="/">
        <a>
          <img
            className={layoutClasses.lgNavLogo}
            src="/images/logo-lg.png"
            alt="Airbnb logo"
          />
        </a>
      </Link>

      <Link href="/">
        <a>
          <img
            className={layoutClasses.smNavLogo}
            src="/images/logo-sm.png"
            alt="Airbnb logo"
          />
        </a>
      </Link>
    </nav>
  );
}
