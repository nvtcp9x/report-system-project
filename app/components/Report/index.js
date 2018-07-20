import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Button, Modal,
  ModalHeader,
  ModalBody,
  Form,
  ModalFooter, ButtonGroup, Card, CardBody, CardTitle, CardText, CardFooter
} from 'reactstrap'
import { selectMember } from "../../containers/MemberPage/selectors";
import { getMemberProfile } from "../../containers/MemberPage/actions";
import { addFLashMessage } from "../../containers/FlashMessage/actions";
import { selectUser } from "../../containers/Auth/selectors";

class Report extends Component {

  state = {
    modal: false
  }

  componentDidMount() {
    const {getMember, report, user} = this.props;
    if (user.role === 'team_leader') {
      getMember(report.userId);
    }
  }

  onSubmitForm = (e) => {
    e.preventDefault();
    const { addFlashMessage, deleteReport, report } = this.props;
    deleteReport(report.id)
    addFlashMessage({
      type: 'success',
      text: 'Delete Report Successful'
    });
  };

  toggle = () => {
    const {modal} = this.state;
    this.setState({
      modal: !modal
    });
  }

  render() {
    const {report, user, member} = this.props;

    return (
      <Fragment>
        {(user && user.role === 'member') ? (
          <Card className="mb-4" key={report.id}>
            <CardBody>
              <CardTitle>{report.id} - {report.title}</CardTitle>
              <CardText>{report.achievement}</CardText>
              <CardText>{report.comment}</CardText>
              <CardText>
                <small className="text-muted"><FontAwesomeIcon icon="calendar-alt"/>&nbsp;Date
                  created:&nbsp;&nbsp;{moment(report.date).format("dddd, MMMM Do YYYY")}
                </small>
              </CardText>
            </CardBody>
            <CardFooter>
              <ButtonGroup>
                <Button size="sm">
                  <Link
                    style={{
                      textDecoration: 'none',
                      color: '#fff'
                    }}
                    to={`/report/update/${report.id}`}
                  >
                    Edit
                  </Link>
                </Button>
                <Button
                  onClick={this.toggle}
                  size="sm"
                  color="danger"
                >
                  Delete
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Card>
        ) : (
          <Card className="mb-4" key={report.id}>
            <CardBody>
              <CardTitle>{report.id} - {report.title}</CardTitle>
              <CardText>
                <small className="text-muted">
                  <FontAwesomeIcon icon="user-tie"/>
                  &nbsp;&nbsp;Created by:&nbsp;
                  <Link to={`member/${report.userId}`}>
                    {member.firstName} {member.lastName}
                  </Link>
                </small>
              </CardText>
              <br/>
              <CardText>{report.achievement}</CardText>
              <CardText>{report.comment}</CardText>
              <CardText>
                <small className="text-muted"><FontAwesomeIcon icon="clock"/>&nbsp;Time
                  release: {moment(report.date).format("dddd, MMMM Do YYYY")}
                </small>
              </CardText>
            </CardBody>
          </Card>
        )}

        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <Form onSubmit={this.onSubmitForm}>
            <ModalHeader toggle={this.toggle}>Confirm</ModalHeader>
            <ModalBody>
              Are you sure want to delete this report?
            </ModalBody>
            <ModalFooter>
              <ButtonGroup>
                <Button
                  color="danger"
                  type="submit"
                  required
                >Delete
                </Button>
                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
              </ButtonGroup>
            </ModalFooter>
          </Form>
        </Modal>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  member: selectMember(state),
  user: selectUser(state)
});

const mapDispatchToProps = dispatch => ({
  getMember: id => dispatch(getMemberProfile(id)),
  addFlashMessage: message => dispatch(addFLashMessage(message))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Report);
