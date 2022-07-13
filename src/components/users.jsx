import React from "react"
import User from "./userComponent";

const Users = ({users, onDelete}) => {
    return users.map(user => {
        return <User key={user._id} user={user} onDelete={onDelete}/>
    })
}

export default Users