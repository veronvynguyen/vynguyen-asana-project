import 'antd/dist/antd.css'
import React, { Component, Fragment } from 'react'
import {Link} from 'react-router-dom'
import lodash from 'lodash'
import { Icon } from 'antd'
import data from '../data/data'
import NavMenu from './NavMenu'
import { Grid, Slug, Fade } from 'mauerwerk'
import "../styles/site.css"

const Cell = ({ toggle, name, height, description, css, maximized }) => ( 
  <div
    className="cell"
    style={{ backgroundImage: css, cursor: !maximized ? 'pointer' : 'auto' }}
    onClick={!maximized ? toggle : undefined}>
    
    <Fade show={maximized} delay={maximized ? 50 : 0}>
      <div className="details">
        <Slug delay={60}>
          <div className="close">
            <Icon type="close" style={{ cursor: 'pointer' }} onClick={toggle} />
          </div>
          <h1>{name}</h1>
          <p>{description}</p>
        </Slug>
      </div>
    </Fade>
    {/* <Fade
      show={!maximized}
      from={{ opacity: 0, transform: 'translate3d(0,140px,0)' }}
      enter={{ opacity: 1, transform: 'translate3d(0,0px,0)' }}
      leave={{ opacity: 0, transform: 'translate3d(0,-50px,0)' }}
      delay={maximized ? 0 : 50}>
      <div className="default">{name}</div>
    </Fade> */}
  </div>
)

class Gallery extends Component {
  state = { data, columns: 4, margin: 20, filter: '', height: false }
 
  search = e => this.setState({ filter: e.target.value })

  render() {
    const data = this.state.data.filter(
      d => d.name.toLowerCase().indexOf(this.state.filter) != -1
    )
    console.log(this.props);
    return (
      <div className="main">
        {/* <NavMenu {...this.state}
          search={this.search}
        /> */}
        <div className="site-header">
          <Link to="/"><h2>Asana PawScope</h2></Link>
          <p>Find a furry friend to adopt in the Bay Area</p>
        </div>
        <Grid
          className="grid"
          // Arbitrary data, should contain keys, possibly heights, etc.
          data={data}
          // Key accessor, instructs grid on how to fet individual keys from the data set
          keys={d => d.name}
          // Can be a fixed value or an individual data accessor
          heights={this.state.height ? d => d.height : 200}
          // Number of columns
          columns={this.state.columns}
          // Space between elements
          margin={this.state.margin}
          // Removes the possibility to scroll away from a maximized element
          lockScroll={false}
          // Delay when active elements (blown up) are minimized again
          closeDelay={50}>
          {(data, maximized, toggle) => (
            <Cell {...data} maximized={maximized} toggle={toggle} />
          )}
        </Grid>
      </div>
    )
  }
}

export default Gallery