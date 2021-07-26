import React from 'react';
import Link from 'next/link';
import utilsClasses from '../../styles/utils.module.scss';
import layoutClasses from './Layout.module.scss';
import homeClasses from '../../styles/home.module.scss';
import { Button } from '@material-ui/core';
import { useRouter } from 'next/router';

export default function Nav({ home }) {
  const router = useRouter();

  return (
    <nav
      className={[
        layoutClasses.nav,
        home ? homeClasses.container : utilsClasses.container,
      ].join(' ')}
    >
      <Link href="/">
        <a className={layoutClasses.lgNavLogo}>
          <img src="/images/logo-lg.png" alt="Airbnb logo" />
        </a>
      </Link>

      <Link href="/">
        <a className={layoutClasses.smNavLogo}>
          <img src="/images/logo-sm.png" alt="Airbnb logo" />
        </a>
      </Link>

      <Button
        onClick={() => router.push('/homes/create')}
        variant="outlined"
        color="secondary"
      >
        Create
      </Button>
    </nav>
  );
}
