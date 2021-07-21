import i18n from '@dhis2/d2-i18n'
import { Button, IconSync24 } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import SearchField from './SearchField'

const TableQueryRow = ({ setSearchText, refreshQuery }) => (
    <>
        <div className="queryStrip">
            {setSearchText && <SearchField setSearchText={setSearchText} />}
            {refreshQuery && (
                <div className="rightButtonOuter">
                    <div>
                        <Button
                            icon={<IconSync24 />}
                            primary
                            onClick={() => {
                                refreshQuery()
                            }}
                        >
                            {i18n.t('Refresh Query')}
                        </Button>
                    </div>
                </div>
            )}
        </div>

        <style jsx>
            {`
                .queryStrip {
                    display: flex;
                    align-items: center;
                    margin-top: var(--spacers-dp12);
                    min-height: 60px;
                }
                .rightButtonOuter {
                    margin-top: auto;
                    margin-left: auto;
                }
            `}
        </style>
    </>
)

TableQueryRow.propTypes = {
    refreshQuery: PropTypes.func,
    setSearchText: PropTypes.func,
}

export default TableQueryRow
