import React from "react"
import User from "./userComponent";

const Users = ({users, onDelete, handleToggleBookMark}) => {
    return users.map(user => {
        return <User key={user._id} user={user} onDelete={onDelete} handleToggleBookMark={handleToggleBookMark}/>
    })
}

export default Users