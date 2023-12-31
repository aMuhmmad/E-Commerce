import { AnyAction } from "redux";
import { UserData } from "../../utils/firebase/firebase.utils";
import { USER_ACTION_TYPES } from "./user.types";
import { signInFailed, signInSuccess, signOutFailed, signOutSuccess, signUpFailed } from "./user.action";

export type UserState = {
    readonly currentUser: UserData | null;
    readonly isLoading: boolean;
    readonly error: Error | null;

}

const USER_INITIAL_STATE = {
    currentUser: null,
    isLoading: false,
    error: null
}

export const userReducer = (state = USER_INITIAL_STATE, action: AnyAction) => {

    if (signInSuccess.match(action)) {
        return {
            ...state,
            currentUser: action.payload
        };
    }

    if (signOutSuccess.match(action)) {
        return {
            ...state,
            currentUser: null
        };
    }

    if (signUpFailed.match(action) || signInFailed.match(action) || signOutFailed.match(action)) {
        return { ...state, error: action.payload };
    }


    return state;

}