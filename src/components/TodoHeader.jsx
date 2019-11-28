import React, { Component } from "react";
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import AddIcon from '@material-ui/icons/Add';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { Fab, Paper, Typography, Tooltip, Dialog, DialogTitle, DialogContent, IconButton } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import { clearSelecteedTodoForEditing } from '../store/actions/todoList.action'
import AddOrEditTodoItem from "./addOrEditTodoItem";

const useStyles = theme => ({
    container: {
        margin: theme.spacing(2)
    },
    title: {
        padding: theme.spacing(3)
    },
    fab: {
        left: theme.spacing(25),
    },
    modelClose: {
        left: theme.spacing(10),
    }
});

class TodoHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newTodo: this.props.selectedTaskToEditOrAdd,
            isOpenAddTodoModel: false,
        };
    }

    handleAddTodoModelClickOpen = () => {
        this.props.clearSelecteedTodoForEditing();
        this.setState({ isOpenAddTodoModel: true });
    };

    handleAddTodoModelClose = () => {
        this.setState({ isOpenAddTodoModel: false });
    };

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <Paper className={classes.container}>
                    <Typography className={classes.title} variant="h4" component="h4" align='center' >
                        ToDo App React
                    <Tooltip title="Add Todo" aria-label="add">
                            <Fab className={classes.fab} color="primary" aria-label="add" onClick={this.handleAddTodoModelClickOpen}>
                                <AddIcon />
                            </Fab>
                        </Tooltip>
                    </Typography>
                </Paper>

                <Dialog open={this.state.isOpenAddTodoModel}
                    onClose={this.handleAddTodoModelClose}
                    aria-labelledby="form-dialog-title"
                    maxWidth={'md'}>
                    <DialogTitle id="form-dialog-title">{'Add Todo Item'}
                        <IconButton className={classes.modelClose} onClick={this.handleAddTodoModelClose} color="secondary">
                            <HighlightOffIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent>
                        <AddOrEditTodoItem />
                    </DialogContent>
                </Dialog>
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
        clearSelecteedTodoForEditing: () => {
            dispatch(clearSelecteedTodoForEditing());
        },
    }
};

TodoHeader.propTypes = {
    classes: PropTypes.object.isRequired,
    selectedTaskToEditOrAdd: PropTypes.object,
    clearSelecteedTodoForEditing: PropTypes.func,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(useStyles)(TodoHeader));
