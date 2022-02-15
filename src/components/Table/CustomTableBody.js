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
import { convertGzip } from '../../services/convertGzip'

const generateRandomKey = keyLength => {
    let key = ''
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    for (let i = 0; i < keyLength; i++) {
        key += chars[Math.floor(Math.random() * chars.length)]
    }
    return key
}

const CustomTableRow = ({ row }) => (
    <TableRow>
        {row.map(d => {
            const randomKey = generateRandomKey(6)
            if (d === null) {
                return <TableCell key={randomKey} />
            }

            const displayItem = d.display || d

            if (isValidElement(displayItem)) {
                return <TableCell key={randomKey}>{displayItem}</TableCell>
            }
            if (['object', 'boolean'].includes(typeof displayItem)) {
                return (
                    <TableCell key={randomKey}>
                        {JSON.stringify(displayItem)}
                    </TableCell>
                )
            }
            if (typeof displayItem === 'string') {
                return (
                    <TableCell key={randomKey}>
                        {convertGzip(displayItem)}
                    </TableCell>
                )
            }

            return <TableCell key={randomKey}>{displayItem}</TableCell>
        })}
    </TableRow>
)

CustomTableRow.propTypes = {
    row: PropTypes.array,
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

    const performSort = (a, b) => {
        const searchSettings = { numeric: true, sensitivity: 'base' }
        if (a === null || a === '') return 1
        a = a.text || a
        if (b === null || b === '') return -1
        b = b.text || b
        return a.toString().localeCompare(b, undefined, searchSettings)
    }
    const sortRows = rows => {
        if (!sortedColumn.column) {
            return rows
        }

        const rowsToSort = [...rows]
        const i = headers.map(h => h.name).indexOf(sortedColumn.column)
        if (sortedColumn.up) {
            return rowsToSort.sort((a, b) => performSort(a[i], b[i]))
        }
        // if using, rewrite as function to avoid duplication
        return rowsToSort.sort((a, b) => performSort(b[i], a[i]))
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
                                <CustomTableRow
                                    key={generateRandomKey(6)}
                                    row={row}
                                />
                            ))}
                    </TableBody>
                </Table>
            </div>
            <style jsx>{`
                .tableContainer {
                    margin: var(--spacers-dp16) 0px 0px 0px;
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
