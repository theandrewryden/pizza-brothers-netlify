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
                    <div key={location.id} className="column is-12">
                        <div className="column is-6" style={{display: 'inline-block', textAlign: 'left'}}>
                            <iframe
                                src={location.frontmatter.mapEmbedUrl}
                                width={400}
                                height={300}
                                marginWidth={0}
                                marginHeight={0}
                                frameBorder={0}
                                style={{border: 50}}
                                allowFullScreen={false}
                                aria-hidden={false}
                                tabIndex={0}/>
                        </div>
                        <div className="column is-6" style={{
                            textAlign: 'right',
                            verticalAlign: 'top',
                            display: 'inline-block'
                        }}>
                            <section className="section">
                                <div className="location">
                                    <div>
                                        <div className="location-title">
                                            <h2 className="has-text-light">{location.frontmatter.title}</h2>
                                        </div>
                                        <div className="details">
                                            <p className="has-text-light location-address">{location.frontmatter.address}</p>
                                            <p className="has-text-light location-phone">{location.frontmatter.phone}</p>
                                        </div>
                                        <div className="actions">
                                            <button
                                                title="Order Online"
                                                onClick={() => { window.location.href = location.frontmatter.onlineOrderingUrl }}>
                                                Order Online
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
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
