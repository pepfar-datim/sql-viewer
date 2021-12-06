import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import LinksMenu from '../LinksMenu'

jest.mock('@dhis2/ui', () => ({
    Menu: ({ children }) => {
        return (
            <div>
                <>{children}</>
            </div>
        )
    },
    MenuItem: ({ label }) => {
        return (
            <div>
                <span>{label}</span>
            </div>
        )
    },
    Popover: ({ children }) => {
        return (
            <div>
                <>{children}</>
            </div>
        )
    },
    IconEdit24: () => {
        return <div></div>
    },
    IconLink24: () => {
        return <div></div>
    },
    IconView24: () => {
        return <div></div>
    },
}))

jest.mock('react-router-dom', () => ({
    Link: ({ children }) => {
        return (
            <div>
                <>{children}</>
            </div>
        )
    },
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
