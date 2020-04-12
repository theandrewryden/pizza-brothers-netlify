import React from 'react'
import PropTypes from 'prop-types'
import {graphql} from 'gatsby'

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
        minHeight: '600px',
        backgroundPosition: `top left`,
        backgroundAttachment: `fixed`,
      }}
    >
      <div className="title-wrapper">
        <div className="page-title">
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
          </h3>
          <p>ALL PIZZA BROTHERS LOCATIONS WILL REMAIN OPEN FOR DELIVERY AND TAKEOUT DURING THESE DIFFICULT TIMES!</p>
          <p>WE ARE PRACTICING SOCIAL DISTANCING GUIDELINES TO KEEP OUR STUFF AND CUSTOMERS SAFE. PLEASE SUPPORT US AS
            SAFELY AS POSSIBLE!</p>
          <p>PLEASE SUPPORT US AS SAFELY AS POSSIBLE!</p>
          <p>THANK YOU!</p>
          <p>FOR MORE INFO</p>
          <a
            href={subheading.link}
            target={"_blank"}
            title={subheading.link}
            rel={"noopener noreferrer"}
          >{subheading.link}</a>
        </div>
        <div className="section-header">
          PLEASE CHOOSE A LOCATION
        </div>
      </div>
    </div>
    <div className="tile promotion" style={{paddingTop: 10, paddingBottom: 10, display: 'none'}}>
      <h2 className="title">{mainpitch.title}</h2>
    </div>
    <section className="has-background-transparent has-text-centered"
             style={{
               padding: 15,
               backgroundImage: `url(${
                 !!image.childImageSharp ? image.childImageSharp.fluid.src : image
               })`,
               minHeight: '600px',
               backgroundPosition: `top left`,
               backgroundAttachment: `fixed`,
             }}

    >
      <div className="container">
        <div>
          <div className="columns">
            <div className="column is-12">
              <div className="content">
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

const IndexPage = ({data}) => {
  const {frontmatter} = data.markdownRemark

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
