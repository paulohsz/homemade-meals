import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/client';
import { Box, Container, Typography } from '@mui/material';

export default function Index({ user }) {
  const { push } = useRouter();

  useEffect(() => {
    if (user) {
      push('/list/ingredients');
    }
  }, [user]);

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h5" component="h1" color="grey.800" gutterBottom>
          {`Welcome ${user.name}!`}
        </Typography>
        <Typography variant="subtitle1" component="span" color="grey.A700" gutterBottom>
          Redirecting...
        </Typography>
      </Box>
    </Container>
  );
}
Index.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  if (!session) {
    return {
      redirect: {
        destination: '/auth/sign-in',
        permanent: false,
      },
    };
  }
  return {
    props: {
      user: session.user,
    },
  };
}
