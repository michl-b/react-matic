import styled from 'styled-components'
import LoadingIndicator from './loading-indicator'
import ErrorIcon from './error-icon'
import Title from './title'

const Container = styled.div`
  width: ${props => props.doubleWidth ? '20.2em' : '9em'};
  height: ${props => props.doubleHeight ? '20.2em' : '9em'};
  align-items: center;
  background-color: ${props => props.background ? props.background : props.theme.palette.canvasColor};
  color: ${props => props.color ? props.color : props.theme.palette.textColor};
  border: 1px solid ${props => props.theme.palette.borderColor};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content:flex-start;
  margin: 0.5em;
  padding: 0.5em;
  text-align: center;
  align-content:flex-start;
`

const Widget = ({ children, error = false, loading = false, title = '', doubleWidth = false, doubleHeight = false, background = null, color = null, active = false, onClick = null }) => {
  let content

  if (loading) {
    content = <LoadingIndicator />
  } else if (error) {
    content = <ErrorIcon />
    background = '#f44336'
  } else {
    content = <div>{children}</div>
  }

  return (
    <Container
      doubleWidth={doubleWidth}
      doubleHeight={doubleHeight}
      background={background}
      color={color}
      active={active}
      onClick={onClick}>
      {title ? <Title>{title}</Title> : ''}
      {content}
    </Container>
  )
}

export default Widget;