import React, { FC, useEffect, useState } from 'react'
import style from './profile.module.css'
import { ProfileType } from 'types/types'

type StatusType = {
    status: string
    updateStatus: (status: string) => void
    isOwner: any
    profile: ProfileType | null
}

const Status: FC<StatusType> = ({status, updateStatus, isOwner, profile}) => {
        const [editMode, setEditMode] = useState(false)
        const [statusState, setStatusState] = useState(status)
        
        useEffect(() => {
            setStatusState(status)
        }, [status])

        const activateEditStatusMode = () => {
            setEditMode(true)
        }

        const deActivateEditStatusMode = () => {
            setEditMode(false)
            updateStatus(statusState)
        }
        return (
            <ul>
            <li><b>name</b>: {profile?.fullName}</li>
            <li><b>about me</b>: {profile?.aboutMe ? profile?.aboutMe : ''}</li>
            <li><b>looking for job</b>: { profile?.lookingForAJob ? 'looking for' : 'not looking'}</li>
            <li><b>looking for a job description</b>: {profile?.lookingForAJobDescription ? 
                profile?.lookingForAJobDescription
                : `not indicated` }</li>
            {
                editMode ? <div className={style.status}>
                    status : <input 
                        onChange={(e: any) => {setStatusState(e.target.value)}}
                        value={statusState}
                        onBlur={deActivateEditStatusMode}
                        />
            </div> : <li className={style.status} onDoubleClick={isOwner && activateEditStatusMode}><b>status:</b> {statusState}</li>
            }
            </ul>
        )
}

export default Status