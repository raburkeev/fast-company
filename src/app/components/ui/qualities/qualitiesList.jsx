import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import Quality from './quality'
import {useDispatch, useSelector} from 'react-redux'
import {getQualitiesByIds, getQualitiesLoadingStatus, loadQualitiesList} from '../../../store/qualities'
import Loader from '../../common/loader'

const Qualities = ({qualities}) => {
    const dispatch = useDispatch()
    const qualitiesList = useSelector(getQualitiesByIds(qualities))
    const isLoading = useSelector(getQualitiesLoadingStatus())
    useEffect(() => {
        dispatch(loadQualitiesList())
    }, [])

    if (!isLoading) {
        return (
            <>
                {qualitiesList.map(quality => {
                    return <Quality key={quality._id} {...quality}/>
                })}
            </>
        )
    } else {
        return <Loader loadingTarget={'qualities'}/>
    }
}

Qualities.propTypes = {
    qualities: PropTypes.array.isRequired
}

export default Qualities
