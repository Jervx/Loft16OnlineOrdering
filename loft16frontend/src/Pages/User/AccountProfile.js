import React, {useEffect, useState} from 'react'
import API from '../../Helpers/api'

import { useSelector } from 'react-redux'

const AccountProfile = () => {

    const [userDetails ,setUserDetails] = useState(null)
    const userData = useSelector(state => state.user.userData)
    
    useEffect(() => {
        const loadUserDetail = async () =>{
            try{
                const result = await API.get(`/user/mydetails${userData._id}`)
                setUserDetails([])
                console.log(result)
            }catch(err){
                console.log(err)
            }
        }

        loadUserDetail()
    })

    return (
        <div>
            {
                userDetails
            }
        </div>
    )
}

export default AccountProfile
