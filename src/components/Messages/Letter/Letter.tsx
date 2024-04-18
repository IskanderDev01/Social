import React, { FC } from 'react'

type LetterType = {
    letters: string
}

const Letter: FC<LetterType> = ({letters}) => {
    return (
        <li>{letters}</li>
    )
}

export default Letter