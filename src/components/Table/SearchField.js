import { InputField, IconSearch24 } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, { useState } from 'react'

const SearchField = ({ setSearchText }) => {
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
        <>
            <InputField
                name="searchField"
                onChange={e => setSearchTextWithDebounce(e.value)}
                label={
                    <div className="labelContainer">
                        <IconSearch24 />
                        <span>Search within query results</span>
                    </div>
                }
                value={searchInput}
                inputWidth="400px"
                className="variableInput"
            />
            <style jsx>{`
                .labelContainer {
                    display: flex;
                    align-items: center;
                }
            `}</style>
        </>
    )
}

SearchField.propTypes = {
    setSearchText: PropTypes.func,
}

export default SearchField
