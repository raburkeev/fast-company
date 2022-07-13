import React, {useState} from "react";
import Users from "./components/users";
import api from "./api";

const App = () => {
    const [users, setUsers] = useState(api.users.fetchAll())

    const handleDelete = (userId) => {
        setUsers(prevState => prevState.filter((user) => user !== userId))
    }

    const getFormatOfWordsInPhrase = (number) => {
        return [2, 3, 4].includes(number) ? 'человека тусанут' : 'человек тусанет'
    }

    const renderPhrase = () => {
        return (
            <span className="badge bg-primary p-2 m-2 fs-5">
                {`${users.length} ${getFormatOfWordsInPhrase(users.length)} с тобой сегодня`}
            </span>
        )
    }

    const renderTableRows = () => {
        return <Users users={users} onDelete={handleDelete}/>
    }

    if(users.length === 0) {
        return (
            <span className="badge bg-danger p-2 m-2 fs-5">Никто с тобой не тусанет</span>
        )
    }

    return (
        <>
            {renderPhrase()}
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Имя</th>
                    <th scope="col">Качества</th>
                    <th scope="col">Профессия</th>
                    <th scope="col">Встретился, раз</th>
                    <th scope="col">Оценка</th>
                    <th />
                </tr>
                </thead>
                <tbody>
                {renderTableRows()}
                </tbody>
            </table>
        </>
    )
}

export default App