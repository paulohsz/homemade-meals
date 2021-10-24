import React, { useEffect } from 'react';
import { signout } from 'next-auth/client';
import { useRouter } from 'next/router';
import websitePageHOC from '../src/components/wrappers/WebsitePage/hoc';

function Logout() {
  const { push } = useRouter();
  useEffect(async () => {
    await signout({ redirect: false });
    push('/auth/sign-in');
  }, []);

  return (
    <div />
  );
}

export default websitePageHOC(Logout, {
  pageWrapperProps: {
    seoProps: {
      headTitle: 'Logout',
    },
    authenticator: {
      isRequired: false,
    },
    menuProps: {
      display: false,
    },
  },
});
