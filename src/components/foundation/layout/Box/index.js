import styled from 'styled-components';
import propToStyle from '../../../../theme/utils/propToStyle';

const Box = styled.div`
  ${propToStyle('display')}
  ${propToStyle('flexDirection')}
  ${propToStyle('justifyContent')}
  ${propToStyle('textAlign')}
  ${propToStyle('alignItems')}
  ${propToStyle('flexGrow')}
  ${propToStyle('flex')}
  ${propToStyle('flexWrap')}
  ${propToStyle('borderTop')}
  ${propToStyle('borderRadius')}
  ${propToStyle('backgroundColor')}
  ${propToStyle('backgroundImage')}
  ${propToStyle('backgroundRepeat')}
  ${propToStyle('backgroundPosition')}

  ${propToStyle('margin')}
  ${propToStyle('padding')}
  ${propToStyle('paddingTop')}
  ${propToStyle('paddingBottom')}

  background-color: ${({ theme }) => theme.colors.background.main.color};  
`;

export default Box;
