import Head from 'next/head'
import styled, { injectGlobal, ThemeProvider } from 'styled-components'
import { normalize } from 'polished'
import NavbarDark from './../components/navbardark'

injectGlobal`
  ${normalize()}

  html {
    font-family: 'Roboto', sans-serif;
  }
`

const Container = styled.main`
  background-color: ${props => props.theme.palette.backgroundColor};
  color: ${props => props.theme.palette.textColor};
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  min-height: 100vh;
  padding: 0.5em;
`

export default ({children, theme, title}) => (
  <ThemeProvider theme={theme}>
    <Container>
      <Head>
        {title ? <title>{title}</title> : ''}
        <link
          href='https://fonts.googleapis.com/css?family=Roboto:300,400,500'
          rel='stylesheet'
        />
      </Head>

      <NavbarDark/>

      {children}
    </Container>
  </ThemeProvider>
)
