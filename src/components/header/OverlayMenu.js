import React from 'react'
import {useStaticQuery, graphql, Link} from 'gatsby'
import {OverlayWrapper, Image, CloseButton, MenuList} from './headerStyles/headerStyles'

const OverlayMenu = ({handleOverlayMenu, menuOpen}) => {
    const {
        logo,
        wpcontent: {
          menuItems: {
              edges: menuItems
          }
        },
      } = useStaticQuery(graphql`
        query {
          logo: file(relativePath: {eq: "Denissen-films_logo.png"}){
            childImageSharp {
              fixed(quality: 100, width: 200){
                ...GatsbyImageSharpFixed_withWebp
              }
            }
          }
          wpcontent {
            menuItems {
              edges {
                node {
                  label
                  path
                }
              }
            }
          }
        }
      `)
    return(
        <>
            {menuOpen && (
                <OverlayWrapper>
                    <CloseButton onClick={handleOverlayMenu}>X</CloseButton>
                    <Link to="/" style={{marginBottom: "1.5rem"}}>
                        <Image alt="Logo Denissen Films" fixed={logo.childImageSharp.fixed}/>
                    </Link>
                    <MenuList style={{flexDirection: "column"}}>
                        {menuItems.map(({node: item}, i) => (
                            <li key={i}>
                                <Link activeClassName="nav-active" to={item.path}>
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </MenuList>
                </OverlayWrapper>
            )}
        </>
    )
}


export default OverlayMenu;