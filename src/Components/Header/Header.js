import React from 'react';
import PropTypes from 'prop-types';

import {
    Navbar,
    Nav,
    NavItem,
    NavLink,
  } from 'reactstrap';

  import style from './Header.css';

  function Header(props) {
    return <div>
    <p>List Based</p>
    <Nav>
      <NavLink href="#">Link</NavLink> <NavLink href="#">Link</NavLink> <NavLink href="#">Another Link</NavLink> <NavLink disabled href="#">Disabled Link</NavLink>
    </Nav>
  </div>
  }

  export default Header