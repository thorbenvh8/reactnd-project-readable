import {
  LOAD_CATEGORIES
} from '../actions/categories'


const initialCategoriesState = {
  list: []
}

function categories(state = initialCategoriesState, action) {
  switch (action.type) {
    case LOAD_CATEGORIES :
      const { list } = action
      return {
        ...state,
        ...categories,
        list
      }
    default :
      return state
  }
}

export default categories
