import { useState } from 'react'
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout, reset } from '../redux/auth/authSlice'


const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)

    const [toggleAuthButton, setToggleAuthButton] = useState(false)

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }
    return (
        <div className="header">
            <Link to='/'>
                <div className="logo">TodoApp</div>
            </Link>
            <ul>
                {
                    user ?
                        (
                            <li onClick={onLogout}>
                                <FaSignOutAlt /> Logout
                            </li>
                        )
                        :
                        (
                            toggleAuthButton ?
                                (
                                    <>
                                        <div className='auth-button-lefttext'> Already playing with ClickUp? </div>
                                        <Link to='/login'
                                            onClick={() => setToggleAuthButton(!toggleAuthButton)}
                                        >
                                            <li>
                                                <FaSignInAlt />Login
                                            </li>
                                        </Link>
                                    </>
                                )
                                :
                                (
                                    <>
                                        <div className='auth-button-lefttext'> Don't have an account? </div>
                                        <Link to='/signup'
                                            onClick={() => setToggleAuthButton(!toggleAuthButton)}
                                        >
                                            <li>
                                                <FaUser />SignUp
                                            </li>
                                        </Link>

                                    </>
                                )
                        )
                }
            </ul>
        </div>
    )
}

export default Header