import './styledComponents.css'
// import  from '../../../public/logos'


const Header = () => {
    const doLogout = () => {
        localStorage.removeItem("jwt_token")
    }

    return (
        <header>
            <img src="/logos/logo-2-removebg.png" loading='lazy' alt="header logo" className="header-logo" />
            <div className="header-right">
                <span className="profile-box">U</span>
                <button type='button' className='logout-btn' onClick={doLogout}>Log Out</button>
            </div>
        </header>
    )
}

export default Header
