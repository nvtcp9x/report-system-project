import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardActions } from '@material-ui/core'
import DatePickerComponent from "../DateTimePicker/DatePickerComponent";
import RangePickerComponent from "../DateTimePicker/RangePickerComponent";

const styles = {
  card: {
    minWidth: 275,
    borderRadius: 0,
    display: 'flex'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {},
  pos: {
    marginBottom: 12,
  },
};

class FilterReport extends Component {
  render() {
    const {classes} = this.props;
    const {
      fetchAllReportsOfUserByRange,
      fetchAllReportsOfUserByDay,

      fetchAllReportsOfTeamByDay,
      fetchAllReportsOfTeamByRange,
      user
    } = this.props;
    return (
      <Card className={classes.card}>
        <CardActions>
          <DatePickerComponent
            user={user}
            fetchAllReportsOfUserByDay={fetchAllReportsOfUserByDay}
            fetchAllReportsOfTeamByDay={fetchAllReportsOfTeamByDay}
          />
        </CardActions>
        <CardActions>
          <RangePickerComponent
            user={user}
            fetchAllReportsOfUserByRange={fetchAllReportsOfUserByRange}
            fetchAllReportsOfTeamByRange={fetchAllReportsOfTeamByRange}
          />
        </CardActions>
      </Card>
    );
  }
}

FilterReport.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FilterReport);