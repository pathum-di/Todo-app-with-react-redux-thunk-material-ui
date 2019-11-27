import React, { Component } from "react";
import { connect } from 'react-redux';
import { Paper, Button, Tooltip, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Avatar, IconButton, Dialog, DialogActions, DialogTitle } from "@material-ui/core";
import moment from "moment";
import PropTypes from "prop-types";
import AcUnitIcon from '@material-ui/icons/AcUnit';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { withStyles } from '@material-ui/core/styles';
import { getAllTodoItems, toggleTodoItem, deleteTodoItem, setSelectedTodoForEditing, handleDeleteModelClose } from './../store/actions/todoList.action'
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';


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
    listItemDone: {
        backgroundColor: 'rgba(203, 249, 190, 0.87)'
    },
    listItemPending: {
        backgroundColor: 'rgba(238, 199, 184, 0.87);'
    }
});

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenDeleteConfirmModel: false,
            selectedTodoItemForDeleting: {}
        };
    }

    componentDidMount() {
        this.props.getAllTodoItems();
    }

    handleClickOpen = (todoItem) => {
        this.props.handleDeleteModelClose();
        this.setState({ selectedTodoItemForDeleting: todoItem });
    };

    handleDeleteConfirm = () => {
        this.props.deleteTodoItem(this.state.selectedTodoItemForDeleting.id);
    };

    get getTodoListDataForSelecetedTab() {

        const { selectedTabName, doneList, pendingList, allItemList } = this.props;

        if (selectedTabName === 'allTasks') {
            return allItemList;
        }
        else if (selectedTabName === 'completedTasks') {
            return doneList;
        }
        else {
            return pendingList;
        }
    }

    setSelectedTodoForEditing(todoItem) {
        // console.log('todoItem to edit :', todoItem);
        this.props.setSelectedTodoForEditing(todoItem)
    }

    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.paper}>
                <List>
                    {this.getTodoListDataForSelecetedTab.map((todoItem) => {
                        return (
                            <ListItem key={todoItem.id} button className={todoItem.status ? classes.listItemDone : classes.listItemPending}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <AcUnitIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={todoItem.task}
                                    secondary={'Created at : ' + moment(todoItem.created_at).format('DD-MM-YYYY')}
                                />
                                <ListItemSecondaryAction>
                                    <Tooltip title={todoItem.status === 0 ? 'Mark as Completed' : 'Mark as Pending'} placement="top">
                                        <IconButton edge="end" aria-label="markAsFinishOrPending" onClick={() => { this.props.toggleTodoItem(todoItem) }}>
                                            {todoItem.status === 0 ?
                                                <DoneIcon /> :
                                                <CloseIcon />}
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Edit Todo" placement="top">
                                        <IconButton edge="end" aria-label="edit" onClick={() => this.setSelectedTodoForEditing(todoItem)}>
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete Todo" placement="top">
                                        <IconButton edge="end" aria-label="delete" onClick={() => { this.handleClickOpen(todoItem) }}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                </ListItemSecondaryAction>
                            </ListItem>
                        )
                    })}
                </List>

                <Dialog
                    open={this.props.isOpenDeleteModel}
                    onClose={this.props.handleDeleteModelClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Sure about Deleting Todo Item?"}</DialogTitle>
                    <DialogActions>
                        <Button onClick={this.props.handleDeleteModelClose} color="primary">No</Button>
                        <Button onClick={this.handleDeleteConfirm} color="primary" autoFocus>YES</Button>
                    </DialogActions>
                </Dialog>
            </Paper>);
    }
}

const mapStateToProps = state => {
    return {
        doneList: state.todos.doneList,
        pendingList: state.todos.pendingList,
        allItemList: [...state.todos.pendingList, ...state.todos.doneList],
        selectedTabName: state.todos.selectedTabName,
        isOpenDeleteModel: state.todos.isOpenDeleteModel,
    };
}
const mapDispatchToProps = dispatch => {
    return {
        getAllTodoItems: () => {
            dispatch(getAllTodoItems());
        },
        toggleTodoItem: (todoItem) => {
            dispatch(toggleTodoItem(todoItem));
        },
        deleteTodoItem: (todoItemId) => {
            dispatch(deleteTodoItem(todoItemId));
        },
        setSelectedTodoForEditing: (todoItemId) => {
            dispatch(setSelectedTodoForEditing(todoItemId));
        },
        handleDeleteModelClose: () => {
            dispatch(handleDeleteModelClose());
        },
    }
};

TodoList.propTypes = {
    classes: PropTypes.object.isRequired,
    doneList: PropTypes.array,
    pendingList: PropTypes.array,
    allItemList: PropTypes.array,
    selectedTabName: PropTypes.string,
    getAllTodoItems: PropTypes.func,
    toggleTodoItem: PropTypes.func,
    deleteTodoItem: PropTypes.func,
    setSelectedTodoForEditing: PropTypes.func,
    handleDeleteModelClose: PropTypes.func,
    isOpenDeleteModel: PropTypes.bool,
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(useStyles)(TodoList));
