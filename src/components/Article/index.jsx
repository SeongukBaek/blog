import styled from "styled-components"

import Header from "./Header"
import Series from "./Series"
import Body from "./Body"
import Footer from "./Footer"

const Article = styled.article`
    border-radius: 10px;
    box-shadow: 0 0 8px ${props => props.theme.colors.headerShadow};
    padding: 15px 50px;
    @media (max-width: 1300px) {
        padding: 10px 0px;
    }
`

Article.Header = Header
Article.Series = Series
Article.Body = Body
Article.Footer = Footer

export default Article