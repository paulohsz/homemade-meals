import React, { useEffect } from 'react';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { Box, Container, Typography } from '@mui/material';
import websitePageHOC from '../src/components/wrappers/WebsitePage/hoc';

function Index() {
  const [session] = useSession();
  const { push } = useRouter();

  useEffect(() => {
    if (session) {
      push('/list/ingredients/');
    } else {
      push('/auth/sign-in/');
    }
  }, [session]);

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        {session ? (
          <>
            <Typography variant="h5" component="h1" color="grey.800" gutterBottom>
              {`Welcome ${session.user.name}!`}
            </Typography>
            <Typography variant="subtitle1" component="span" color="grey.A700" gutterBottom>
              Redirecting...
            </Typography>
          </>
        ) : (
          <Typography variant="h5" component="h1" color="grey.800" gutterBottom>
            Redirecting...
          </Typography>
        )}

      </Box>
    </Container>
  );
}

export default websitePageHOC(Index, {
  pageWrapperProps: {
    menuProps: {
      display: false,
    },
    authenticator: {
      isRequired: false,
    },
  },
});
