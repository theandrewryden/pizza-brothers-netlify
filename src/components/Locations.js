import React from 'react'
import PropTypes from 'prop-types'
import {StaticQuery} from "gatsby";
import { graphql } from "gatsby";
import PrimaryButton from "./PrimaryButton"
import CallButton from "./CallButton";

class LocationGrid extends React.Component {
    render() {
        const { data } = this.props
        const { edges: locations } = data.allMarkdownRemark

        return (
            <div className="columns is-multiline">
                {locations &&
                  locations.map(({ node: location }) => (
                    <div key={location.id} className="location-block column has-text-centered">
                        <div style={{display: 'inline-block', width: '100%'}}>
                            <h2 className="has-text-secondary">{location.frontmatter.title}</h2>
                            <iframe
                                title={location.frontmatter.title}
                                src={location.frontmatter.mapEmbedUrl}
                                width={"100%"}
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
                            <div className="columns has-text-centered" style={{marginTop: 15, marginBottom: 15}}>
                                <div className="column is-6">
                                    <CallButton
                                        title={"Call Pizza Brothers of "+location.frontmatter.title}
                                        phoneNumber={location.frontmatter.phone}
                                    />
                                </div>
                                <div className="column is-6">
                                    <PrimaryButton
                                        title="Order Online"
                                        url={location.frontmatter.onlineOrderingUrl}
                                    />
                                </div>
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
            allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "location"}}}, sort: {fields: frontmatter___sortOrder, order: ASC}) {
                edges {
                    node {
                      id
                      frontmatter {
                        title
                        address
                        phone
                        mapEmbedUrl
                        onlineOrderingUrl
                        sortOrder
                      }
                    }
                }
            }
        }
    `}
     render={(data, count) => <LocationGrid data={data} count={count} />}
 />
)
