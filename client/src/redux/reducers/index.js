import { combineReducers, bindActionCreators } from 'redux';

const createClient = (client = null, action) => {
    if (action.type === 'CREATE_CLIENT') {
        return action.payload
    }
    return client;
}
const getAllLights = (getAllLights = null, action) => {
    if ( action.type === 'GET_ALL_LIGHTS') {
        //const lights = getAllLights;
        return action.payload;
    }
    return getAllLights;
    
}
const getAllGroupsReducer = (getAllGroups = null, action) => {
    if (action.type === 'GET_ALL_GROUPS') {
        return action.payload;
    }
    return getAllGroups;
}

export default combineReducers({
    client: createClient,
    allLights: getAllLights,
    allGroups: getAllGroupsReducer
});