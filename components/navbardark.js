import React from 'react'
import { Container } from 'styled-container-component'
import { Button } from 'styled-button-component'
import { Navbar, NavbarLink } from 'styled-navbar-component'
import { Nav } from 'styled-nav-component'

export default class NavbarDark extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hidden: false
    }
  }

  handleOpenCloseNav() {
    this.setState({
      hidden: !this.state.hidden
    })
  }

  render() {
    const { hidden } = this.state
    return (
      <Container fluid>
        <Navbar expandSm dark>
          <Nav start={1}>
            <NavbarLink dark brand href='/'><img src='/static/homematic.png' height='24' /> REACT-MATIC</NavbarLink>
            <Nav end={1}>
              <Button
                dark
                outline
                toggleCollapse
                expandSm
                onClick={() => this.handleOpenCloseNav()}
              >
                <span>&#9776;</span>
              </Button>
            </Nav>
          </Nav>
          <Nav start={1} collapse expandSm hidden={hidden}>
            <NavbarLink dark href='/'>Dashboard</NavbarLink>
            <NavbarLink dark href='/deko'>Deko</NavbarLink>
            <NavbarLink dark href='/all'>Alle Geräte</NavbarLink>
          </Nav>
        </Navbar>
      </Container>
    )
  }
}
