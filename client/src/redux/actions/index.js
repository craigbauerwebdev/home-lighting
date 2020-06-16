/* export const getAllLights = () => {
    return async (dispatch, getState) => {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        dispatch({
            type: "GET_ALL_LIGHTS",
            payload: response
        });
    }
    //.then(response => response.json())
    //.then(data => console.log(data)); 
} */

export const getAllLights77 = (client) => async (dispatch, getState) => {
    // get all lights
    // dispatch the response
    console.log(client);
    const response = await client.lights.getAll();
    dispatch({
        type: "GET_ALL_LIGHTS",
        payload: response
    });
}