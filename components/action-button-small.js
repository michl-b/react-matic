import styled from 'styled-components'
import { size } from 'polished'

export default styled.button`
  background-color: ${props => props.theme.palette.primaryColor};
  color: ${props => props.theme.palette.white};
  width: 3em;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
