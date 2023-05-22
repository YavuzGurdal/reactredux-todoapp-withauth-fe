import { useEffect, useRef, useState } from "react";
import { MdOutlineMail, MdLockOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, reset } from "../redux/auth/authSlice";
import Spinner from "../components/Spinner";

import Bounce from "react-reveal/Bounce";

const Login = () => {
  const inputFocus = useRef();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData; // state'i destructuring yaptik

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    inputFocus.current.focus();

    if (isError) {
      console.log(message);
    }
    if (isSuccess || user) {
      navigate("/");
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="auth-pages-wrapper">
      <div className="auth-pages">
        <section className="heading">
          <Bounce left cascade duration={1000}>
            <h1>Welcome back!</h1>
          </Bounce>
        </section>

        <section className="form">
          <Bounce left cascade duration={800}>
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="text"
                  className="form-control"
                  placeholder="Enter your email"
                  onChange={onChange}
                  ref={inputFocus}
                  autoComplete="off"
                />
                <div className="input-icon">
                  <MdOutlineMail size={20} />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="password">Choose Password</label>
                <input
                  id="password"
                  name="password"
                  type="text"
                  className="form-control"
                  placeholder="Enter password"
                  onChange={onChange}
                  autoComplete="off"
                />
                <div className="input-icon">
                  <MdLockOutline size={20} />
                </div>
              </div>
              <div className="form-group">
                <button>
                  <span>Log In</span>
                </button>
              </div>
            </form>
          </Bounce>
        </section>
      </div>
    </div>
  );
};

export default Login;
