import React from 'react';
import PropTypes from 'prop-types';
// import { useTheme } from 'styled-components';

export default function Git({ className }) {
  // const { svg } = useTheme().colors;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24">
      <path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z" />
    </svg>
  );
}

Git.defaultProps = {
  className: '',
};

Git.propTypes = {
  className: PropTypes.string,
};
