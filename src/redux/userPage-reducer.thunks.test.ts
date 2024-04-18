import { ResponseType, ResultCodesEnum } from 'components/api/api'
import { actions, follow, unFollow } from './usersPage-reducer';
import { usersAPI } from 'components/api/users-api';

jest.mock('components/api/users-api')

const userAPIMock = usersAPI as jest.Mocked<typeof usersAPI>
const dispatchMock = jest.fn()
const getStateMock = jest.fn()

beforeEach(()=> {
    dispatchMock.mockClear()
    getStateMock.mockClear()
    userAPIMock.subsUser.mockClear()
    userAPIMock.subsNotUser.mockClear()
})

const result: ResponseType = {
    resultCode: ResultCodesEnum.Success,
    messages: [],
    data: {}
}

userAPIMock.subsUser.mockReturnValue(Promise.resolve(result))
userAPIMock.subsNotUser.mockReturnValue(Promise.resolve(result))

test('success follow thunk', async () =>{
    const thunk = follow(1)
    
    
    await thunk(dispatchMock, getStateMock, {})
    
    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenCalledWith(1, actions.toggleDisabledBtn(true, 1))
    expect(dispatchMock).toHaveBeenCalledWith(2, actions.followOn(1))
    expect(dispatchMock).toHaveBeenCalledWith(3, actions.toggleDisabledBtn(false, 1))
})

test('success unfollow thunk', async () =>{
    const thunk = unFollow(1)
    
    await thunk(dispatchMock, getStateMock, {})
    
    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenCalledWith(1, actions.toggleDisabledBtn(true, 1))
    expect(dispatchMock).toHaveBeenCalledWith(2, actions.followOff(1))
    expect(dispatchMock).toHaveBeenCalledWith(3, actions.toggleDisabledBtn(false, 1))
})