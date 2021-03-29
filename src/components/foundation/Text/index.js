import React from 'react';
import styled from 'styled-components';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import propToStyle from '../../../theme/utils/propToStyle';
import typographyVariants from '../../../theme/typographyVariants';

const TextBase = styled.span`
  color: ${({ theme, color }) => get(theme, `colors.${color}.color`)}; 
  ${({ theme, variant }) => theme.typographyVariants[variant]}

  ${propToStyle('padding')}
  ${propToStyle('margin')}
  ${propToStyle('borderBottom')}
  ${propToStyle('textAlign')}
  ${propToStyle('marginBottom')}
  ${propToStyle('marginTop')}
`;

export default function Text({
  variant,
  children,
  tag,
  ...props
}) {
  return (
    <TextBase
      as={tag}
      variant={variant}
    // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {children}
    </TextBase>
  );
}

Text.defaultProps = {
  tag: 'span',
  variant: 'paragraph1',
  children: null,
};

Text.propTypes = {
  children: PropTypes.node,
  tag: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'p', 'li', 'a', 'span', 'input', 'textarea']),
  variant: PropTypes.oneOf(Object.keys(typographyVariants)),
};
