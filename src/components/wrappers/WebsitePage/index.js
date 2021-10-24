import React from 'react';
import PropTypes from 'prop-types';
import SEO from '../../commons/SEO';
import ProgressLinear from '../../commons/ProgressLinear';
import Menu from '../../Menu';
import { WebsitePageProvider } from '../../../provider/WebsitePageContext';
import Loading from '../../commons/Loading';

export default function WebsitePageWrapper({
  seoProps,
  menuProps,
  children,
}) {
  return (
    <WebsitePageProvider>
      <SEO {...seoProps} />
      <ProgressLinear />
      {menuProps.display && <Menu />}
      {children}
      <Loading />
    </WebsitePageProvider>
  );
}

WebsitePageWrapper.defaultProps = {
  seoProps: {},
  menuProps: {
    display: true,
  },
};

WebsitePageWrapper.propTypes = {
  seoProps: PropTypes.shape({
    headTitle: PropTypes.string,
  }),
  menuProps: PropTypes.shape({
    display: PropTypes.bool,
  }),
  children: PropTypes.node.isRequired,
};
