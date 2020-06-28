import reducerAuthor from './reducerAuthor'
import reducerGenre from './reducerGenre'
import reducerUser from './reducerUser'
import reducerBorrow from './reducerBorrow'
import reducerBook from './reducerBooks'
import { combineReducers } from 'redux'

const allReducers= combineReducers({
    reducerAuthor,
    reducerGenre,
    reducerUser,
    reducerBorrow,
    reducerBook
})

export default allReducers