import {
    messengerReducer,
    sendMessageAC,
    MessengerPageType,
} from './messengerReducer';

describe('messengerReducer', () => {
    let initialState: MessengerPageType;

    beforeEach(() => {
        initialState = {
            chats: [
                { id: 1, name: 'Dimych' },
                { id: 2, name: 'Leha' },
                { id: 3, name: 'Viktor' },
                { id: 4, name: 'Gulnaz' },
                { id: 5, name: 'Igor' },
            ],
            messages: [
                { id: 1, message: 'Hi, how are you' },
                { id: 2, message: 'Hi, nice' },
                { id: 3, message: 'Good' },
                { id: 4, message: 'Nice' },
                { id: 5, message: 'yo' },
            ],
        };
    });

    it('should add a new message to the state when SEND-MESSAGE action is dispatched', () => {
        const message = 'Hello!';
        const action = sendMessageAC(message);

        const newState = messengerReducer(initialState, action);

        expect(newState.messages.length).toBe(initialState.messages.length + 1);
        expect(newState.messages[newState.messages.length - 1]).toEqual({
            id: 6,
            message: message,
        });
    });

    it('should not add a new message to the state when SEND-MESSAGE action is dispatched with an empty message', () => {
        const emptyMessage = '';
        const action = sendMessageAC(emptyMessage);

        const newState = messengerReducer(initialState, action);

        expect(newState.messages.length).toBe(initialState.messages.length);
    });
});