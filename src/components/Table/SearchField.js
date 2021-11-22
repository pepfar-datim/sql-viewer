import { InputField } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'

const SearchField = ({
    persistSearch,
    searchableDescription,
    setSearchText,
}) => {
    const [searchInput, setSearchInput] = useState('')
    const [searchTextTimeout, setSearchTextTimeout] = useState('')

    useEffect(() => {
        let searchTerm = ''
        if (persistSearch) {
            searchTerm = sessionStorage.getItem('searchTerm') || ''
        }
        setSearchInput(searchTerm)
        setSearchText(searchTerm)
    }, [])

    useEffect(() => {
        if (persistSearch) {
            sessionStorage.setItem('searchTerm', searchInput)
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
