import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'

export const LocationTemplate = ({
                                     title,
                                     address,
                                     phone,
                                     helmet,
                                 }) => {

    return (
        <section className="section">
            {helmet || ''}
            <div className="container content">
                <div className="column is-6">
                    <section className="section">
                        <div className="has-text-centered location">
                            <div
                                style={{
                                    width: '240px',
                                    display: 'inline-block',
                                }}
                            >
                                <div className="location-title">
                                    <h2 className="has-text-light">{title}</h2>
                                </div>
                                <div className="details">
                                    <p className="has-text-light location-address">{address}</p>
                                    <p className="has-text-light location-phone">{phone}</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </section>
    )
}

LocationTemplate.propTypes = {
    title: PropTypes.string,
    address: PropTypes.string,
    phone: PropTypes.string,
    helmet: PropTypes.object,
}

const Location = ({ data }) => {
    const { markdownRemark: location } = data

    return (
        <Layout>
            <LocationTemplate
                title={location.frontmatter.title}
                address={location.frontmatter.address}
                phone={location.frontmatter.phone}
                helmet={
                    <Helmet titleTemplate="%s | Location">
                        <title>{`${location.frontmatter.title}`}</title>
                    </Helmet>
                }
            />
        </Layout>
    )
}

Location.propTypes = {
    data: PropTypes.shape({
        markdownRemark: PropTypes.object,
    }),
}

export default Location

export const pageQuery = graphql`
  query LocationByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
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
`
