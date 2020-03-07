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
                            <div className="has-text-centered">
                                <div
                                    style={{
                                        width: '240px',
                                        display: 'inline-block',
                                    }}
                                >
                                </div>
                            </div>
                            <p>{location.title}</p>
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
            allMarkdownRemark {
                edges {
                    node {
                        id
                        frontmatter {
                            title
                        }
                    }
                }
            }
        }
    `}
     render={(data, count) => <LocationGrid data={data} count={count} />}
 />
)
