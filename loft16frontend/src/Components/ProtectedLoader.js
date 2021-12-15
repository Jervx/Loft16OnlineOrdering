import React from 'react'
import {AiOutlineLoading} from 'react-icons/ai'

const ProtectedLoader = () => {
    return (
    <div className="flex justify-center items-center">
        <AiOutlineLoading className="fixed top-2/4 w-9/12 h-9/12 text-green-600 animate-spin m-auto" />
    </div>
    )
}

export default ProtectedLoader
