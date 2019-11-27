import React, { Component } from "react";
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { Paper, TextField } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import { createTodoItem, updateTodoItem, clearSelecteedTodoForEditing } from '../store/actions/todoList.action'

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
    }
});

class AddOrEditTodoItem extends Component {
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
                <TextField
                    fullWidth
                    className={classes.textField}
                    id="outlined-basic"
                    label="Add Todo"
                    margin="normal"
                    variant="outlined"
                    value={this.state.newTodo.task}
                    onChange={this.handleInputChange} />
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

AddOrEditTodoItem.propTypes = {
    classes: PropTypes.object.isRequired,
    selectedTaskToEditOrAdd: PropTypes.object,
    createTodoItem: PropTypes.func,
    updateTodoItem: PropTypes.func,
    clearSelecteedTodoForEditing: PropTypes.func,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(useStyles)(AddOrEditTodoItem));
