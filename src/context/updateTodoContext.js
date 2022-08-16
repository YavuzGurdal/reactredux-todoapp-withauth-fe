import { createContext, useState } from 'react'

const UpdateTodoContext = createContext({})

export const UpdateTodoProvider = ({ children }) => {

    const [updateCurrentId, setUpdateCurrentId] = useState('')

    return (
        <UpdateTodoContext.Provider value={{ updateCurrentId, setUpdateCurrentId }}>
            {children}
        </UpdateTodoContext.Provider>
    )
}

export default UpdateTodoContext