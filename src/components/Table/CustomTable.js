import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import CustomTableBody from './CustomTableBody'
import CustomTableFooter from './CustomTableFooter'
import TableQueryRow from './TableQueryRow'

const CustomTable = ({
    searchable,
    refreshQuery,
    tableData,
    tableColumns,
    downloadURL,
}) => {
    const [filteredRows, setFilteredRows] = useState(tableData)

    const [pagePosition, setPagePosition] = useState(0)
    const [maxRows, setMaxRows] = useState(10)

    const filterBySearch = (data, searchTerm) => {
        setPagePosition(0)
        setFilteredRows(
            data.filter(
                datim =>
                    datim.filter(i =>
                        i === null
                            ? false
                            : (i.text || i)
                                  .toString()
                                  .toLowerCase()
                                  .indexOf(searchTerm.toLowerCase()) >= 0
                    ).length > 0
            )
        )
    }

    const setSearchText = searchTerm => {
        filterBySearch(tableData, searchTerm)
    }

    useEffect(() => {
        setFilteredRows(tableData)
    }, [tableData])

    return (
        <>
            <TableQueryRow
                setSearchText={searchable ? setSearchText : null}
                refreshQuery={refreshQuery}
            />
            <CustomTableBody
                pagePosition={pagePosition}
                maxRows={maxRows}
                rows={filteredRows}
                totalRows={tableData.length}
                headers={tableColumns}
                downloadURL={downloadURL}
            />
            <CustomTableFooter
                downloadURL={downloadURL}
                maxRows={maxRows}
                setMaxRows={setMaxRows}
                rowCount={filteredRows.length}
                totalRows={tableData.length}
                pagePosition={pagePosition}
                setPagePosition={setPagePosition}
            />
        </>
    )
}
/*

*/
CustomTable.propTypes = {
    downloadURL: PropTypes.string,
    refreshQuery: PropTypes.func,
    searchable: PropTypes.bool,
    tableColumns: PropTypes.array,
    tableData: PropTypes.array,
}

export default CustomTable
