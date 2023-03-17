import {chatAPI, ChatMessageAPIType, StatusType} from "../api/chat-api";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

let initialState = {
    messages: [] as ChatMessageAPIType[],
    status: 'pending' as StatusType
}

const chatSlice = createSlice({
    name: 'chat',
    initialState: initialState,
    reducers: {
        messagesReceived(state, action) {
            state.messages = []
            state.messages = [...state.messages, ...action.payload]
        },
        statusChanged(state, action) {
            state.status = action.payload
        }
    }
})
export const {messagesReceived, statusChanged} = chatSlice.actions



let _newMessageHandler: ((messages: ChatMessageAPIType[]) => void) | null = null


// @ts-ignore
const newMessageHandlerCreator = (dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(messagesReceived(messages))
        }
    }
    return _newMessageHandler
}

let _statusChangedHandler: ((status: StatusType) => void) | null = null
// @ts-ignore
const statusChangedHandlerCreator = (dispatch) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status) => {
            dispatch(statusChanged(status))
        }
    }
    return _statusChangedHandler
}

export const startMessagesListening = createAsyncThunk (
    'startMessagesListening',
    function ( _, {dispatch}) {
        chatAPI.start()
        chatAPI.subscribe('messages-received', newMessageHandlerCreator(dispatch))
        chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch))
    }
)

export const stopMessagesListening = createAsyncThunk (
    'stopMessagesListening',
    function ( _, {dispatch}) {
        chatAPI.unsubscribe('messages-received', newMessageHandlerCreator(dispatch))
        chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch))
        chatAPI.stop()
    }
)

export const sendMessage = createAsyncThunk (
    'sendMessage',
    function (message: string, {dispatch}) {
        chatAPI.sendMessage(message)
    }
)


export default chatSlice.reducer;