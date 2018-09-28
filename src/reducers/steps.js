const initialState = {
  isActive: 'login'
};

const steps = (state = initialState, action) => {
  switch (action.type) {
    case 'isActive':
      return {isActive:action.payload}
    default:
      return state
  }
}
 
export default steps
