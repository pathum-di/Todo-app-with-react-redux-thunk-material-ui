import React, { Component } from "react";
import TodoFilter from "./components/todoFilter";
import TodoHeader from "./components/TodoHeader";
import TodoList from "./components/todoList";
import { withStyles } from '@material-ui/core/styles';
import { Grid } from "@material-ui/core";

const useStyles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentTab: 'allTasks'
    };
  }

  handleChange = (event, newValue) => {
    this.setState({ currentTab: newValue });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={2}>
          </Grid>
          <Grid item xs={8}>            
            <TodoHeader />
            <TodoFilter />
            <TodoList />
          </Grid>
          <Grid item xs={2}>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(useStyles)(App);
