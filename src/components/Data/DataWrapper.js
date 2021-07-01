import { useDataEngine, useDataQuery } from '@dhis2/app-runtime'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { executeQuery } from '../../api/miscellaneous'
import { parameterizeVariables } from '../../services/extractVariables'
import CustomTable from '../Table/CustomTable'
import TableQueryRow from '../Table/TableQueryRow'
import ErrorMessage from './ErrorMessage'

const sqlDataQuery = {
    sqlData: {
        resource: 'sqlViews/',
        id: ({ id }) => id,
    },
}

const DataWrapper = ({ variables, id, isView }) => {
    const [variablesUsed, setVariablesUsed] = useState({})
    const engine = useDataEngine()
    const { loading, error, data, refetch } = useDataQuery(sqlDataQuery, {
        variables: { id: `${id}/data?paging=false` },
    })

    const refreshQuery = async () => {
        if (isView) {
            await executeQuery(engine, id)
            refetch({ id: `${id}/data?paging=false` })
        } else {
            const hackeyID = `${id}/data?paging=false${parameterizeVariables(
                variables
            )}`
            setVariablesUsed(variables)
            refetch({ id: hackeyID })
        }
    }

    // move to 'api'?
    const getDownloadURL = () => {
        return `${engine.link.baseUrl}/${
            engine.link.apiPath
        }/sqlViews/${id}/data.csv?paging=false${parameterizeVariables(
            variablesUsed
        )}`
    }

    return (
        <>
            {loading && <p>Loading...</p>}
            {error && (
                <>
                    <TableQueryRow refreshQuery={refreshQuery} />
                    <ErrorMessage error={error} />
                </>
            )}
            {data && (
                <CustomTable
                    searchable={true}
                    refreshQuery={refreshQuery}
                    tableData={data.sqlData.listGrid.rows}
                    tableColumns={data.sqlData.listGrid.headers}
                    downloadURL={getDownloadURL()}
                />
            )}
        </>
    )
}

DataWrapper.propTypes = {
    id: PropTypes.string,
    isView: PropTypes.bool,
    variables: PropTypes.object,
}

export default DataWrapper
