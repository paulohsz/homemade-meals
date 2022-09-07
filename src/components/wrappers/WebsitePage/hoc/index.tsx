import React, { ElementType } from 'react';
import WebsitePageWrapper, { WebsitePageWrapperProps } from '..';

export default function websitePageHOC(
  PageComponent: ElementType,
  { pageWrapperProps } = { pageWrapperProps: {} },
) {
  return (props: { pageWrapperProps: WebsitePageWrapperProps}) => (
    <WebsitePageWrapper
      {...pageWrapperProps}
      {...props.pageWrapperProps}
    >
      <PageComponent {...props} />
    </WebsitePageWrapper>
  );
}
