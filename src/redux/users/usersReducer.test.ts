import {
    usersReducer,
    setUsersAC,
    setPageAC,
    setLoadingAC,
    setProgressAC,
    UsersActionsType,
    UsersPageType, UserDomainType, setIsFollowUserAC
} from './usersReducer';

describe('usersReducer', () => {
    let initialState: UsersPageType;

    beforeEach(() => {
        initialState = {
            items: [] as UserDomainType[],
            totalCount: 0,
            error: null,
            pageSize: 20,
            currentPage: 100,
            isLoading: true,
        };
    });

    it('should update the state correctly when FOLLOW action is dispatched', () => {
        const userId = 123;
        const action = setIsFollowUserAC(userId, false);
        const user = {
            name: 'Joe',
            id: userId,
            photos: {
                small:  null,
                large:  null
            },
            status: null,
            followed: false,
            inProgress: false
        };
        const state = {
            ...initialState,
            items: [user],
        };

        const newState = usersReducer(state, action);

        expect(newState.items.length).toBe(1);
        expect(newState.items[0].followed).toBe(true);
    });

    it('should update the state correctly when UNFOLLOW action is dispatched', () => {
        const userId = 123;
        const action = setIsFollowUserAC(userId, true);
        const user = {
            name: 'Joe',
            id: userId,
            photos: {
                small:  null,
                large:  null
            },
            status: null,
            followed: false,
            inProgress: false
        };
        const state = {
            ...initialState,
            items: [user],
        };

        const newState = usersReducer(state, action);

        expect(newState.items.length).toBe(1);
        expect(newState.items[0].followed).toBe(false);
    });

    it('should update the state correctly when SET-USERS action is dispatched', () => {
        const users = [
            {
                id: 1,
                name: 'John',
                photos: {
                    small: null,
                    large: null,
                },
                status: null,
                followed: false,
                inProgress: false,
            },
        ];
        const totalCount = 1;
        const action = setUsersAC({
            items: users,
            totalCount: totalCount,
            error: null,
        });

        const newState = usersReducer(initialState, action);

        expect(newState.items.length).toBe(1);
        expect(newState.items[0].id).toBe(1);
        expect(newState.totalCount).toBe(totalCount);
    });

    it('should update the state correctly when SET-PAGE action is dispatched', () => {
        const page = 2;
        const action = setPageAC(page);

        const newState = usersReducer(initialState, action);

        expect(newState.currentPage).toBe(page);
    });

    it('should update the state correctly when SET-LOADING action is dispatched', () => {
        const isLoading = false;
        const action = setLoadingAC(isLoading);

        const newState = usersReducer(initialState, action);

        expect(newState.isLoading).toBe(isLoading);
    });

    it('should update the state correctly when SET-PROGRESS action is dispatched', () => {
        const userId = 123;
        const inProgress = true;
        const action = setProgressAC(userId, inProgress);
        const user = {
            name: 'Joe',
            id: userId,
            photos: {
                small:  null,
                large:  null
            },
            status: null,
            followed: false,
            inProgress: false
        };
        const state = {
            ...initialState,
            items: [user],
        };

        const newState = usersReducer(state, action);

        expect(newState.items.length).toBe(1);
        expect(newState.items[0].inProgress).toBe(inProgress);
    });

    it('should return the initial state when an unrecognized action is dispatched', () => {
        const recognizedAction: UsersActionsType = setIsFollowUserAC(123, false);
        const expectedState = initialState;

        const newState = usersReducer(initialState, recognizedAction);

        expect(newState).toEqual(expectedState);
    })
});
