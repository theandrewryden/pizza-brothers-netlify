import React from 'react'
import PropTypes from 'prop-types'
import Layout from '../../components/Layout'
import LocationGrid from "../../components/Locations";

const LocationPreview = ({ entry }) => {
    const data = entry.getIn(['data']).toJS()

    if (data) {
        return (
            <Layout>
                <LocationGrid/>
            </Layout>
        )
    } else {
        return <div>Loading...</div>
    }
}

LocationPreview.propTypes = {
    entry: PropTypes.shape({
        getIn: PropTypes.func,
    })
}

export default LocationPreview