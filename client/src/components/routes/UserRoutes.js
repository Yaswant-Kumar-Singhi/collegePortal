import React from 'react'
import {Route,Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import LoadingToRedirect from './LoadingToRedirect'

const UserRoutes = ({ childern , ...rest} )=> {
    
    const {user} = useSelector((state) => ({...state}))

    return user && user.token ? 
    (<Route {...rest} render={
        ()=> childern
    }></Route> ):(<LoadingToRedirect />)

}
export default UserRoutes