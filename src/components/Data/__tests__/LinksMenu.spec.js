import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import PropTypes from 'prop-types'
import React from 'react'
import LinksMenu from '../LinksMenu'

const MockMenu = ({ children }) => (
    <div>
        <>{children}</>
    </div>
)

MockMenu.propTypes = {
    children: PropTypes.node,
}

const MockMenuItem = ({ label }) => (
    <div>
        <span>{label}</span>
    </div>
)

MockMenuItem.propTypes = {
    label: PropTypes.string,
}

const MockPopover = ({ children }) => (
    <div>
        <>{children}</>
    </div>
)

MockPopover.propTypes = {
    children: PropTypes.node,
}

const MockIconEdit24 = () => <div></div>

const MockIconLink24 = () => <div></div>

const MockIconView24 = () => <div></div>

jest.mock('@dhis2/ui', () => ({
    Menu: ({ children }) => MockMenu({ children }),
    MenuItem: ({ label }) => MockMenuItem({ label }),
    Popover: ({ children }) => MockPopover({ children }),
    IconEdit24: () => MockIconEdit24(),
    IconLink24: () => MockIconLink24(),
    IconView24: () => MockIconView24(),
}))

const MockLink = ({ children }) => (
    <div>
        <>{children}</>
    </div>
)

MockLink.propTypes = {
    children: PropTypes.node,
}

jest.mock('react-router-dom', () => ({
    Link: ({ children }) => MockLink({ children }),
}))

describe('LinksMenu', () => {
    it('if on search page, has open in sql viewer link but no copy link xlink', () => {
        render(
            <LinksMenu
                id="abc"
                isSearchPage={true}
                moreButtonRef={{}}
                toggleLinksMenu={() => {}}
                variables={{}}
            />
        )
        expect(screen.getByText('open in sql viewer')).toBeInTheDocument()
        expect(screen.queryByText('copy link')).not.toBeInTheDocument()
    })

    it('if on details page, has copy link but no open in sql viewer link', () => {
        render(
            <LinksMenu
                id="abc"
                isSearchPage={false}
                moreButtonRef={{}}
                toggleLinksMenu={() => {}}
                variables={{}}
            />
        )
        expect(screen.queryByText('open in sql viewer')).not.toBeInTheDocument()
        expect(screen.getByText('copy link')).toBeInTheDocument()
    })
})
