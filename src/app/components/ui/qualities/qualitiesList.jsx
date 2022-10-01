import React from 'react'
import PropTypes from 'prop-types'
import Quality from './quality'
import {useQualities} from '../../../hooks/useQuality'

const Qualities = ({qualities}) => {
    const {isLoading} = useQualities()

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
