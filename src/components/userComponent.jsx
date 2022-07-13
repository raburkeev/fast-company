import React from "react";

const User = ({user, onDelete}) => {
    return (
        <tr>
            <td>
                {user.name}
            </td>
            <td>
                {user.qualities.map((quality) => {
                    return <span key={quality._id} className={`badge m-1 bg-${quality.color}`}>{`${quality.name}`}</span>
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
                <button type="button" className="btn btn-danger" onClick={() => onDelete(user)}>Delete</button>
            </td>
        </tr>
    )
}


export default User