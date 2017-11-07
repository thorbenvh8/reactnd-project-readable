import {
  LOAD_CATEGORIES
} from '../actions/categories'


const initialCategoriesState = []

function categories(state = initialCategoriesState, action) {
  switch (action.type) {
    case LOAD_CATEGORIES :
      const { categories } = action
      return categories
    default :
      return state
  }
}

export default categories
