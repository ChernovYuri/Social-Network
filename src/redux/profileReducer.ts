import {PostType, ProfilePageType} from "redux/store";

let initialState = {
        profileInfo: [
            {
                profileWallpaper: 'https://cdn.wallpaperjam.com/c2b45a1d3e2100ab203b8f03ba3c50a247d48035/landscapes-roads-multiscreen.jpg',
                ava: 'https://ionicframework.com/docs/img/demos/avatar.svg',
            }
        ],
        newPostText: '',
        posts: [
            {
                id: 1,
                text: 'Теория — это когда все известно, но ничего не работает. Практика — это когда все работает, но никто не знает почему. Мы же объединяем теорию и практику: ничего не работает... и никто не знает почему!',
                likesCount: 10
            },
            {
                id: 2,
                text: 'Все мы гении. Но если вы будете судить рыбу по её способности взбираться на дерево, она проживёт всю жизнь, считая себя дурой.',
                likesCount: 5
            }
        ]
    }

export const profileReducer = (state: ProfilePageType = initialState, action: ProfileActionsType) => {
    switch (action.type) {
        case 'ADD-POST': {
            let newPost: PostType = {
                id: 5,
                text: state.newPostText,
                likesCount: 0
            }
            if (state.newPostText) {
               state = {
                    ...state,
                    posts: [newPost, ...state.posts]
                }
            }
            state.newPostText = ''
            return state
        }
        case 'ON-CHANGE-NEW-POST-TEXT': {
           return {...state, newPostText: action.newPostText}
        }
        default : {
            return state
        }
    }
}

    type onChangeNewPostTextACType = ReturnType<typeof onChangeNewPostTextAC>
    export const onChangeNewPostTextAC = (newPostText: string) => {
        return {
            type: 'ON-CHANGE-NEW-POST-TEXT',
            newPostText
        }as const
    }

    type addPostACType = ReturnType<typeof addPostAC>
    export const addPostAC = () => {
        return {
            type: 'ADD-POST',
        } as const
    }

   export type ProfileActionsType = onChangeNewPostTextACType | addPostACType