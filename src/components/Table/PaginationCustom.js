import i18n from '@dhis2/d2-i18n'
import {
    Button,
    ButtonStrip,
    SingleSelect,
    SingleSelectOption,
    IconArrowLeft16,
    IconArrowRight16,
} from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'

const PaginationCustom = ({
    maxRows,
    setMaxRows,
    rowCount,
    totalRows,
    pagePosition,
    setPagePosition,
}) => {
    const allOption = i18n.t('All')
    const displayCountOptions = [10, 20, 50, allOption]

    const updateMaxRows = countSelection => {
        if (countSelection === allOption) {
            countSelection = totalRows
        }
        countSelection = parseInt(countSelection)
        setPagePosition(0)
        setMaxRows(countSelection)
    }
    return (
        <>
            <div className="paginationDiv">
                <span>
                    {i18n.t('Displaying {{current}} of {{total}} rows', {
                        current: Math.min(maxRows, rowCount),
                        total: totalRows,
                    })}
                </span>
                <span className="paginationElementHalf">{` | `}</span>
                <span className="paginationElementHalf">
                    {i18n.t('Page {{position}} of {{maxPage}}', {
                        position: pagePosition + 1,
                        maxPage: Math.ceil(rowCount / maxRows),
                    })}
                </span>
                <div className="paginationElement">
                    <ButtonStrip>
                        <Button
                            icon={<IconArrowLeft16 />}
                            disabled={pagePosition === 0}
                            onClick={() => {
                                setPagePosition(pagePosition - 1)
                            }}
                        >
                            {i18n.t('Previous')}
                        </Button>
                        <Button
                            icon={<IconArrowRight16 />}
                            disabled={
                                pagePosition ===
                                Math.ceil(rowCount / maxRows) - 1
                            }
                            onClick={() => {
                                setPagePosition(pagePosition + 1)
                            }}
                        >
                            {i18n.t('Next')}
                        </Button>
                    </ButtonStrip>
                </div>
                <div className="paginationDiv paginationElement">
                    <SingleSelect
                        prefix={`${i18n.t('Rows to display')}: `}
                        selected={
                            maxRows === totalRows
                                ? allOption
                                : maxRows.toString()
                        }
                        onChange={e => {
                            updateMaxRows(e.selected)
                        }}
                    >
                        {displayCountOptions.map(k => (
                            <SingleSelectOption
                                label={k}
                                key={`row_count_select_${k}`}
                                value={k.toString()}
                            />
                        ))}
                    </SingleSelect>
                </div>
            </div>
            <style jsx>
                {`
                    .paginationDiv {
                        display: flex;
                        align-items: center;
                        margin-left: auto;
                    }
                    .paginationElement {
                        margin-left: 16px;
                    }
                    .paginationElementHalf {
                        margin-left: 8px;
                    }
                    span {
                        color: var(--colors-grey700);
                        font-size: 14px;
                    }
                `}
            </style>
        </>
    )
}

PaginationCustom.propTypes = {
    maxRows: PropTypes.number,
    pagePosition: PropTypes.number,
    rowCount: PropTypes.number,
    setMaxRows: PropTypes.func,
    setPagePosition: PropTypes.func,
    totalRows: PropTypes.number,
}

export default PaginationCustom
