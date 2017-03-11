import { AUTH_USER } from '../actions/types'; 

export default function(state = {"authenticated":false}, action) {
	switch(action.type) {
		case AUTH_USER:
			return { ...state, authenticated:true, userId:action.payload };
	}
	return state;
}