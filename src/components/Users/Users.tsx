import React, {useEffect} from 'react'
import style from './users.module.css'
import User from './User/User'
import LoadingUsers from '../Loadings/LoadingUsers'
import Paginator from 'components/Paginator/Paginator'
import UserSearchForm from './UserSearchForm'
import {FilterType, getUsers} from 'redux/usersPage-reducer'
import { useSelector } from 'react-redux'
import { getCurrentPage, getIsLoading, getPageSize, getTotalUsersCount, getUsersFilter, getUsersSelector } from 'redux/users-selectors'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

type QueryParamsType = {term?: string, page?: string, friend?: string}

export const Users = () => {
        const pagesNumber = [1,2,3,4,5,6,7]
        const users = useSelector(getUsersSelector)
        const totalUsersCount = useSelector(getTotalUsersCount)
        const currentPage = useSelector(getCurrentPage)
        const pageSize = useSelector(getPageSize)
        const filter = useSelector(getUsersFilter)
        const isLoading = useSelector(getIsLoading)
        const dispatch = useDispatch()  
        const {search} = useLocation()
        const [searchParams, setSearchParams] = useSearchParams(search)
        const navigate = useNavigate()

        useEffect(()=>{
            let actualPage = currentPage
            let actualFilter = filter
            
            if(!!searchParams.get('page')) actualPage = Number(searchParams.get('page'))
            if(!!searchParams.get('term')) actualFilter = {...actualFilter, term: searchParams.get('term') as string}

            switch(searchParams.get('frien')){
                case 'null':
                    actualFilter = {...actualFilter, friend: null}
                    break
                case 'true':
                    actualFilter = {...actualFilter, friend: true}
                    break
                case 'false':
                    actualFilter = {...actualFilter, friend: false}
                    break
            }

            dispatch(getUsers(actualPage, pageSize, actualFilter))
        },[])

        useEffect(()=>{
            const query: QueryParamsType = {}
            if(!!filter.term) query.term = filter.term
            if(filter.friend !== null) query.friend = String(filter.friend)
            if(currentPage !== 1) query.page = String(currentPage) 

            setSearchParams(query)
        },[filter, currentPage])

        const onPageChanged = (numPage: number) => {
            dispatch(getUsers(numPage, pageSize, filter))
        }
        const onFilterChanged = (filter: FilterType) => {
            dispatch(getUsers(1, pageSize, filter))
        }
        
        return (
            <div className={style.usersPage}>
                <UserSearchForm onFilterChanged={onFilterChanged}/>
                <div className={style.items}>
                {   isLoading ? pagesNumber.map((i,index) => (<LoadingUsers key={index}/>)) :
                        users.map(item => (
                            isLoading ? <LoadingUsers key={item.id}/> :
                            <User
                                key={item.id}
                                id={item.id}
                                followed={item.followed}
                                name={item.name}
                                photos={item.photos}
                                status={item.status}
                            />
                        ))
                    }
                </div>
                    <Paginator 
                        totalItemsCount={totalUsersCount} 
                        pageSize={pageSize} 
                        currentPage={currentPage}
                        onPageChanged={onPageChanged}
                    />
            </div>
        )
}
