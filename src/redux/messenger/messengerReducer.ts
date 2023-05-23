
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
    }

export const messengerReducer = (state: MessengerPageType = initialState, action: MessengerActionsType) => {
    switch (action.type) {
        case 'SEND-MESSAGE': {
            let newMessage: MessageType = {
                id: 6,
                message: action.message
            }
            if (action.message) {
                state = {
                    ...state,
                    messages: [...state.messages, newMessage]
                }
            }
            return state
        }
        default : {
            return state
        }
    }
}

type sendMessageACType = ReturnType<typeof sendMessageAC>
export const sendMessageAC = (message: string) => {
    return {
        type: 'SEND-MESSAGE',
        message
    } as const
}

// types
export type MessengerActionsType = sendMessageACType

export type MessengerPageType = {
    chats: UserType[]
    messages: MessageType[]
}
export type UserType = {
    id: number
    name: string
}

export type MessageType = {
    id: number
    message: string
}