import styled from 'styled-components'
import { size } from 'polished'

export default styled.div`
  background-color: ${props => props.value > 0.0 ? props.theme.palette.successColor : props.theme.palette.disabledColor};
  ${size('6em')}
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`
