import styled from 'styled-components'

export default styled.div`
  background-color: ${props => props.theme.palette.primaryColor};
  color: ${props => props.theme.palette.white};
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
