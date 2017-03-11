import { RESTAURANTS_LIST, CHANGE_NO_OF_PEOPLE_GOING, ERROR_REQUEST } from '../actions/types';

export default function(state={}, action) {
    switch(action.type) {
        case RESTAURANTS_LIST:
            return { ...state, restaurantsList:action.payload, error:null};
        case CHANGE_NO_OF_PEOPLE_GOING:
            const restaurantsList = state.restaurantsList.map((hotel) => {
                if(hotel.id == action.payload.hotel.id) {
                    if(hotel.peopleInterested.indexOf(action.payload.user) > -1) {
                        hotel.noOfPeopleGoing = hotel.noOfPeopleGoing - 1;
                        hotel.peopleInterested = hotel.peopleInterested.filter((user) => {
                            return user !== action.payload.user;
                        })
                    } else {
                        hotel.noOfPeopleGoing = hotel.noOfPeopleGoing + 1;
                        hotel.peopleInterested = [...hotel.peopleInterested, action.payload.user]
                    }
                }
                return hotel;
            })
            return { ...state, restaurantsList:restaurantsList, error:null};
        case ERROR_REQUEST:
            return {...state, error:action.payload.error}
    }
    return state;
}