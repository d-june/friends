import {RootState} from "../redux/store";

export const getUsersFilter = (state: RootState) => {
    return state.users.filter
}