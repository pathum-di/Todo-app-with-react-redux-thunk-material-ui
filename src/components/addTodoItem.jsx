import React, { Component } from "react";
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { TextField, Button, Paper, Grid, Typography } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import { createTodoItem, updateTodoItem, clearSelecteedTodoForEditing } from './../store/actions/todoList.action'

const useStyles = theme => ({
    container: {
        margin: theme.spacing(2)
    },
    button: {
        margin: theme.spacing(3)
    },
    title: {
        padding: theme.spacing(3)
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
});

class AddTodoItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newTodo: this.props.selectedTaskToEditOrAdd,
        };
    }

    static getDerivedStateFromProps(props, state) {
        if (state.newTodo.id !== props.selectedTaskToEditOrAdd.id) {
            return { newTodo: props.selectedTaskToEditOrAdd };
        }
        else {
            return null;
        }
    }

    handleInputChange = (event) => {
        this.setState({
            newTodo: {
                ...this.state.newTodo,
                task: event.target.value
            }
        });
    };

    handleAddTodoItem = () => {

        const { newTodo } = this.state

        if (newTodo.id === 0 && newTodo.task !== '') {
            this.props.createTodoItem(newTodo);
        }
        else if (newTodo.id > 0 && newTodo.task !== '') {
            this.props.updateTodoItem(newTodo);
        }
        else {
            console.log('please enter task ');
        }
        this.setState({
            newTodo: { id: 0, task: '', }
        })
        this.props.clearSelecteedTodoForEditing();

    }

    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.container}>
                <Typography className={classes.title} variant="h4" component="h4" align='center' >
                    ToDo App React
                </Typography>
                <Grid container>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            className={classes.textField}
                            id="outlined-basic"
                            label="Add Todo"
                            margin="normal"
                            variant="outlined"
                            value={this.state.newTodo.task}
                            onChange={this.handleInputChange} />
                    </Grid>
                    <Grid item xs={2} >
                        <Button className={classes.button} color="primary" onClick={this.handleAddTodoItem}>
                            Save
                        </Button>
                    </Grid>
                    <Grid item xs={2}></Grid>
                </Grid>
            </Paper>
        );
    }
}

const mapStateToProps = state => {
    return {
        selectedTaskToEditOrAdd: state.todos.selectedTaskToEditOrAdd,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createTodoItem: (todoItem) => {
            dispatch(createTodoItem(todoItem));
        },
        updateTodoItem: (todoItem) => {
            dispatch(updateTodoItem(todoItem));
        },
        clearSelecteedTodoForEditing: () => {
            dispatch(clearSelecteedTodoForEditing());
        },
    }
};

AddTodoItem.propTypes = {
    classes: PropTypes.object.isRequired,
    selectedTaskToEditOrAdd: PropTypes.object,
    createTodoItem: PropTypes.func,
    updateTodoItem: PropTypes.func,
    clearSelecteedTodoForEditing: PropTypes.func,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(useStyles)(AddTodoItem));
