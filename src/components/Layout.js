import { CssVariables } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'

const Layout = ({ children }) => (
    <>
        <CssVariables colors spacers />
        <>{children}</>
        <style jsx global>{`
            :root {
                --drawer-width: 300px;
                --drawer-width-offset: -300px;
            }
            body {
                background-color: white;
            }
            .innerContainer {
                margin: 10px;
                height: 100%;
            }
        `}</style>
    </>
)

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Layout
