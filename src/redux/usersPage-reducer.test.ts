import usersPage_reducer, { InitialStateType, actions } from './usersPage-reducer'

let state: InitialStateType; 

beforeEach(()=>{
    state = {
        users: [
            {id: 0, name: "user 0", status: "status ", photos: {small: null, large: null}, followed: false },
            {id: 1, name: "user 1", status: "status 1", photos: {small: null, large: null}, followed: false },
            {id: 2, name: "user 2", status: "status 2", photos: {small: null, large: null}, followed: true },
            {id: 3, name: "user 3", status: "status 3", photos: {small: null, large: null}, followed: true },
        ],
        totalUsersCount: 0,
        pageSize: 8,
        currentPage: 1,
        isLoading: true,
        disabledBtn: []
    }
})

test("follow success", ()=>{
    const newState = usersPage_reducer(state, actions.followOn(1))
    
    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[1].followed).toBeTruthy() 
})

test("unfollow success", ()=>{
    const newState = usersPage_reducer(state, actions.followOff(3))
    
    expect(newState.users[2].followed).toBeTruthy()
    expect(newState.users[3].followed).toBeFalsy()
})