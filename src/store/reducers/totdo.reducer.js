

const todos = (
  state = {
    doneList: [],
    pendingList: [],
    selectedTabName: 'allTasks',
    selectedTaskToEditOrAdd: { id: 0, task: '', },
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

    default:
      return state
  }
}

const getFilteredList = (actionDataList) => {
  const doneList = actionDataList.filter(todo => todo.status === 1);
  const pendingList = actionDataList.filter(todo => todo.status === 0);
  return { doneList, pendingList }
}

export default todos