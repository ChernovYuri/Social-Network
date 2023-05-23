import {
    profileReducer,
    addPostAC,
    onLikePostAC,
    setProfileAC,
    setLoadingAC,
    setStatusAC,
    ProfileDomainType, ContactsType, ProfileType
} from 'redux/profile/profileReducer';

describe('profileReducer', () => {
    const initialState: ProfileDomainType = {
        userId: 2,
        aboutMe: '',
        lookingForAJob: false,
        lookingForAJobDescription: '',
        fullName: '',
        contacts: {} as ContactsType,
        photos: {
            small: null,
            large: null
        },
        profileWallpaper: '',
        newPostText: '',
        posts: [
            {
                id: 1,
                text: 'Post 1',
                likesCount: 10
            },
            {
                id: 2,
                text: 'Post 2',
                likesCount: 5
            }
        ],
        isLoading: true,
        status: ''
    };

    it('should add a new post', () => {
        const newPostText = 'New post';
        const action = addPostAC(newPostText);
        const newState = profileReducer(initialState, action);

        expect(newState.posts.length).toBe(3);
        expect(newState.posts[0].text).toBe(newPostText);
        expect(newState.posts[0].likesCount).toBe(0);
    });

    it('should update the like count of a post', () => {
        const postId = 1;
        const isLiked = true;
        const action = onLikePostAC(postId, isLiked);
        const newState = profileReducer(initialState, action);

        expect(newState.posts[0].likesCount).toBe(9);
    });

    it('should set the profile data', () => {
        const profileData: ProfileType = {
            userId: 3,
            aboutMe: '',
            lookingForAJob: false,
            lookingForAJobDescription: '',
            fullName: 'John Doe',
            contacts: {} as ContactsType,
            photos: {
                small: null,
                large: null
            },
            isLoading: true
        };
        const action = setProfileAC(profileData);
        const newState = profileReducer(initialState, action);

        expect(newState.userId).toBe(profileData.userId);
        expect(newState.fullName).toBe(profileData.fullName);
        expect(newState.contacts).toEqual(profileData.contacts);
    });

    it('should set the loading state', () => {
        const isLoading = false;
        const action = setLoadingAC(isLoading);
        const newState = profileReducer(initialState, action);

        expect(newState.isLoading).toBe(isLoading);
    });

    it('should set the status', () => {
        const status = 'Hello, world!';
        const action = setStatusAC(status);
        const newState = profileReducer(initialState, action);

        expect(newState.status).toBe(status);
    });
});
