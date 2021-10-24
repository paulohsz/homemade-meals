import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import theme from '../../../theme';

export default function SEO({ headTitle }) {
  const pageTitleDefault = 'Homemade Meals';
  const hasHeadTitle = Boolean(headTitle);
  const title = hasHeadTitle
    ? (`${headTitle} | ${pageTitleDefault}`)
    : (pageTitleDefault);
  const description = 'Homemade Meals';
  // const image = 'alura-share.1571848411.png';
  // const urlBase = 'https://??????.vercel.app/';

  return (
    <Head>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />

      <link rel="icon" type="image/x-icon" href="/images/icon/logo-favicon.svg" />

      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <meta name="theme-color" content={theme.palette.primary.main} />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />

      {/* <!-- Open Graph / Facebook --> */}
      {/* <meta property="og:type" content="website" />
      <meta property="og:url" content={urlBase} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} /> */}

      {/* <!-- Twitter --> */}
      {/* <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={urlBase} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} /> */}
    </Head>
  );
}

SEO.defaultProps = {
  headTitle: '',
};

SEO.propTypes = {
  headTitle: PropTypes.string,
};
