import React, { Component } from 'react';
import { connect } from 'react-redux'
import isEmpty from "lodash/isEmpty";
import styled from "styled-components";
import Spinner from 'components/Spinner'
import PropTypes from 'prop-types'
import SideBar from 'components/SideBar'
import MembersList from '../../components/MembersList'
import { fetchAllMembersOfTeam, fetchAllMembers } from './actions'
import { addFlashMessage } from '../FlashMessage/actions'
import { createMessage } from '../Message/actions'
import { selectMemberLoading, selectMembers } from "./selectors";
import { selectUser } from "../Auth/selectors";
import { selectFlashMessage } from "../FlashMessage/selectors";

const Wrapper = styled.div`
  height: 100%;
  min-height: 100vh;
`;

class MemberContainer extends Component {

  static propTypes = {
    user: PropTypes.object,
    members: PropTypes.array,
    loading: PropTypes.bool,
    fetchAllMembersOfTeam: PropTypes.func,
    fetchAllMembers: PropTypes.func,
    createMessage: PropTypes.func,
    addFlashMessage: PropTypes.func,
  }

  componentDidMount() {
    const {fetchAllMembersOfTeam, fetchAllMembers, user} = this.props;
    if (user && (user.role === 'team_leader')) {
      fetchAllMembersOfTeam(user.division);
    }

    if (user && (user.role === 'group_leader')) {
      fetchAllMembers();
    }
  }

  render() {
    const {members, loading, createMessage, addFlashMessage, user} = this.props;
    return (
      <Wrapper>
        <div className="row">
          <div className="col-md-3">
            <SideBar/>
          </div>
          <div className="col-md-9">
            {loading && isEmpty(members) ? (
              <Spinner height="650px" style={{fontSize: 32, color: '#FFFFFF'}} />
            ) : (
              <MembersList
                user={user}
                createMessage={createMessage}
                addFlashMessage={addFlashMessage}
                membersList={members}
              />
            )}
          </div>
        </div>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => ({
  members: selectMembers(state),
  user: selectUser(state),
  loading: selectMemberLoading(state),
  messages: selectFlashMessage(state)
});

export default connect(
  mapStateToProps,
  {fetchAllMembersOfTeam, fetchAllMembers, createMessage, addFlashMessage}
)(MemberContainer);
