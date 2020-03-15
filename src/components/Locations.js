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
                    <div key={location.id} className="column is-6 has-text-centered">
                        <div style={{display: 'inline-block', width: '100%'}}>
                            <iframe
                                title={location.frontmatter.title}
                                src={location.frontmatter.mapEmbedUrl}
                                width={400}
                                height={300}
                                marginWidth={0}
                                marginHeight={0}
                                frameBorder={0}
                                style={{border: 50}}
                                allowFullScreen={false}
                                aria-hidden={false}
                            />
                        </div>
                        <div className="has-text-centered" style={{
                            verticalAlign: 'middle',
                            display: 'inline-block',
                            width: '100%'
                        }}>
                            <div className="actions has-text-centered">
                                <button
                                    style={{
                                        padding: 20,
                                        width: 200,
                                        fontSize: '1rem',
                                        background: 'green',
                                        color: 'white'
                                    }}
                                    title="Order Online"
                                    onClick={() => { window.location.href = location.frontmatter.onlineOrderingUrl }}>
                                    Order Online
                                </button>
                            </div>
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
            allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "location"}}}, sort: {fields: frontmatter___title, order: ASC}) {
                edges {
                    node {
                      id
                      frontmatter {
                        title
                        address
                        phone
                        mapEmbedUrl
                        onlineOrderingUrl
                      }
                    }
                }
            }
        }
    `}
     render={(data, count) => <LocationGrid data={data} count={count} />}
 />
)
