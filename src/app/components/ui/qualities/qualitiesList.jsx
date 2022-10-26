import React from 'react'
import PropTypes from 'prop-types'
import Quality from './quality'
import {useSelector} from 'react-redux'
import {getQualitiesLoadingStatus} from '../../../store/qualities'

const Qualities = ({qualities}) => {
    const isLoading = useSelector(getQualitiesLoadingStatus())

    if (!isLoading) {
        return (
            <>
                {qualities.map(quality => {
                    return <Quality id={quality} key={quality}/>
                })}
            </>
        )
    } else {
        return 'loading...'
    }
}

Qualities.propTypes = {
    qualities: PropTypes.array.isRequired
}

export default Qualities
