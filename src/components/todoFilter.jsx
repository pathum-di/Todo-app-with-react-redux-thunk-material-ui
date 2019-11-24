import React, { Component } from "react";
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { Tabs, Tab, Paper } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import { setSelectedTabName, getAllTodoItems } from './../store/actions/todoList.action'

const useStyles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin: theme.spacing(2)
  },
});

class TodoFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange = (event, newValue) => {
    this.props.setSelectedTabName(newValue);
    this.props.getAllTodoItems();
  };

  render() {
    const { classes, selectedTabName } = this.props;
    return (
      <Paper className={classes.paper}>
        <Tabs
          value={selectedTabName}
          name="mainToggle"
          indicatorColor="primary"
          textColor="primary"
          onChange={this.handleChange}
          centered
        >
          <Tab label="All Tasks" value="allTasks" />
          <Tab label="Completed Tasks" value="completedTasks" />
          <Tab label="Remaining Tasks" value="remainingTasks" />
        </Tabs>
      </Paper>);
  }
}

const mapStateToProps = state => {
  return {
    selectedTabName: state.todos.selectedTabName,
  };
}
const mapDispatchToProps = dispatch => {
  return {
    setSelectedTabName: (selectedTabName) => {
      dispatch(setSelectedTabName(selectedTabName));
    },
    getAllTodoItems: () => {
      dispatch(getAllTodoItems());
    }
  }
};


TodoFilter.prototypes = {
  classes: PropTypes.object.isRequired,
  selectedTabName: PropTypes.string,
  setSelectedTabName: PropTypes.func,
  getAllTodoItems: PropTypes.func,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(TodoFilter));
