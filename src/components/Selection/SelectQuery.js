import { DataQuery } from '@dhis2/app-runtime'
import { Button, IconView24 } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'
import CustomTable from '../Table/CustomTable'

const sqlViewsQuery = {
    sql: {
        resource: 'sqlViews',
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
    const selectHeaders = [{ name: 'name' }]

    return (
        <DataQuery query={sqlViewsQuery}>
            {({ loading, error, data }) => (
                <>
                    <div className="innerContainer">
                        <h1 className="titleText">
                            Select a SQL query to get started.
                        </h1>
                        {loading && <span>Loading...</span>}
                        {error && <span>{`Error: ${error.message}`}</span>}
                        {data && (
                            <CustomTable
                                searchable={true}
                                tableData={data.sql.sqlViews.map(d => {
                                    return [
                                        <Link
                                            to={`/view/${d.id}`}
                                            style={{ textDecoration: 'none' }}
                                        >
                                            <span style={{ color: 'black' }}>
                                                {d.displayName}
                                            </span>
                                        </Link>,
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
