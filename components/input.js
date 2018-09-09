import styled from 'styled-components'

export default styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: ${props => props.theme.palette.textColor};
  background: ${props => props.theme.palette.canvasColor};
  border: 1px solid ${props => props.theme.palette.borderColor};
  border-radius: 3px;
  width: 100px;
`
