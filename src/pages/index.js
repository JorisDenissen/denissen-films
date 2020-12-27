import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/Seo"
import { Wrapper, Image, Film, BottomEdgeDown } from './pageStyles/pageStyles'
import {COLORS} from '../constants'

const IndexPage = () => {
  const {
    wpcontent : {
      page: {
        homeMeta: {
          homePageDescription,
          homePageFeaturedFilms,
          homePageHeaderTitle,
          homePageBannerPhoto,
        }
      }
    }
  } = useStaticQuery(graphql`
    query {
      wpcontent{
        page(id: "home", idType: URI) {
          homeMeta {
            homePageDescription
            homePageFeaturedFilms {
              ... on WPGraphql_Film {
                id
                slug
                film {
                  director
                  title
                  poster {
                    sourceUrl
                    imageFile{
                      childImageSharp{
                        fluid(quality: 100){
                          ...GatsbyImageSharpFluid_withWebp
                        }
                      }
                    }
                    altText
                  }
                }
              }
            }
            homePageHeaderTitle
            homePageBannerPhoto {
              sourceUrl
              imageFile {
                childImageSharp{
                  fluid(quality: 100){
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
              altText
            }
          }
        } 
      }
    }
  `)
  return (
    <Layout>
      <SEO title="Home" />
      <Wrapper>
        <div className="banner">
          <Image fluid={homePageBannerPhoto.imageFile.childImageSharp.fluid} alt={homePageBannerPhoto.altText}/>
          <div className="inner-div">
            <p className="header-title">{homePageHeaderTitle}</p>
            <p className="header-description">{homePageDescription}</p>
          </div>
          <BottomEdgeDown color={COLORS.BLACK}/>
        </div>
        <div className="films">
          <h2>Featured Films</h2>
          <div className="film-items">
            {homePageFeaturedFilms.map(({film, slug}) => (
              <Film to={`/${slug}`}>
                <Image fluid={film.poster.imageFile.childImageSharp.fluid} alt={film.poster.altText}/>
                <div className="film-info">
                  <p>{film.title}</p>
                  <p>{film.director}</p>
                </div>
              </Film>
            ))}
          </div>
        </div>
      </Wrapper>
    </Layout>
  )
}

export default IndexPage
