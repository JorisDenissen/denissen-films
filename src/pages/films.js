import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/Seo'
import { Wrapper, Image, BottomEdgeUp, BottomEdgeDown, Film} from '../pageStyles/pageStyles'
import { COLORS } from '../constants'

const FilmsPage = () => {
    const {
        wpcontent:{
            page:{
                filmsMeta:{
                    filmsPageDescription,
                    filmsPageBannerPhoto
                }
            },
            films:{
                edges: films
            }
        }
    } = useStaticQuery(graphql`
        query {
            wpcontent {
                page(id: "films", idType: URI) {
                    filmsMeta {
                        filmsPageDescription
                        filmsPageBannerPhoto {
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
                films {
                    edges {
                        node {
                            film {
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
                                director
                            }
                            slug
                        }
                    }
                }
            }
        }
    `)
    return(
        <Layout>
            <SEO title="Films"/>
            <Wrapper filmsColor={COLORS.BLACK} descriptionColor={COLORS.SECONDARY}>
                <div className="banner">
                    <Image fluid={filmsPageBannerPhoto.imageFile.childImageSharp.fluid} alt={filmsPageBannerPhoto.altText}/>
                    <BottomEdgeDown color={COLORS.SECONDARY}/>
                </div>
                <div className="description">
                    <h2>Onze film collectie!</h2>
                    <p>{filmsPageDescription}</p>
                    <BottomEdgeUp color={COLORS.BLACK}/>
                </div>
                <div className="films">
                   <div className="film-items">
                       {films.map(({node: {film, slug}}, i) => (
                           <Film to={`/${slug}`} key={i}>
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

export default FilmsPage