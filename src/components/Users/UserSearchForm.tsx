import React, { FC, memo } from 'react'
import style from './users.module.css'
import { Field, Form, Formik } from 'formik'
import { FilterType } from 'redux/usersPage-reducer'
import { getUsersFilter } from 'redux/users-selectors'
import { useSelector } from 'react-redux'

type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}
type FriendType = 'true' | 'false' | 'null'
type FormType = {
    term: string,
    friend: FriendType,
}

const UserSearchForm: FC<PropsType> = memo(({onFilterChanged}) => {
    const filter = useSelector(getUsersFilter)
    
    const submit = (values: FormType, {setSubmitting}: {setSubmitting: (isSubmitting: boolean) => void }) => {
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === 'null' ? null : values.friend === 'false' ? true : false
        }

        onFilterChanged(filter)
        setSubmitting(false)
    }
    
    const usersSearchFormValidate = (values: any) => {
        const errors = {};
        return errors;
    } 

    return (
        <div className={style.formik}>
            <Formik
            enableReinitialize
            initialValues={{term: filter.term, friend: String(filter.friend) as FriendType}}
            validate={usersSearchFormValidate}
            onSubmit={submit}
            >
            {({ isSubmitting }) => (
                <Form>
                <Field type="text" name="term" />
                <Field name="friend" as="select" >
                    <option value='null'>All</option>
                    <option value='true'>Only followed</option>
                    <option value='false'>Only unfollowed</option>
                </Field>
                <button type="submit" disabled={isSubmitting}>
                    Find
                </button>
                </Form>
            )}
            </Formik>
        </div>
    )
})

export default UserSearchForm 