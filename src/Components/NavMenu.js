import React from 'react';
import { Icon, Input } from 'antd';
import logo from '../images/logo.png';
import { Picture } from 'react-responsive-picture';

import {
  Nav,
  Navbar,
  NavbarBrand
} from 'react-bootstrap';

export default function({
  search,
}) {
  return (
    <Navbar color="light" light expand="md">
        <NavbarBrand href="/">
            <Picture src={logo} alt="Adopt a dog in the Bay Area"></Picture>
        </NavbarBrand>
        <Nav className="ml-auto" navbar>
        </Nav>
    </Navbar>
  )
}
