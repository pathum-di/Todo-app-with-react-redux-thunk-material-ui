export const createTodoItem = (todoItem) => {

    const data = {
        task: todoItem.task
    }
    return async dispatch => {

        fetch('http://localhost:8080/todo', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())

            .then(result => {
                if (result.success) {
                    dispatch(getAllTodoItems());
                }
                else {
                    console.log('an error occured in create todo', result.message);
                }
            })
            .catch(error => {
                console.error("createTodoItem ", error);
            });
    }
}

export const getAllTodoItems = () => {
    const url = 'http://localhost:8080/todos/';
    return async dispatch => {
        await fetch(url)
            .then(res => { return res.json() })
            .then(result => {
                if (result.success) {
                    dispatch(setTodoItemLists(result.data));

                } else {
                    console.log('an error occured ', result.message);
                }
            })
            .catch(error => {
                console.error("getAllTodoItems ", error);
            });
    }
}

export const toggleTodoItem = (todoItem) => {

    const data = {
        task_id: todoItem.id,
        status: todoItem.status ? 0 : 1
    }
    return async dispatch => {

        fetch('http://localhost:8080/toggle/todo', {
            method: 'put',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())

            .then(result => {
                if (result.success) {
                    dispatch(getAllTodoItems());
                }
                else {
                    console.log('an error occured in toggle todo', result.message);
                }
            })
            .catch(error => {
                console.error("toggleTodoItem ", error);
            });
    }
}

export const updateTodoItem = (todoItem) => {

    const data = {
        task_id: todoItem.id,
        task: todoItem.task
    }
    return async dispatch => {

        fetch('http://localhost:8080/todo', {
            method: 'put',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())

            .then(result => {
                if (result.success) {
                    dispatch(getAllTodoItems());
                }
                else {
                    console.log('an error occured in update todo', result.message);
                }
            })
            .catch(error => {
                console.error("updateTodoItem ", error);
            });
    }
}

export const deleteTodoItem = (todoItemId) => {

    return async dispatch => {

        fetch(`http://localhost:8080/todo/${todoItemId}`, {
            method: 'delete',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())

            .then(result => {
                if (result.success) {
                    dispatch(getAllTodoItems());
                }
                else {
                    console.log('an error occured in delte todo', result.message);
                }
            })
            .catch(error => {
                console.error("deleteTodoItem ", error);
            });
    }
}

const setTodoItemLists = (todoitemList) => {
    return {
        type: 'GET_ALL_TODOS',
        todoitemList
    };
}

export const setSelectedTodoForEditing = (todoItem) => {
    return {
        type: 'SET_SELECTED_TODO_FOR_EDITING',
        todoItem
    }
}

export const setSelectedTabName = (tabName) => {
    return {
        type: 'SET_TAB_NAME',
        tabName
    };
}

export const clearSelecteedTodoForEditing = () => {
    return {
        type: 'CLEAR_SELECTED_TODO_FOR_EDITING',
    };
}
