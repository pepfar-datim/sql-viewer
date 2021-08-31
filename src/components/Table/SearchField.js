import { InputField } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, { useState } from 'react'

const SearchField = ({ searchableDescription, setSearchText }) => {
    const [searchInput, setSearchInput] = useState('')
    const [searchTextTimeout, setSearchTextTimeout] = useState('')

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
    searchableDescription: PropTypes.string,
    setSearchText: PropTypes.func,
}

export default SearchField
