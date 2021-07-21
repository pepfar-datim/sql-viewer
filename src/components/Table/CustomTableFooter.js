import i18n from '@dhis2/d2-i18n'
import { Button, IconDownload16 } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import PaginationCustom from './PaginationCustom'

const CustomTableFooter = ({
    maxRows,
    setMaxRows,
    downloadURL,
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
                display: flex;
                margin: 10px 0px 0px 20px;
            }
        `}</style>
    </>
)

CustomTableFooter.propTypes = {
    downloadURL: PropTypes.string,
    maxRows: PropTypes.number,
    pagePosition: PropTypes.number,
    rowCount: PropTypes.number,
    setMaxRows: PropTypes.func,
    setPagePosition: PropTypes.func,
    totalRows: PropTypes.number,
}

export default CustomTableFooter
