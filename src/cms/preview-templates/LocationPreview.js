import React from 'react'
import PropTypes from 'prop-types'
import { LocationTemplate } from '../../templates/location'

const LocationPreview = ({ entry, widgetFor }) => {
    return (
        <LocationTemplate
            content={widgetFor('body')}
            title={entry.getIn(['data', 'title'])}
        />
    )
}

LocationPreview.propTypes = {
    entry: PropTypes.shape({
        getIn: PropTypes.func,
    }),
    widgetFor: PropTypes.func,
}

export default LocationPreview