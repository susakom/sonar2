import {
    DELETE_ORGANIZER_FROM_SELECTED,
    SET_SELECTED_ORGANIZERS
} from '../actions/events/events-filter';

const initialState = {
    organizers: [],
    selectedOrganizers: []
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SELECTED_ORGANIZERS:
            return {
                ...state,
                selectedOrganizers: action.payload
            };
        case DELETE_ORGANIZER_FROM_SELECTED:
            return {
                ...state,
                selectedOrganizers: state.selectedOrganizers.filter(
                    organizer => organizer.name !== action.payload.name)
            };
        default:
            return state;
    }
};
