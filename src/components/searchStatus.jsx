import React from "react";

const SearchStatus = ({length}) => {
    const getFormatOfWordsInPhrase = (number) => {
        return [2, 3, 4].includes(number) ? 'человека тусанут' : 'человек тусанет'
    }

    return (
        <span className="badge bg-primary p-2 m-2 fs-5">
                {`${length} ${getFormatOfWordsInPhrase(length)} с тобой сегодня`}
            </span>
    )
}

export default SearchStatus