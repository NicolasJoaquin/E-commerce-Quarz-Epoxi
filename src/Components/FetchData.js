import React from 'react'
import { useState, useEffect } from 'react'

const FetchData = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users')
                if(!response.ok)
                    throw new Error("No se encontraron usuarios")
                const data = await response.json()
                setUsers(data)
            }
            catch(err) {
                console.log(err.message)
            }
        }
        fetchData();
    }, [])
    console.log(users);
    return (
        <div>
            <h2>Lista de usuarios:</h2>
            <ul>
                {users.map((u) => {
                    // Cuerpo de la función
                    return(
                    <li key={u.id}>
                        <strong>Nombre:</strong> {u.name}<br/>
                        <strong>Email:</strong> {u.email}<br/>
                        <strong>Compañía:</strong> {u.company.name}<br/>
                        <hr/>
                    </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default FetchData