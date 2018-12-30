import styled from 'styled-components'

export default styled.span`
  background: none;
  height: ${props => props.doubleHeight ? '8em' : '2em'};
  display: flex;
  justify-content: center;
  align-content: center;
`
