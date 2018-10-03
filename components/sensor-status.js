import styled from 'styled-components'
import { size } from 'polished'

export default styled.span`
  background-color: ${props => props.active ? props.theme.palette.errorColor : props.theme.palette.successColor};
  color: ${props => props.active ? props.theme.palette.textInvertColor : props.theme.palette.textColor};
  height: 4em;
  width: 5em;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-left: 5px;
  margin-right: 5px;
`
