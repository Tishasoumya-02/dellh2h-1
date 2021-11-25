import {
    SAVE_MESSAGE,
} from '../_actions/types';

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = {messages:[]}, action) {
    switch (action.type) {
        case SAVE_MESSAGE:
            return {
                ...state,
                messages: state.messages.concat(action.payload)
            }
        default:
            return state;
    }
}