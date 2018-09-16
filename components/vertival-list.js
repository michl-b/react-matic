import styled from 'styled-components'

export default styled.span`
  background-color: ${props => props.theme.palette.canvasColor};
  height: ${props => props.doubleHeight ? '8em' : '2em'};
  display: flex;
  flex-direction: row;
`
