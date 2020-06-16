import { combineReducers, bindActionCreators } from 'redux';

const getAllLights = (getAllLights = null, action) => {
    if ( action.type === 'GET_ALL_LIGHTS') {
        //const lights = getAllLights;
        return action.payload;
    }
    return getAllLights;
    
}

export default combineReducers({
    allLights: getAllLights
});