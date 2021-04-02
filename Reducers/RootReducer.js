const initState = {
    favourites : []
}

const RootReducer = (state=initState, action) => {

    if(action.type === 'ADD_FAVOURITES') {
        return {
            ...state,
            favourites : state.favourites.concat(action.payload)
        }
    } else if(action.type === 'REMOVE_FAVOURITES') {

        let item = action.payload
        let indexToBeRemoved = null

        for(let i=0;i<state.favourites.length;i++){
            if(state.favourites[i] === item) {
                indexToBeRemoved = i
            }
        }

        state.favourites.splice(indexToBeRemoved, 1)
        
        let modifiedData = [...state.favourites]

        return {
            ...state,
            favourites : modifiedData
        }
    }

    return state
}

export default RootReducer;