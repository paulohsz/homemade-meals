import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Props } from 'src/types/commons';
import Loading from 'src/components/commons/Loading';
import SEO from 'src/components/commons/SEO';
import { IMenuProps, useWebsitePage } from 'src/providers/WebsitePageContext';

export interface WebsitePageWrapperProps {
  seoProps: {
    headTitle: string,
  };
  menuProps: IMenuProps;
  authenticator: {
    isRequired: boolean,
  };
}

const WebsitePageWrapper = ({
  seoProps,
  menuProps,
  authenticator,
  children,
}: Props & WebsitePageWrapperProps) => {
  const { status } = useSession();
  const { push } = useRouter();

  const { setMenuProps } = useWebsitePage();
  
  useEffect(() => {
    setMenuProps(menuProps);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (authenticator.isRequired && status === 'unauthenticated' ) {
    push('/');
  }

  return (
    <>
      <SEO {...seoProps} />
      {((status === 'authenticated' && authenticator.isRequired) || !authenticator.isRequired) && (
        <>
          {children}
        </>
      )}
      <Loading />
    </>
  );
};

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

export default WebsitePageWrapper;