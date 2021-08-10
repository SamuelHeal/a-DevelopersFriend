import React from 'react'
import ReactDOM from 'react-dom';


import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import Style from 'style-it';

import './codeEditor.css'


import { QUERY_FRONT_END_FILE } from '../../utils/queries'

import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

function FrontEnd() {

    const { fileID } = useParams()


    const { loading, data } = useQuery(QUERY_FRONT_END_FILE, {
        variables: { fileID }
    })

    console.log(data)

    const html = data.frontEndFile.html
    const css = data.frontEndFile.css

    function renderHTML() {
        return (
            <> 
                {ReactHtmlParser(html)}
            </>
        )
    }

    function renderCSS() {
        return (
            <Style>
                {css}
                <div>
                    {renderHTML().props.children}
                </div>
            </Style>
            
        )
    }

    class Render extends React.Component {
        render() {
            return Style.it (
                this.props.cssText,
                <div>
                    {renderHTML().props.children}
                </div>
            )
        }
    }

    console.log(renderHTML().props.children)

    console.log(css)


    if (loading) {
        return (
            <h1>loading...</h1>
        )
    }

    

    return (
        <div className='renderContainer'>
            
                <Render cssText={css} />
            
        </div>
    )
}

export default FrontEnd
