import {MessagePropsType, MessengerPageType} from "redux/store";

let initialState = {
        chats: [
            {id: 1, name: 'Dimych'},
            {id: 2, name: 'Leha'},
            {id: 3, name: 'Viktor'},
            {id: 4, name: 'Gulnaz'},
            {id: 5, name: 'Igor'},
        ],
        messages: [
            {id: 1, message: 'Hi, how are you'},
            {id: 2, message: 'Hi, nice'},
            {id: 3, message: 'Good'},
            {id: 4, message: 'Nice'},
            {id: 5, message: 'yo'},
        ],
        newMessageText: '',
    }

export const messengerReducer = (state: MessengerPageType = initialState, action: MessengerActionsType) => {
    switch (action.type) {
        case 'SEND-MESSAGE': {
            let newMessage: MessagePropsType = {
                id: 6,
                message: state.newMessageText
            }
            if (state.newMessageText) {
                state = {
                    ...state,
                    messages: [...state.messages, newMessage]
                }
            }
            state.newMessageText = ''
            return state
        }
        case 'ON-CHANGE-NEW-MESSAGE-TEXT': {
            return state = {...state, newMessageText: action.newMessageText}
        }
        default : {
            return state
        }
    }
}

type onChangeNewMessageTextACType = ReturnType<typeof onChangeNewMessageTextAC>
export const onChangeNewMessageTextAC = (newMessageText: string) => {
    return {
        type: 'ON-CHANGE-NEW-MESSAGE-TEXT',
        newMessageText
    } as const
}
type sendMessageACType = ReturnType<typeof sendMessageAC>
export const sendMessageAC = () => {
    return {
        type: 'SEND-MESSAGE'
    } as const
}

export type MessengerActionsType = onChangeNewMessageTextACType | sendMessageACType

