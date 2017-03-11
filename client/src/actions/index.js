import axios from 'axios';
import { RESTAURANTS_LIST, AUTH_USER, CHANGE_NO_OF_PEOPLE_GOING, ERROR_REQUEST } from './types';
import { GET_RESTAURANTS_DATA_URI, GENERATE_TWITTER_TOKEN, GET_TWITTER_OAUTH_TOKEN, CHANGE_HOTEL_VISITS } from './uris';
import { TOKEN_KEY } from './constants';
 
export function getRestaurantsList(location) {
    return function(dispatch) {
        dispatch({ type:RESTAURANTS_LIST , payload:[]});
        axios.get(`${GET_RESTAURANTS_DATA_URI}/${location}`)
            .then(response => {
                if(response.data.error) {
                    dispatch({ type:ERROR_REQUEST, payload:response.data })
                } else {
                    dispatch({ type:RESTAURANTS_LIST , payload:response.data});
                }
            })
            .catch(() => {
				//TODO
			});
    }
}

export function signInUser() {
    return function(dispatch) {
		window.open(GENERATE_TWITTER_TOKEN,"_blank", 'width=600,height=600');
		axios.get(GET_TWITTER_OAUTH_TOKEN)
			.then(response => {
				dispatch({ type:AUTH_USER, payload: response.data.user_id });
				localStorage.setItem(TOKEN_KEY,JSON.stringify(response.data));
			})
			.catch(() => {
				//TODO
			});
	}
}

export function changeNumberOfPeopleGoing(hotel) {
    const twitterTokenData = JSON.parse(localStorage.getItem(TOKEN_KEY));
    const userId = twitterTokenData["user_id"];
    const oauth_token = twitterTokenData["oauth_token"];
    const oauth_token_secret = twitterTokenData["oauth_token_secret"];
    
    return function(dispatch) {
        dispatch({type:CHANGE_NO_OF_PEOPLE_GOING, payload: {"hotel":hotel, "user":userId}});
        axios.post(CHANGE_HOTEL_VISITS, 
             {"userId":userId, 
              "hotelId":hotel.id, 
              "oauth_token":oauth_token, 
              "oauth_token_secret":oauth_token_secret 
             })
            .then(response => {
                return;
            })
            .catch(() => {
				//TODO
			});
        }
}