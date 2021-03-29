import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Text from '../../foundation/Text';

const InputTextWrapper = styled.div`
  margin-bottom: 17px;
`;

const InputText = styled(Text)`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.tertiary.light.color};
  padding: 12px 16px;
  outline: 0;
  border-radius: ${({ theme }) => theme.borderRadius};
`;

InputText.defaultProps = {
  tag: 'textarea',
  variant: 'paragraph1',
};

export default function TextArea({
  placeholder,
  name,
  onChange,
  rows,
  value,
}) {
  return (
    <InputTextWrapper>
      <InputText
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        rows={rows}
        value={value}
      >
        {value}
      </InputText>
    </InputTextWrapper>
  );
}
TextArea.defaultProps = {
  rows: 4,
  value: '',
};

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  rows: PropTypes.number,
};
