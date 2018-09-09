import styled from 'styled-components'
import LoadingIndicator from './loading-indicator'
import ErrorIcon from './error-icon'

const Container = styled.div`
  width: ${props => props.doubleWidth ? '20.2em' : '9em'};
  height: ${props => props.doubleHeight ? '20.2em' : '9em'};
  align-items: center;
  background-color: ${props => props.theme.palette.canvasColor};
  border: 1px solid ${props => props.theme.palette.borderColor};
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0.5em;
  padding: 0.5em;
`

const Title = styled.h4`
  text-align: center;
`

export default ({children, error = false, loading = false, title = '', doubleWidth = false, doubleHeight = false}) => {
  let content

  if (loading) {
    content = <LoadingIndicator />
  } else if (error) {
    content = <ErrorIcon />
  } else {
    content = <div>{children}</div>
  }

  return (
    <Container doubleWidth={doubleWidth} doubleHeight={doubleHeight}>
      {title ? <Title>{title}</Title> : ''}
      {content}
    </Container>
  )
}
