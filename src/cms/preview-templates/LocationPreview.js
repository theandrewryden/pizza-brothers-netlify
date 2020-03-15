import React from 'react'
import PropTypes from 'prop-types'
import Layout from '../../components/Layout'
import LocationGrid from "../../components/Locations";

const LocationPreview = ({ entry }) => {
    const data = entry.getIn(['data']).toJS()

    if (data) {
        return (
            <div className="column is-6 has-background-black">
                <section className="section">
                    <div className="has-text-centered location">
                        <div
                            style={{
                                width: '240px',
                                display: 'inline-block',
                            }}
                        >
                            <div className="location-title">
                                <h2 className="has-text-light">{data.title}</h2>
                            </div>
                            <div className="details">
                                <p className="has-text-light location-address">{data.address}</p>
                                <p className="has-text-light location-phone">{data.phone}</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
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