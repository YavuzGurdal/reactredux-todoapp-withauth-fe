import { useEffect } from 'react'
// import { MdOutlineMail, MdPersonOutline, MdLockOutline } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'
// import Spinner from '../components/Spinner'
import TodoItem from '../components/TodoItem'
import { getTodos, reset } from '../redux/todos/todoSlice'
import TodoForm from '../components/TodoForm'

const Dashboard = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth) // store'daki state'den cekiyorum

    const { todos, isError, isLoading, message } = useSelector((state) => state.todos) // store'daki state'den cekiyorum

    useEffect(() => {
        if (isError) {
            console.log(message);
        }

        if (!user) {
            navigate('/login')
        }

        if (user) {
            dispatch(getTodos())
        }

        return () => {
            dispatch(reset())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, navigate, dispatch])

    if (isLoading) {
        return <Spinner />
    }

    return (
        <div className='dashboard-pages-wrapper'>
            <div className="todo-pages">
                <section className="heading">
                    <h1 style={{ color: '#292d34' }}>Welcome <span>{user && user.name}</span></h1>
                    {/* <h1>Welcome yvz grdl</h1> */}
                    <h1 style={{ color: '#292d34' }}>Let's <span style={{ color: '#292d34' }}>go!</span></h1>
                </section>

                <TodoForm />

                <section className="content">
                    {
                        todos?.length > 0 ?
                            (
                                <div className='todos'>
                                    {
                                        todos.map((todo) => (
                                            <TodoItem key={todo._id} todo={todo} />
                                        ))
                                    }
                                </div>
                            )
                            :
                            (<h3>You have not add any Todo</h3>)
                    }
                </section>
            </div>
        </div>
    )
}

export default Dashboard