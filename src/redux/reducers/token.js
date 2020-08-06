const token = (state =null, action) => {
    if (action.type === "UPDATE_TOKEN") {
        state=action.token;
        return state
    } 
    else {
        return state
    }

}

export default token;