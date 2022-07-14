import React from "react";
import Quality from "./qualitie";
import BookMark from "./bookmark";

const User = ({user, onDelete, handleToggleBookMark}) => {
    return (
        <tr>
            <td>
                {user.name}
            </td>
            <td>
                {user.qualities.map((quality) => {
                    return <Quality quality={quality} key={quality._id}/>
                })}
            </td>
            <td>
                {user.profession.name}
            </td>
            <td>
                {user.completedMeetings}
            </td>
            <td>
                {user.rate}
            </td>
            <td>
                <BookMark handleToggleBookMark={handleToggleBookMark} userId={user._id} user={user}/>
            </td>
            <td>
                <button type="button" className="btn btn-danger" onClick={() => onDelete(user)}>Delete</button>
            </td>
        </tr>
    )
}

export default User