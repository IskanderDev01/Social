import React from 'react'
import style from './errorInput.module.css'

function ErrorInput({input, meta, ...props}) {
    const hasError = meta.touched && meta.error
    return (
        <div className={style.errorsBlock}>
            <input 
                {...input} 
                {...props} 
                className={style.formStyle + " " + (hasError ? style.error : '')}
            />
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}

export default ErrorInput