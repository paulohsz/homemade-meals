/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import WebsitePageWrapper from '..';

export default function websitePageHOC(
  PageComponent,
  { pageWrapperProps } = { pageWrapperProps: {} },
) {
  return (props) => (
    <WebsitePageWrapper
      {...pageWrapperProps}
      {...props.pageWrapperProps}
    >
      <PageComponent {...props} />
    </WebsitePageWrapper>
  );
}
