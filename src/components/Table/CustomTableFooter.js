import i18n from '@dhis2/d2-i18n'
import { Button, IconDownload16 } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import PaginationCustom from './PaginationCustom'

const CustomTableFooter = ({
    maxRows,
    setMaxRows,
    downloadURL,
    enablePagination,
    rowCount,
    totalRows,
    pagePosition,
    setPagePosition,
}) => (
    <>
        <div className="tableEnd">
            {downloadURL && (
                <Button
                    icon={<IconDownload16 />}
                    onClick={() => {
                        window.open(downloadURL)
                    }}
                >
                    {i18n.t('Download CSV')}
                </Button>
            )}
            <PaginationCustom
                enablePagination={enablePagination}
                maxRows={maxRows}
                setMaxRows={setMaxRows}
                rowCount={rowCount}
                totalRows={totalRows}
                pagePosition={pagePosition}
                setPagePosition={setPagePosition}
            />
        </div>
        <style jsx>{`
            .tableEnd {
                margin-top: var(--spacers-dp8);
                margin-bottom: var(--spacers-dp16);
                min-height: 20px;
                display: flex;
            }
        `}</style>
    </>
)

CustomTableFooter.propTypes = {
    downloadURL: PropTypes.string,
    enablePagination: PropTypes.bool,
    maxRows: PropTypes.number,
    pagePosition: PropTypes.number,
    rowCount: PropTypes.number,
    setMaxRows: PropTypes.func,
    setPagePosition: PropTypes.func,
    totalRows: PropTypes.number,
}

export default CustomTableFooter
