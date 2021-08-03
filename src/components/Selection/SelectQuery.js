import { DataQuery } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import { Button, CircularLoader, IconView24 } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'
import CustomTable from '../Table/CustomTable'

const sqlViewsQuery = {
    sql: {
        resource: 'sqlViews',
        params: {
            fields: 'id,name,displayName',
        },
    },
}

const ViewQueryButton = ({ id }) => (
    <Link to={`/view/${id}`}>
        <Button small icon={<IconView24 />}>
            View
        </Button>
    </Link>
)

ViewQueryButton.propTypes = {
    id: PropTypes.string,
}

const SelectQuery = () => {
    const selectHeaders = [{ name: i18n.t('name') }]

    return (
        <DataQuery query={sqlViewsQuery}>
            {({ loading, error, data }) => (
                <>
                    <div className="innerContainer">
                        <h1 className="titleText">
                            {i18n.t('Select a SQL query to get started')}
                        </h1>
                        {loading && <CircularLoader />}
                        {error && <span>{`Error: ${error.message}`}</span>}
                        {data && (
                            <CustomTable
                                searchable={true}
                                tableData={data.sql.sqlViews.map(d => {
                                    return [
                                        <div key={`${d.id}_view`}>
                                            <Link
                                                to={`/view/${d.id}`}
                                                style={{
                                                    textDecoration: 'none',
                                                }}
                                            >
                                                <span
                                                    style={{ color: 'black' }}
                                                >
                                                    {d.displayName}
                                                </span>
                                            </Link>
                                        </div>,
                                    ]
                                })}
                                tableColumns={selectHeaders}
                            />
                        )}
                    </div>
                    <style jsx>{`
                        .titleText {
                            font-size: 24px;
                            font-weight: 700;
                            color: var(--colors-grey800);
                            margin: var(--spacers-dp24) 0 var(--spacers-dp12);
                            line-height: 20px;
                        }
                    `}</style>
                </>
            )}
        </DataQuery>
    )
}

export default SelectQuery