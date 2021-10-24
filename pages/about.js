import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ProTip from '../src/ProTip';
import Link from '../src/Link';
import websitePageHOC from '../src/components/wrappers/WebsitePage/hoc';

function About() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Next.js v5 example
        </Typography>
        <Button variant="contained" component={Link} noLinkStyle href="/home">
          Go to the main page
        </Button>
        <ProTip />
      </Box>
    </Container>
  );
}

export default websitePageHOC(About, {
  pageWrapperProps: {
    seoProps: {
      headTitle: 'About',
    },
    authenticator: {
      isRequired: true,
    },
  },
});
