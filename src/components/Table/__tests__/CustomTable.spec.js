import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import React from 'react'
import CustomTable from '../CustomTable'
import SearchField from '../SearchField'

jest.mock('../SearchField')

describe('CustomTable', () => {
    beforeEach(() => {
        SearchField.mockImplementation(
            ({ searchableDescription, setSearchText }) => (
                <input
                    placeholder={searchableDescription}
                    onChange={e => {
                        setSearchText(e.target.value)
                    }}
                />
            )
        )
    })

    const mockHeaders = [{ name: 'name' }, { name: 'known for' }]
    const mockRows = [
        ['Pippi', 'Lifting horses'],
        ['Nils', 'Flying a goose'],
        ['Moomin', 'Not being a hippo'],
    ]

    it('renders', async () => {
        render(
            <CustomTable
                downloadURL="path/to/download"
                persistSearch={true}
                refreshQuery={() => {}}
                searchable={true}
                searchableDescription="Search here!"
                tableColumns={mockHeaders}
                tableData={mockRows}
            />
        )
        const inputNode = await screen.findByPlaceholderText('Search here!')
        fireEvent.change(inputNode, { target: { value: 'Moomin' } })
        await waitFor(() =>
            expect(screen.queryByText('Pippi')).not.toBeInTheDocument()
        )
    })
})
