import React from 'react';
import { 
  Icon, 
  Input 
} from 'antd';
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
            {/* <Picture src={logo}></Picture> */}
        </NavbarBrand>
        <Nav className="ml-auto" navbar>
        <Input
          style={{ marginLeft: 15, minWidth: 130, maxWidth: 300 }}
          suffix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder="input search text"
          onChange={search}/>
        </Nav>
    </Navbar>
  )
}
