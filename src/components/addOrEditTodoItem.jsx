import React, { Component } from "react";
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { TextField, Button } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import { createTodoItem, updateTodoItem, clearSelecteedTodoForEditing } from '../store/actions/todoList.action'

const useStyles = theme => ({

    button: {
        margin: theme.spacing(3)
    },
    actionButtonGroup: {
        alignContent: 'center',
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

    handleAddOrEditTodoItem = () => {

        const { newTodo } = this.state;

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
    
    handleResetSelectedTodoItem = () => {
        this.setState({ newTodo: this.props.selectedTaskToEditOrAdd })
    }

    render() {
        const { classes } = this.props;
        const selectedId = this.props.selectedTaskToEditOrAdd.id;

        return (
            <React.Fragment>
                <TextField
                    fullWidth
                    id="outlined-basic"
                    label={selectedId ? 'Edit Todo Item' : 'Add Todo Item'}
                    margin="normal"
                    variant="outlined"
                    value={this.state.newTodo.task}
                    onChange={this.handleInputChange} />
                <div className={classes.actionButtonGroup}>
                    <Button className={classes.button} variant="outlined" color="secondary" onClick={this.handleResetSelectedTodoItem}> Reset </Button>
                    <Button className={classes.button} variant="outlined" color="primary" onClick={this.handleAddOrEditTodoItem}> {selectedId ? 'Edit' : 'Save'} </Button>
                </div>
            </React.Fragment>
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
