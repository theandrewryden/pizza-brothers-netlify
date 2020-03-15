import { graphql, useStaticQuery } from 'gatsby'

const useSiteMetadata = () => {
  const { site, allMarkdownRemark } = useStaticQuery(
    graphql`
      query SITE_METADATA_QUERY {
        site {
          siteMetadata {
            title
            titleTemplate
            description
            url
            image
          }
        }
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
    `
  )

  site.siteMetadata.locations = []
  const { edges: locations } = allMarkdownRemark
  locations.map(({ node: location }) => (
      site.siteMetadata.locations.push(location)
  ))

  return site.siteMetadata
}

export default useSiteMetadata
