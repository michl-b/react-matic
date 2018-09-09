import styled from 'styled-components'
import { size } from 'polished'

export default styled.div`
  background-color: ${props => props.active ? props.theme.palette.successColor : props.theme.palette.primaryColor};
  background-color: ${props => props.theme.palette.primaryColor};
  color: ${props => props.theme.palette.white};
  ${size('4em')}
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 20%;
`
