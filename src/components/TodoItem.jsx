import { MdOutlineDeleteForever, MdOutlineRadioButtonUnchecked, MdOutlineRadioButtonChecked } from 'react-icons/md'
import { BiEdit } from 'react-icons/bi'
import { useDispatch } from 'react-redux'
import { completeTodo, deleteTodo } from '../redux/todos/todoSlice'
// import { deleteTodo, updateTodo } from '../redux/todos/todoSlice'
import moment from 'moment'
import { useContext } from 'react'
import UpdateTodoContext from '../context/updateTodoContext'

const TodoItem = ({ todo }) => {
    const dispatch = useDispatch()

    const { setUpdateCurrentId } = useContext(UpdateTodoContext)

    return (
        <div className="todo">
            <div key={todo._id} className="radio-buttons"
                // onClick={() => dispatch(updateTodo({ ...todo, todo: todo }))}
                onClick={() => dispatch(completeTodo(todo._id))}
            >
                {
                    todo?.complete ?
                        (<MdOutlineRadioButtonChecked size={25} />)
                        :
                        (<MdOutlineRadioButtonUnchecked size={25} />)
                }
            </div>
            <div
                key={todo._createdAt}
                className={todo.complete ? "todo-complete" : ""}
            >
                <p style={{ color: '#7b68ee' }}> {moment(todo.createdAt).fromNow()}</p>
                <h3>{todo.todo}</h3>
            </div>
            <div className="button-updates">
                <button
                    className="update"
                    onClick={() => setUpdateCurrentId(todo._id)}
                >
                    <BiEdit size={30} color='#7b68ee' />
                </button>
                <button
                    className="close"
                    onClick={() => dispatch(deleteTodo(todo._id))}
                >
                    <MdOutlineDeleteForever size={30} color='#e04f44' />
                </button>
            </div>
        </div>
    )
}

export default TodoItem