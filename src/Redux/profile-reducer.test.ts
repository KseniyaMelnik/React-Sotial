import profileReducer, {addPostActionCreator, deletePost} from "./profile-reducer";

let initialState: any = {
    posts: [
        {
            id: 1,
            message: 'Hi, how are you',
            likesCount: 5,
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQblpU20ze2Vsusvi7MmRwzZYanB0cVwNJHg&usqp=CAU'
        },
        {
            id: 2,
            message: 'It\'s my first post',
            likesCount: 20,
            image: 'https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg'
        }
    ],
    profile: null,
    status: ""
};

it('length of posts should incremented', ()=> {
    let action = addPostActionCreator("test");
    let newState = profileReducer(initialState, action);

    expect(newState.posts.length).toBe(3)
})

it('message of third post should be "test"', ()=> {
    let action = addPostActionCreator("test");
    let newState = profileReducer(initialState, action);

    expect(newState.posts[2].message).toBe('test')
})

it('after deleting length of messages should be decremented', ()=> {
    let action = deletePost(1);
    let newState = profileReducer(initialState, action);

    expect(newState.posts.length).toBe(1)
})

it(`after deleting length of messages shouldn't be decremented if id is incorrect`, ()=> {
    let action = deletePost(5);
    let newState = profileReducer(initialState, action);

    expect(newState.posts.length).toBe(2)
})


