import React, { Component } from 'react';
import {
    Nav,
    Navbar,
    NavItem
} from 'react-bootstrap';
import {
    Collapse,
    NavbarToggler,
    NavbarBrand,
    NavLink
} from 'reactstrap';

export class NavMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        };
    }
    displayName = NavMenu.name

    render() {
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">reactstrap</NavbarBrand>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/components/">Components</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}
