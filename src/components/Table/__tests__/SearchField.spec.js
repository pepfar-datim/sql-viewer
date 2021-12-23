import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import React from 'react'
import { useQuery, getSearchTermLink } from '../../../services/useQuery'
import SearchField from '../SearchField'

jest.mock('../../../services/useQuery')

describe('SearchField', () => {
    let setItemSpy, getItemSpy
    const mockStorage = { appSearchTerm: 'Piglet' }

    beforeEach(() => {
        useQuery.mockImplementation(() => ({}))
        getSearchTermLink.mockImplementation(() =>
            jest.fn(() => 'path/to?appSearchTerm:Eeyore')
        )
    })

    beforeAll(() => {
        setItemSpy = jest
            .spyOn(global.Storage.prototype, 'setItem')
            .mockImplementation((key, value) => {
                mockStorage[key] = value
            })
        getItemSpy = jest
            .spyOn(global.Storage.prototype, 'getItem')
            .mockImplementation(key => mockStorage[key])
    })

    afterAll(() => {
        // detach spies to avoid breaking other test suites
        getItemSpy.mockRestore()
        setItemSpy.mockRestore()
    })

    it('populates with the appSearchTerm value from sessionStorage if no search term in URL', async () => {
        render(
            <SearchField
                persistSearch={true}
                searchableDescription="search and ye shall find"
                setSearchText={() => {}}
            />
        )
        const inputNode = await screen.findByPlaceholderText(
            'search and ye shall find'
        )
        await waitFor(() => expect(inputNode).toHaveValue('Piglet'))
    })

    it('populates with the appSearchTerm value from URL if provided', async () => {
        useQuery.mockImplementation(() => ({ appSearchTerm: 'Eeyore' }))
        render(
            <SearchField
                persistSearch={true}
                searchableDescription="search and ye shall find"
                setSearchText={() => {}}
            />
        )
        const inputNode = await screen.findByPlaceholderText(
            'search and ye shall find'
        )
        await waitFor(() => expect(inputNode).toHaveValue('Eeyore'))
    })

    it('updates the search term when a user inputs a new value', async () => {
        render(
            <SearchField
                persistSearch={true}
                searchableDescription="search and ye shall find"
                setSearchText={() => {}}
            />
        )
        const inputNode = await screen.findByPlaceholderText(
            'search and ye shall find'
        )
        fireEvent.change(inputNode, { target: { value: 'Tigger' } })
        await waitFor(() => expect(inputNode).toHaveValue('Tigger'))
    })

    it('ignores storage and url search term if persistSearch is set to false', async () => {
        render(
            <SearchField
                persistSearch={false}
                searchableDescription="search and ye shall find"
                setSearchText={() => {}}
            />
        )
        const inputNode = await screen.findByPlaceholderText(
            'search and ye shall find'
        )
        await waitFor(() => expect(inputNode).toHaveValue(''))
    })
})
