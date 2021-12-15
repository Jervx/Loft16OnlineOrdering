import React from 'react'
import {AiOutlineLoading} from 'react-icons/ai'

const FullPageLoader = () => {
    return (
    <div className="w-full h-screen flex items-center">
        <AiOutlineLoading className="w-5/12 h-5/12 animate-spin  m-auto" />
    </div>
    )
}

export default FullPageLoader
