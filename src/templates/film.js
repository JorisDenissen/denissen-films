import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import SEO from '../components/Seo'
import {Wrapper, Image} from './templateStyles/filmStyles'

const FilmTemplate = ({
    data: {
        wpcontent: {
            film: {
                film, 
                genres: {edges: genres}
            }
        }
    }
}) => {
    const screenshot1 = film.screenshots.screenshot1;
    const screenshot2 = film.screenshots.screenshot2;
    const screenshot3 = film.screenshots.screenshot3;
    const screenshots = [screenshot1, screenshot2, screenshot3];
    console.log(screenshots)
    return(
        <Layout>
            <SEO title="Film"/>
            <Wrapper>
                <div className="film-container">
                    <div className="film-image">
                        <Image fluid={film.poster.imageFile.childImageSharp.fluid} alt={film.poster.altText}/>
                        <div className="genres">
                            {genres.map(({node: genre}, i) => (
                                <div key={i} className="genre">{genre.name}</div>
                            ))}
                        </div>
                    </div>
                    <div className="film-info">
                        <h2>{film.title}</h2>
                        <h3><span>{film.director}</span> - <span>{film.releaseDate}</span></h3>
                        <p className="description">{film.plotSummary}</p>
                        <p className="info"><strong>ImDB rating: <span>{film.rating}</span><span>/10</span></strong></p>
                    </div>
                </div>
                <div className="film-pictures">
                    {screenshots.map(screenshot => (
                        <div className="film-picture">
                            <Image fluid={screenshot.imageFile.childImageSharp.fluid} alt={screenshots.altText}/>
                        </div>
                    ))}
                </div>
            </Wrapper>
        </Layout>
    )
}

export default FilmTemplate

export const pageQuery = graphql`
    query ($id: ID!) {
        wpcontent {
            film(id: $id, idType: ID) {
                film {
                    title
                    director
                    rating
                    releaseDate
                    plotSummary
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
                    screenshots {
                        screenshot1 {
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
                        screenshot2 {
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
                        screenshot3 {
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
                genres {
                    edges {
                        node {
                            name
                        }
                    }
                }
                id
            }
        }
    }
`