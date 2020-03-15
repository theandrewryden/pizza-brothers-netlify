import React from 'react'
import PropTypes from 'prop-types'
import {StaticQuery} from "gatsby";
import { graphql } from "gatsby";

class LocationGrid extends React.Component {
    render() {
        const { data } = this.props
        const { edges: locations } = data.allMarkdownRemark

        return (
            <div className="columns is-multiline">
                {locations &&
                  locations.map(({ node: location }) => (
                    <div key={location.id} className="column is-6">
                        <section className="section">
                            <div className="has-text-centered location">
                                <div
                                    style={{
                                        width: '240px',
                                        display: 'inline-block',
                                    }}
                                >
                                    <div className="location-title">
                                        <h2 className="has-text-light">{location.frontmatter.title}</h2>
                                    </div>
                                    <div className="details">
                                        <p className="has-text-light location-address">{location.frontmatter.address}</p>
                                        <p className="has-text-light location-phone">{location.frontmatter.phone}</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                ))}
            </div>
        )
    }
}

LocationGrid.propTypes = {
    data: PropTypes.shape({
        allMarkdownRemark: PropTypes.shape({
            edges: PropTypes.array,
        }),
    }),
}

export default () => (
    <StaticQuery query={graphql`
        query LocationQuery {
            allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "location"}}}) {
                edges {
                    node {
                      id
                      frontmatter {
                        title
                        address
                        phone
                      }
                    }
                }
            }
        }
    `}
     render={(data, count) => <LocationGrid data={data} count={count} />}
 />
)
