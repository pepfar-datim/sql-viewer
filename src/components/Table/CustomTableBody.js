import {
    Table,
    TableBody,
    TableCell,
    TableCellHead,
    TableHead,
    TableRow,
    TableRowHead,
    IconArrowDown24,
    IconArrowUp24,
} from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, { useState, isValidElement } from 'react'

const CustomTableRow = ({ row }) => (
    <TableRow>
        {row.map(d => {
            if (d === null) {
                return <TableCell />
            }
            if (isValidElement(d)) {
                return <TableCell>{d}</TableCell>
            }
            if (typeof d === 'object') {
                return <TableCell>{JSON.stringify(d)}</TableCell>
            }

            return <TableCell>{d}</TableCell>
        })}
    </TableRow>
)

CustomTableRow.propTypes = {
    row: PropTypes.object,
}

const CustomTableBody = ({ maxRows, pagePosition, rows, headers }) => {
    const [sortedColumn, setSortedColumn] = useState({ column: '', up: true })

    const setSortColumn = columnName => {
        if (sortedColumn.column === columnName) {
            if (sortedColumn.up) {
                setSortedColumn({ column: columnName, up: false })
            } else {
                setSortedColumn({ column: '', up: true })
            }
        } else {
            setSortedColumn({ column: columnName, up: true })
        }
    }

    // move
    const sortRows = rows => {
        if (!sortedColumn.column) {
            return rows
        }

        const searchSettings = { numeric: true, sensitivity: 'base' }

        const rowsToSort = [...rows]
        const i = headers.map(h => h.name).indexOf(sortedColumn.column)
        if (sortedColumn.up) {
            return rowsToSort.sort((a, b) =>
                b[i] === null || b[i] === ''
                    ? -1
                    : a[i]
                          .toString()
                          .localeCompare(b[i], undefined, searchSettings)
            )
        }
        // if using, rewrite as function to avoid duplication
        return rowsToSort.sort((a, b) =>
            b[i] === null || b[i] === ''
                ? -1
                : b[i].toString().localeCompare(a[i], undefined, searchSettings)
        )
    }

    return (
        <>
            <div className="tableContainer">
                <Table>
                    <TableHead>
                        <TableRowHead>
                            {headers.map(h => (
                                <TableCellHead key={`headerCell_${h.name}`}>
                                    {h.notSortable ? (
                                        <div>
                                            <span>{h.name}</span>
                                        </div>
                                    ) : (
                                        <div
                                            onClick={() => {
                                                setSortColumn(h.name)
                                            }}
                                        >
                                            <span>{h.name}</span>
                                            {h.name == sortedColumn.column &&
                                                (sortedColumn.up ? (
                                                    <IconArrowUp24 />
                                                ) : (
                                                    <IconArrowDown24 />
                                                ))}
                                        </div>
                                    )}
                                </TableCellHead>
                            ))}
                        </TableRowHead>
                    </TableHead>
                    <TableBody>
                        {sortRows(rows)
                            .slice(
                                maxRows * pagePosition,
                                maxRows * (pagePosition + 1)
                            )
                            .map(row => (
                                <CustomTableRow row={row} />
                            ))}
                    </TableBody>
                </Table>
            </div>
            <style jsx>{`
                .tableContainer {
                    margin: 10px 0px 0px 0px;
                }
            `}</style>
        </>
    )
}

CustomTableBody.propTypes = {
    headers: PropTypes.array,
    maxRows: PropTypes.number,
    pagePosition: PropTypes.number,
    rows: PropTypes.array,
}

export default CustomTableBody
