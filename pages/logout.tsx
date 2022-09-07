import React from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import websitePageHOC from '../src/components/wrappers/WebsitePage/hoc';

function Logout() {
  const { push } = useRouter();
  const { status } = useSession();

  signOut({ redirect: false });
  if (status === 'unauthenticated' ) {
    push('/auth/sign-in/');
  }
  
  return <></>;
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
