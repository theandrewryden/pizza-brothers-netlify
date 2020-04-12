import React from 'react'
import {graphql, StaticQuery} from 'gatsby'
import BackgroundImage from "gatsby-background-image";
import styled from "styled-components";

const BackgroundSection = ({ className, children }) => (
  <StaticQuery query={graphql`
    query {
      desktop: file(relativePath: { eq: "pbrosbackgroundimg01.png" }) {
        childImageSharp {
          fluid(quality: 90, maxWidth: 1920) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }  
  `}
   render={data => {
     const imageData = data.desktop.childImageSharp.fluid
     return (
       <BackgroundImage
         Tag="section"
         className={className}
         fluid={imageData}
         backgroundColor={`#040e18`}
       >{children}</BackgroundImage>
     )
   }}
  />
)

const StyledBackgroundSection = styled(BackgroundSection)`
  width: 100%;
  background-position: bottom center;
  background-repeat: repeat-y;
  background-size: cover;
  background-attachment: fixed;
`

export default StyledBackgroundSection
