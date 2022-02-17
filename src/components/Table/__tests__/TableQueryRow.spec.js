import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import React from 'react'
import SearchField from '../SearchField'
import TableQueryRow from '../TableQueryRow'

jest.mock('../SearchField')

describe('TableQueryRow', () => {
    beforeEach(() => {
        SearchField.mockImplementation(({ searchableDescription }) => (
            <span>{searchableDescription}</span>
        ))
    })

    it('displays SearchField component when setSearchText provided', () => {
        render(
            <TableQueryRow
                maxRows={10}
                persistSearch={true}
                refreshQuery={() => {}}
                rowCount={100}
                searchableDescription={'Find Nemo (and other things)'}
                setSearchText={() => {}}
                totalRows={100}
            />
        )
        expect(
            screen.getByText('Find Nemo (and other things)')
        ).toBeInTheDocument()
    })

    it('triggers refreshQuery when Refresh Query button is clicked', () => {
        const mockRefresh = jest.fn(() => {})
        render(
            <TableQueryRow
                maxRows={10}
                persistSearch={true}
                refreshQuery={mockRefresh}
                rowCount={100}
                searchableDescription={'Find Nemo (and other things)'}
                setSearchText={() => {}}
                totalRows={100}
            />
        )
        fireEvent.click(screen.getByText('Refresh Query'))
        expect(mockRefresh).toHaveBeenCalledTimes(1)
    })
})
