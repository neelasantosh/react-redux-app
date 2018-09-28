const formsReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_FORM":
      // return [{...state[0], ...action.payload}]
      console.log({...state, ...action.payload});
      return {...state, ...action.payload}
    default:
      return state;
  }
};

export default formsReducer;
