const authStatus = (state = false, action) => {
    if (action.type === "UPDATE_AUTH") {
        state = action.status;
       
        return state
    }
    else {
        return state
    }

}

export default authStatus;