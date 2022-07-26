import React from 'react'
import PropTypes from 'prop-types'

const GroupList = ({
    items,
    valueProperty,
    contentProperty,
    onItemSelect,
    selectedItem
}) => {
    return Array.isArray(items)
        ? (
            <>
                <ul className="list-group">
                    {items.map((item) => {
                        return (
                            <li
                                key={item[valueProperty]}
                                className={`list-group-item ${
                                    item === selectedItem ? 'active' : ''
                                }`}
                                role="button"
                                onClick={() => onItemSelect(item)}
                            >
                                {item[contentProperty]}
                            </li>
                        )
                    })}
                </ul>
            </>
        )
        : (
            <>
                <ul className="list-group">
                    {Object.keys(items).map((item) => {
                        return (
                            <li
                                key={items[item][valueProperty]}
                                className={`list-group-item ${
                                    items[item] === selectedItem ? 'active' : ''
                                }`}
                                role="button"
                                onClick={() => onItemSelect(items[item])}
                            >
                                {items[item][contentProperty]}
                            </li>
                        )
                    })}
                </ul>
            </>
        )
}

GroupList.defaultProps = {
    valueProperty: '_id',
    contentProperty: 'name'
}

GroupList.propTypes = {
    items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    valueProperty: PropTypes.string.isRequired,
    contentProperty: PropTypes.string.isRequired,
    onItemSelect: PropTypes.func,
    selectedItem: PropTypes.object
}

export default GroupList
