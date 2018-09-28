const visibilityFilter = (state = 'SHOW_ALLSTEPS', action) => {
  switch (action.type) {
    case 'SHOW_STEPS':
      return action.filter
    default:
      return state
  }
}
 
export default visibilityFilter
