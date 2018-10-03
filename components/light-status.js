import styled from 'styled-components'
import { size } from 'polished'

export default styled.button`
  background-color: ${props => props.active ? props.theme.palette.lightOnColor : props.theme.palette.disabledColor};
  color: ${props => props.active ? props.theme.palette.textInvertColor : props.theme.palette.textColor};
  height: 4em;
  width: 5em;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`
