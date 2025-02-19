import {useState, useEffect, useContext} from 'react'
import {useNavigate} from "react-router-dom";

import ExpenseFlowContext from '../../contexts/expenseFlowContext';
import './styledComponents.css'
// import  from '../../../public/logos'


const Header = () => {
    const navigateTo = useNavigate()
    const {userName} = useContext(ExpenseFlowContext)
    const [isLogOut, setIsLogOut] = useState(false)

    const doLogout = () => {
        localStorage.removeItem("jwt_token")
        setIsLogOut(true)
    }

    useEffect(() => {
        if (isLogOut) return navigateTo("/login")
    },[isLogOut, navigateTo])

    return (
        <header>
            <img src="/logos/logo-2-removebg.png" loading='lazy' alt="header logo" className="header-logo" />
            <div className="header-right">
                <span className="profile-box">
                    {userName?userName[0].toUpperCase() : "U"}
                </span>
                <button type='button' className='logout-btn' onClick={doLogout}>Log Out</button>
            </div>
        </header>
    )
}

export default Header
