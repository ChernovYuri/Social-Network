let initialState = {
    users: [
        {
            id: 1,
            followed: true,
            name: 'Dimych',
            userPic: 'https://ionicframework.com/docs/img/demos/avatar.svg',
            description: 'Yo',
            location: {country: 'Georgia', city: 'Batumi'}
        },
        {
            id: 2,
            followed: true,
            name: 'Gulnaz',
            userPic: 'https://ionicframework.com/docs/img/demos/avatar.svg',
            description: 'Thinking..',
            location: {country: 'Russia', city: 'Kazan'}
        },
        {
            id: 3,
            followed: true,
            name: 'Asya',
            userPic: 'https://ionicframework.com/docs/img/demos/avatar.svg',
            description: '<3',
            location: {country: 'Russia', city: 'Saint-Petersburg'}
        },
        {
            id: 4,
            followed: false,
            name: 'Leha',
            userPic: 'https://ionicframework.com/docs/img/demos/avatar.svg',
            description: 'Everybody, hi!',
            location: {country: 'Belarus', city: 'Mogilev'}
        },
        {
            id: 5,
            followed: false,
            name: 'Alexandr',
            userPic: 'https://ionicframework.com/docs/img/demos/avatar.svg',
            description: 'My life, my rules',
            location: {country: 'Ukraine', city: 'Lviv'}
        },
    ]
}

export type UsersPageType = typeof initialState

export const usersReducer = (state: UsersPageType = initialState, action: UsersActionsType) => {
    switch (action.type) {
        case 'FOLLOW/UNFOLLOW': {
            return {
                ...state,
                users: state.users.map(u => u.id === action.userId ? {...u, followed: !action.isFollowed} : u)
            }
        }
        default: {
            return state
        }
    }
}



type followUserACType = ReturnType<typeof followUserAC>
export const followUserAC = (userId: number, isFollowed: boolean) => {
    return {
        type: 'FOLLOW/UNFOLLOW',
        userId, isFollowed
    } as const
}


export type UsersActionsType = followUserACType

