

const todos = (
  state = {
    doneList: [],
    pendingList: [],
    selectedTabName: 'allTasks',
    selectedTaskToEditOrAdd: { id: 0, task: '', },
    isOpenDeleteModel: false,
  }, action) => {
  switch (action.type) {

    case 'GET_ALL_TODOS':
      const filteredLists = getFilteredList(action.todoitemList)
      return {
        ...state,
        ...filteredLists
      };

    case 'SET_TAB_NAME':
      return {
        ...state,
        selectedTabName: action.tabName
      };

    case 'SET_SELECTED_TODO_FOR_EDITING':
      return {
        ...state,
        selectedTaskToEditOrAdd: action.todoItem
      };

    case 'CLEAR_SELECTED_TODO_FOR_EDITING':
      return {
        ...state,
        selectedTaskToEditOrAdd: { id: 0, task: '', }
      };

    case 'HANDLE_DELETE_MODEL_CLOSE':
      return {
        ...state,
        isOpenDeleteModel: !state.isOpenDeleteModel,
      };

    default:
      return state
  }
}

const getFilteredList = (actionDataList) => {
  let doneList = [];
  let pendingList = [];
  actionDataList.forEach(todoItem => {
    if (todoItem.status === 1) {
      doneList.push(todoItem);
    } else {
      pendingList.push(todoItem);
    }
  });
  return { doneList, pendingList }
}

export default todos