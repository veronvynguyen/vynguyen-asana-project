import 'antd/dist/antd.css';
import '../styles/site.css';
import React, { Component, Fragment } from 'react';
import { Icon } from 'antd';
import data from '../data/data';
import { Grid, Fade } from 'mauerwerk';
import Header from './Header';

const Cell = ({ toggle, height, name, age, description, breed, gender, shelter, shelterAddress, contact, css, maximized }) => ( 
  <div
    className="cell"
    style={{ backgroundImage: css, cursor: !maximized ? 'pointer' : 'auto' }}
    onClick={!maximized ? toggle : undefined}>
    
    <Fade show={maximized} delay={maximized ? 50 : 0}>
      <div className="details">
          <div className="close">
            <Icon type="close" style={{ cursor: 'pointer' }} onClick={toggle} />
          </div>
          <h1>{name}, {age}, {gender}</h1>
          <p><b>{breed}</b></p>
          <p>{description}</p>
          <p><b className="detail-label">Find at:</b> {shelter}</p>
          <p><b className="detail-label">Shelter Address:</b> {shelterAddress}</p>
          <p><b className="detail-label">Shelter #:</b> {contact}</p>
      </div>
    </Fade>
    <Fade
      show={!maximized}
      from={{ opacity: 0, transform: 'translate3d(0,0px,0)' }}
      enter={{ opacity: 1, transform: 'translate3d(0,0px,0)' }}
      leave={{ opacity: 0, transform: 'translate3d(0,0px,0)' }}
      delay={maximized ? 0 : 50}>
      <div className="default">{name}, {age}<br></br>{breed}</div>
    </Fade>
  </div>
)

class Gallery extends Component {
  state = { data, columns: 4, margin: 20, filter: '', height: false }
 
  search = e => this.setState({ filter: e.target.value })

  render() {
    const data = this.state.data.filter(
      d => d.name.toLowerCase().indexOf(this.state.filter) != -1
    )

    return (
      <>
        <div className="main">
          <Header />
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
      </>
    )
  }
}

export default Gallery