import React, { Component } from "react";
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import AddIcon from '@material-ui/icons/Add';
import { Fab, Paper, Typography, Tooltip } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import { createTodoItem, updateTodoItem, clearSelecteedTodoForEditing } from '../store/actions/todoList.action'

const useStyles = theme => ({
    container: {
        margin: theme.spacing(2)
    },
    title: {
        padding: theme.spacing(3)
    },
    fab: {
        left: theme.spacing(25),
    }
});

class TodoHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newTodo: this.props.selectedTaskToEditOrAdd,
        };
    }


    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.container}>
                <Typography className={classes.title} variant="h4" component="h4" align='center' >
                    ToDo App React
                    <Tooltip title="Add Todo" aria-label="add">
                        <Fab className={classes.fab} color="primary" aria-label="add">
                            <AddIcon />
                        </Fab>
                    </Tooltip>
                </Typography>
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

TodoHeader.propTypes = {
    classes: PropTypes.object.isRequired,
    selectedTaskToEditOrAdd: PropTypes.object,
    createTodoItem: PropTypes.func,
    updateTodoItem: PropTypes.func,
    clearSelecteedTodoForEditing: PropTypes.func,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(useStyles)(TodoHeader));
