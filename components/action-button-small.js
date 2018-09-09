import styled from 'styled-components'

export default styled.button`
  background-color: ${props => props.theme.palette.primaryColor};
  color: ${props => props.theme.palette.white};
  width: 6em;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
`
