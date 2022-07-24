import React from "react";

const SearchStatus = ({length}) =>{

    const renderPhrase = (number) => {
        let text = ""
        if (number >= 5 || number % 10 === 1) {
            text = "тусанет с тобой сегодня"
        } else if ((number % 10 >= 2 || number % 10 <= 4) && number > 1) {
            text = "тусанут с тобой сегодня"
        } else {
            text = "Никто с тобой не тусанёт"
        }

        return `${number}` > 0 ? `${number} ${text}` : `${text}`
    }

    const getBageClasses = () => {
        let classes = "badge btn-sm m-2 "
        classes += length === 0 ? "bg-danger" : "bg-primary"
        return classes
    }

    return <span className={getBageClasses()}>
                {renderPhrase(length)}
            </span>
}

export default SearchStatus