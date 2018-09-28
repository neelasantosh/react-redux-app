export const nextStep = text => {
  return {
    type: 'isActive',
    payload:text
  }
}

export const addForm = formdetails =>   {
  return{
    type: "ADD_FORM",
    payload: formdetails
  }
}

export const visibleFilters = {
  SHOW_ALLSTEPS: 'SHOW_ALLSTEPS',
}
