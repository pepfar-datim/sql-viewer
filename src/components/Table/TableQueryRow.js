import i18n from '@dhis2/d2-i18n'
import { Button, IconSync24 } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import PageCount from './PageCount'
import SearchField from './SearchField'

const TableQueryRow = ({
    maxRows,
    persistSearch,
    rowCount,
    searchableDescription,
    setSearchText,
    refreshQuery,
    totalRows,
}) => (
    <>
        <div className="queryStrip">
            {setSearchText && (
                <SearchField
                    persistSearch={persistSearch}
                    searchableDescription={searchableDescription}
                    setSearchText={setSearchText}
                />
            )}
            <div className="pageCountContainer">
                <PageCount
                    maxRows={maxRows}
                    rowCount={rowCount}
                    totalRows={totalRows}
                />
            </div>
            {refreshQuery && (
                <div className="rightButtonOuter">
                    <div>
                        <Button
                            dataTest="refresh-query-right"
                            icon={<IconSync24 />}
                            primary
                            onClick={() => {
                                refreshQuery()
                            }}
                        >
                            {i18n.t('Refresh query')}
                        </Button>
                    </div>
                </div>
            )}
        </div>

        <style jsx>
            {`
                .queryStrip {
                    display: flex;
                    align-items: flex-end;
                    margin-top: var(--spacers-dp12);
                    min-height: 60px;
                }
                .pageCountContainer {
                    margin-left: var(--spacers-dp16);
                }
                .rightButtonOuter {
                    margin-left: auto;
                }
            `}
        </style>
    </>
)

TableQueryRow.propTypes = {
    maxRows: PropTypes.number,
    persistSearch: PropTypes.bool,
    refreshQuery: PropTypes.func,
    rowCount: PropTypes.number,
    searchableDescription: PropTypes.string,
    setSearchText: PropTypes.func,
    totalRows: PropTypes.number,
}

export default TableQueryRow
