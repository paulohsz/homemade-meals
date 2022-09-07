import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';

const SEO = ({ headTitle }: { headTitle: string }) => {
  const pageTitleDefault = 'Homemade Meals';

  const title = Boolean(headTitle)
    ? `${headTitle} | ${pageTitleDefault}`
    : pageTitleDefault;
  const description = 'Homemade Meals';
  // const image = 'alura-share.1571848411.png';
  // const urlBase = 'https://??????.vercel.app/';
  // <Head>
  //   {/* PWA primary color */}
  //   <meta name="theme-color" content={palette.primary.main} />
  //   <link rel="shortcut icon" href="/favicon.ico" />
  //   <link
  //     rel="stylesheet"
  //     href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
  //   />
  //   <meta name="emotion-insertion-point" content="" />
  //   {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
  // </Head>;
  return (
    <Head>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />

      <meta name="viewport" content="initial-scale=1, width=device-width" />

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
      {/* {(this.props as any).emotionStyleTags} */}
    </Head>
  );
};

SEO.defaultProps = {
  headTitle: '',
};

SEO.propTypes = {
  headTitle: PropTypes.string,
};

export default SEO;
