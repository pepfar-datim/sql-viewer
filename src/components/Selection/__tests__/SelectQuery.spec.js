import { DataQuery } from '@dhis2/app-runtime'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import SelectQuery from '../SelectQuery'

jest.mock('@dhis2/app-runtime', () => ({
    DataQuery: jest.fn(),
}))

describe('SelectQuery', () => {
    it('it renders error message if one is present', () => {
        DataQuery.mockImplementation(({ children }) => {
            return children({ error: { message: 'anteaters are cute!' } })
        })
        render(
            <SelectQuery
                id="abc"
                isSearchPage={true}
                moreButtonRef={{}}
                toggleLinksMenu={() => {}}
                variables={{}}
            />
        )
        expect(
            screen.getByText('Error: anteaters are cute!')
        ).toBeInTheDocument()
    })

    it('it displays query in data table if data is returned', () => {
        DataQuery.mockImplementation(({ children }) => {
            return children({
                data: {
                    sql: {
                        sqlViews: [{ id: 'abc', displayName: 'Finding Nemo' }],
                    },
                },
            })
        })
        render(
            <MemoryRouter>
                <SelectQuery
                    id="abc"
                    isSearchPage={true}
                    moreButtonRef={{}}
                    toggleLinksMenu={() => {}}
                    variables={{}}
                />
            </MemoryRouter>
        )
        expect(screen.getByText('Finding Nemo')).toBeInTheDocument()
    })
})
