import { useConfig } from '@dhis2/app-runtime'
import { InputField } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useQuery, getSearchTermLink } from '../../services/useQuery'

const SearchField = ({
    persistSearch,
    searchableDescription,
    setSearchText,
}) => {
    const { baseUrl } = useConfig()
    const query = useQuery()
    const [searchInput, setSearchInput] = useState('')
    const [searchTextTimeout, setSearchTextTimeout] = useState('')

    useEffect(() => {
        let searchTerm = ''
        if (persistSearch) {
            searchTerm =
                query['appSearchTerm'] ||
                sessionStorage.getItem('appSearchTerm') ||
                ''
        }
        setSearchInput(searchTerm)
        setSearchText(searchTerm)
    }, [])

    useEffect(() => {
        if (persistSearch) {
            window.history.pushState(
                null,
                null,
                getSearchTermLink({ searchTerm: searchInput, baseUrl })
            )
            sessionStorage.setItem('appSearchTerm', searchInput)
        }
    }, [searchInput])

    const setSearchTextWithDebounce = searchString => {
        setSearchInput(searchString)
        clearTimeout(searchTextTimeout)
        setSearchTextTimeout(
            setTimeout(() => {
                setSearchText(searchString)
            }, 1000)
        )
    }

    return (
        <InputField
            name="searchField"
            onChange={e => setSearchTextWithDebounce(e.value)}
            placeholder={searchableDescription}
            value={searchInput}
            inputWidth="400px"
        />
    )
}

SearchField.propTypes = {
    persistSearch: PropTypes.bool,
    searchableDescription: PropTypes.string,
    setSearchText: PropTypes.func,
}

export default SearchField
