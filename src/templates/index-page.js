import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import LocationGrid from "../components/Locations";

export const IndexPageTemplate = ({
  image,
  title,
  subheading,
  mainpitch
}) => (
  <div>
    <div
      className="full-width-image margin-top-0"
      style={{
        backgroundImage: `url(${
          !!image.childImageSharp ? image.childImageSharp.fluid.src : image
        })`,
        backgroundPosition: `top left`,
        backgroundAttachment: `fixed`,
      }}
    >
      <div
        className="page-title"
        style={{
          display: 'flex',
          height: '150px',
          lineHeight: '1',
          justifyContent: 'space-around',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <h1
          className="has-text-centered has-text-weight-bold is-size-3-mobile is-size-2-tablet is-size-1-widescreen font-heading"
          style={{
            lineHeight: '1',
            padding: '0.25em',
          }}
        >
          {title}
        </h1>
        <h3
          className="has-text-centered has-text-weight-bold is-size-5-mobile is-size-5-tablet is-size-4-widescreen font-large"
          style={{
            lineHeight: '1',
            padding: '0.25em',
          }}
        >
            {subheading.subtitle}
            <p>{subheading.body}</p>
            <a
                href={subheading.link}
                target={"_blank"}
                title={subheading.link}
                rel={"noopener noreferrer"}
            >{subheading.link}</a>
        </h3>
      </div>
    </div>
    <div className="tile promotion" style={{paddingTop: 10, paddingBottom: 10}}>
      <h2 className="title">{mainpitch.title}</h2>
    </div>
    <section className="has-background-black has-text-centered" style={{padding: 15}}>
      <div className="container">
        <div>
          <div className="columns">
            <div className="column is-12">
              <div className="content">
                  <h2 className="has-text-light margin-top-0" style={{borderBottom: "1px solid grey", marginBottom: 30, padding: 15, fontSize: "2.5rem"}}>Locations</h2>
                  <LocationGrid/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
)

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  subheading: PropTypes.object,
  mainpitch: PropTypes.object
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        subheading={frontmatter.subheading}
        mainpitch={frontmatter.mainpitch}
      />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        subheading {
          subtitle
          body
          link
        }
        mainpitch {
          title
        }
      }
    }
  }
`
