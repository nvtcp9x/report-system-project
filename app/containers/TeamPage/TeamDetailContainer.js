import React, { Component } from 'react';
import SideBar from 'components/SideBar'
import PropTypes from 'prop-types';

class TeamDetailContainer extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-3">
          <SideBar/>
        </div>
        <div className="col-md-9">

        </div>
      </div>
    );
  }
}

TeamDetailContainer.propTypes = {};

export default TeamDetailContainer;
