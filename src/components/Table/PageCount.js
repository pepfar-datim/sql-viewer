import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React from 'react'

const PageCount = ({ maxRows, rowCount, totalRows }) => {
    const rowSingularPlural = totalRows === 1 ? i18n.t('row') : i18n.t('rows')

    return (
        <>
            {totalRows !== undefined && (
                <span>
                    {Math.min(maxRows, rowCount) === totalRows
                        ? i18n.t('Displaying {{total}} {{rowSingularPlural}}', {
                              total: new Intl.NumberFormat('en').format(
                                  totalRows
                              ),
                              rowSingularPlural: rowSingularPlural,
                          })
                        : i18n.t(
                              'Displaying {{current}} of {{total}} {{rowSingularPlural}}',
                              {
                                  current: new Intl.NumberFormat('en').format(
                                      Math.min(maxRows, rowCount)
                                  ),
                                  total: new Intl.NumberFormat('en').format(
                                      totalRows
                                  ),
                                  rowSingularPlural: rowSingularPlural,
                              }
                          )}
                </span>
            )}

            <style jsx>
                {`
                    span {
                        display: block;
                        color: var(--colors-grey700);
                        font-size: 14px;
                    }
                `}
            </style>
        </>
    )
}

PageCount.propTypes = {
    maxRows: PropTypes.number,
    rowCount: PropTypes.number,
    totalRows: PropTypes.number,
}

export default PageCount
