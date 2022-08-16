import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createTodo, updateTodo } from '../redux/todos/todoSlice'
import { RiTodoLine } from 'react-icons/ri'
import { useContext } from 'react'
import UpdateTodoContext from '../context/updateTodoContext'


const TodoForm = () => {
    const inputFocus = useRef();

    const { todos } = useSelector((state) => state.todos) // store'daki state'den cekiyorum

    const dispatch = useDispatch()
    const [todo, setTodo] = useState('')

    const { updateCurrentId, setUpdateCurrentId } = useContext(UpdateTodoContext)

    const updatedTodo = (updateCurrentId ? todos.find((todo) => todo._id === updateCurrentId) : null)

    useEffect(() => {
        if (updatedTodo) setTodo(updatedTodo.todo)

        inputFocus.current.focus();
    }, [updatedTodo])

    const clear = () => {
        setUpdateCurrentId('')
        setTodo('')
    }

    const onSubmit = (e) => {
        e.preventDefault()

        if (updateCurrentId) {
            dispatch(updateTodo({ ...updatedTodo, todo: todo }))
        } else {
            dispatch(createTodo({ todo }))
            // setTodo('')
        }
        clear();
    }

    return (
        <section className="form">
            <div className="form-wrapper">
                <form onSubmit={onSubmit}>
                    <div className="form-group" >
                        <label htmlFor='todoInput'>Set a Todo</label>
                        <input id='todoInput' value={todo} name='todo' type="text" className="form-control todo-input" placeholder='Enter your todo'
                            onChange={(e) => setTodo(e.target.value)}
                            ref={inputFocus}
                        />
                        <div className="input-icon todo-input-icon"><RiTodoLine size={22} /></div>
                    </div>
                    <div className="form-group">
                        <button type='submit'><span>{updateCurrentId ? 'Update Todo' : 'Add Todo'}</span></button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default TodoForm