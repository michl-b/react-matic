import React from 'react';

/*
  if you installed `styled-bootstrap-components` use

    import { ... } from 'styled-bootstrap-components'

  instead.
*/
import { Container } from 'styled-container-component';
import { Button } from 'styled-button-component';
import { Navbar, NavbarLink } from 'styled-navbar-component';
import { Nav } from 'styled-nav-component';


export default class NavbarDark extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: false,
    };
  }

  handleOpenCloseNav() {
    this.setState({
      hidden: !this.state.hidden,
    });
  }

  render() {
    const { hidden } = this.state;
    return (
      <Container fluid>
        <Navbar expandSm dark>
          <Nav start>
            <NavbarLink dark brand href='/'>REACT-MATIC</NavbarLink>
            <Nav end>
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
          <Nav start collapse expandSm hidden={hidden}>
            <NavbarLink dark href='/'>Dashboard</NavbarLink>
            <NavbarLink dark href='/control'>Control</NavbarLink>
            <NavbarLink dark href='/devices'>Devices</NavbarLink>
          </Nav>
        </Navbar>
      </Container>
    );
  }
};
