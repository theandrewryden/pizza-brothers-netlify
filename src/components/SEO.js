import React from "react";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"

const SEO = ({ title, description, image }) => (
    <StaticQuery query={query} render={({
        site: {
            siteMetadata: {
                defaultTitle,
                titleTemplate,
                defaultDescription,
                siteUrl,
                defaultImage
            }
        }
    }) => {
        const seo = {
            title: title || defaultTitle,
            description: description || defaultDescription,
            image: `${siteUrl}${image || defaultImage}`,
            url: `${siteUrl}'/'`,
        }

        return (
            <>
                <Helmet title={seo.title} titleTemplate={titleTemplate}>
                    <meta name="description" content={seo.description} />
                    <meta name="image" content={seo.image} />
                    {seo.url && <meta property="og:url" content={seo.url} />}
                    {seo.title && <meta property="og:title" content={seo.title} />}
                    {seo.image && <meta property="og:image" content={seo.image} />}
                    {seo.description && <meta property="og:description" content={seo.description} />}
                </Helmet>
            </>
        )
    }}/>
);

export default SEO

SEO.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string
}

SEO.defaultProps = {
    title: null,
    description: null,
    image: null
}

const query = graphql`
    query SEO {
        site {
            siteMetadata {
                defaultTitle: title
                titleTemplate
                defaultDescription: description
                siteUrl: url
                defaultImage: image
            }
        }
    }
`


