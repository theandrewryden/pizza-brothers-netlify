import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql, useStaticQuery } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

export const LocationTemplate = ({
                                     content,
                                     contentComponent,
                                     title,
                                     helmet,
                                 }) => {
    const LocationContent = contentComponent || Content

    return (
        <section className="section">
            {helmet || ''}
            <div className="container content">
                <div className="columns">
                    <div className="column is-10 is-offset-1">
                        <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
                            {title}
                        </h1>
                        <LocationContent content={content} />
                    </div>
                </div>
            </div>
        </section>
    )
}

LocationTemplate.propTypes = {
    content: PropTypes.node.isRequired,
    contentComponent: PropTypes.func,
    title: PropTypes.string,
    helmet: PropTypes.object,
}

const Location = ({ data }) => {
    const { markdownRemark: location } = data

    return (
        <Layout>
            <LocationTemplate
                content={location.html}
                contentComponent={HTMLContent}
                helmet={
                    <Helmet titleTemplate="%s | Location">
                        <title>{`${location.frontmatter.title}`}</title>
                    </Helmet>
                }
                title={location.frontmatter.title}
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
