import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import SEO from '../../commons/SEO';
import ProgressLinear from '../../commons/ProgressLinear';
import Menu from '../../Menu';
import { WebsitePageProvider } from '../../../provider/WebsitePageContext';
import Loading from '../../commons/Loading';

export default function WebsitePageWrapper({
  seoProps,
  menuProps,
  authenticator,
  children,
}) {
  const [session, loading] = useSession();
  const { push } = useRouter();
  useEffect(() => {
    if (!session && !loading && authenticator.isRequired) {
      push('/');
    }
  }, [session, loading]);

  return (
    <WebsitePageProvider>
      <SEO {...seoProps} />
      <ProgressLinear />
      {((session && authenticator.isRequired) || (!authenticator.isRequired)) && (
        <>
          {menuProps.display && <Menu />}
          {children}
        </>
      )}
      <Loading />
    </WebsitePageProvider>
  );
}

WebsitePageWrapper.defaultProps = {
  seoProps: {},
  menuProps: {
    display: true,
  },
  authenticator: {
    isRequired: false,
  },
};

WebsitePageWrapper.propTypes = {
  seoProps: PropTypes.shape({
    headTitle: PropTypes.string,
  }),
  menuProps: PropTypes.shape({
    display: PropTypes.bool,
  }),
  authenticator: PropTypes.shape({
    isRequired: PropTypes.bool,
  }),
  children: PropTypes.node.isRequired,
};
