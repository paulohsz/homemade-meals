import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Text from '../../foundation/Text';

const InputWrapper = styled.div`
  margin-bottom: 3px;
`;
const ErrorValidation = styled(Text)`
margin-top: 3px;
margin-left: 20px;
  display: block;
  height: 15px;
`;
ErrorValidation.defaultProps = {
  variant: 'smallestException',
  color: 'test.error',
};
const Input = styled(Text)`
  
  width: 100%;
  border: 1px solid;
  border-color: ${({ error, theme }) => ((error) ? 'red' : theme.colors.tertiary.light.color)};
  padding: 12px 16px;
  outline: 0;
  border-radius: ${({ theme }) => theme.borderRadius};
`;

Input.defaultProps = {
  tag: 'input',
  variant: 'paragraph1',
};

export default function TextField({
  placeholder,
  name,
  onChange,
  onBlur,
  value,
  error,
  helperText,
}) {
  return (
    <InputWrapper>
      <Input
        type="text"
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        error={error}
      />
      <ErrorValidation>
        {helperText}
        {' '}
        {' '}

      </ErrorValidation>
    </InputWrapper>
  );
}
TextField.defaultProps = {
  error: false,
  helperText: '',
  onBlur: () => {},
};
TextField.propTypes = {
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  error: PropTypes.bool,
  helperText: PropTypes.string,
};
