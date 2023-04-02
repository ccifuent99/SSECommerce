import axios from 'axios';

const lineitems = (state = [], action) => {
    if(action.type === 'GET_LINEITEMS') {
       return action.lineitems
    }
    return state
}

export const getLineItems = (lineitems)=> {
    return async(dispatch)=> {
        const response = await axios.get(`/api/lineitems`)
        dispatch({type: 'GET_LINEITEMS', lineitems: response.data})
    }
}

export default lineitems