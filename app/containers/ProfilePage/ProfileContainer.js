import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types';
import styled from "styled-components";
import isEmpty from 'lodash/isEmpty';
import { connect } from "react-redux";
import SideBar from '../../components/SideBar'
import ProfileForm from "../../components/ProfileForm";
import { getUserProfile, updateProfile} from './actions'
import { addFLashMessage } from '../FlashMessage/actions'
import { selectUser } from "../Auth/selectors";
import { selectLoading, selectProfile } from "./selectors";

const Spinner = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

class ProfileContainer extends Component {

  componentDidMount() {
    const {getProfile, user} = this.props;
    getProfile(user.id);
  }

  render() {
    const {updateProfile, profile, loading, addFlashMessage} = this.props;
    return (
      <div className="container">
        <div className="row mt-5 mb-5">
          <div className="col-md-4">
            <SideBar />
          </div>
          <div className="col-md-8">
            {loading && isEmpty(profile) ? (
              <Spinner>
                <FontAwesomeIcon icon="spinner" size="lg" spin/>
              </Spinner>
            ) : (
              <div className="shadow-sm">
                <ProfileForm
                  profile={profile}
                  addFlashMessage={addFlashMessage}
                  updateProfile={updateProfile}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

ProfileContainer.propTypes = {
  user: PropTypes.object,
  profile: PropTypes.object,
  getProfile: PropTypes.func,
  updateProfile: PropTypes.func
}

export const mapStateToProps = state => ({
  profile: selectProfile(state),
  user: selectUser(state),
  loading: selectLoading(state)
});

export const mapDispatchToProps = dispatch => ({
  getProfile: id => dispatch(getUserProfile(id)),
  updateProfile: payload => dispatch(updateProfile(payload)),
  addFlashMessage: message => dispatch(addFLashMessage(message))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileContainer);