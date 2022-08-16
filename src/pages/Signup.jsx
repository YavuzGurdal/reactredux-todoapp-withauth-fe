import { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { MdOutlineMail, MdPersonOutline, MdLockOutline } from 'react-icons/md'
import { reset, signup } from '../redux/auth/authSlice'
import Spinner from '../components/Spinner'

// import Fade from 'react-reveal/Fade';
// import Bounce from 'react-reveal/Bounce';

const Signup = () => {
    const inputFocus = useRef();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    })

    const { name, email, password } = formData // state'i destructuring yaptik

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isError, isSuccess, isLoading, message } = useSelector((state) => state.auth)

    useEffect(() => {
        inputFocus.current.focus();

        if (isSuccess || user) {
            navigate('/')
        }

        dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
            // key'i e.target.name den aliyoruz. value'yu e.target.value'dan aliyoruz
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const userData = {
            name,
            email,
            password
        }

        dispatch(signup(userData))
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <div className='auth-pages-wrapper'>
            <div className="auth-pages">
                <section className="heading">
                    {/* <Bounce left cascade duration={1000}> */}
                    <h1>Let's go!</h1>
                    {/* </Bounce> */}
                </section>
                <section className="form">
                    {/* <Fade left cascade> */}
                    {/* <Bounce left big cascade duration={900}> */}
                    <form onSubmit={onSubmit} >
                        <div className="form-group">
                            <label htmlFor='name' >Full Name</label>
                            <input id='name' name='name' type="text" className="form-control" placeholder='John Doe'
                                onChange={onChange}
                                ref={inputFocus}
                            />
                            <div className="input-icon"><MdPersonOutline size={20} /></div>
                        </div>
                        <div className="form-group">
                            <label htmlFor='email'>Email</label>
                            <input id='email' name='email' type="text" className="form-control" placeholder='example@site.com'
                                onChange={onChange}
                            />
                            <div className="input-icon"><MdOutlineMail size={20} /></div>
                        </div>
                        <div className="form-group">
                            <label htmlFor='password' >Choose Password</label>
                            <input id='password' name='password' type="text" className="form-control" placeholder='Minimum 6 characters'
                                onChange={onChange}
                            />
                            <div className="input-icon"><MdLockOutline size={20} /></div>
                        </div>
                        <div className="form-group">
                            <button><span>Sign Up and Play with TodoApp</span></button>
                        </div>
                    </form>
                    {/* </Bounce> */}
                </section>
            </div>
        </div>
    )
}

export default Signup