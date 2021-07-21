import { useDataEngine, useDataQuery } from '@dhis2/app-runtime'
import { CircularLoader } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { executeQuery } from '../../api/miscellaneous'
import { parameterizeVariablesQuery } from '../../services/extractVariables'
import CustomTable from '../Table/CustomTable'
import TableQueryRow from '../Table/TableQueryRow'
import ErrorMessage from './ErrorMessage'

const sqlDataQuery = {
    sqlData: {
        resource: 'sqlViews/',
        id: ({ id }) => id,
        params: ({ queryVariables }) => ({
            paging: false,
            var: queryVariables,
        }),
    },
}

const DataWrapper = ({ variables, id, isView, setRefreshQuery }) => {
    const [variablesUsed, setVariablesUsed] = useState({})
    const engine = useDataEngine()
    const { loading, error, data, refetch } = useDataQuery(sqlDataQuery, {
        variables: { id: `${id}/data` },
    })

    const refreshQuery = async givenVariables => {
        let refreshVariables = variables
        if (givenVariables !== undefined) {
            refreshVariables = givenVariables
        }
        if (isView) {
            executeQuery.resource = `sqlViews/${id}/execute`
            await engine.mutate(executeQuery)
            refetch({ id: `${id}/data` })
        } else {
            setVariablesUsed(refreshVariables)
            refetch({
                id: `${id}/data`,
                queryVariables: parameterizeVariablesQuery(refreshVariables),
            })
        }
    }

    useEffect(() => {
        setRefreshQuery(() => givenVariables => refreshQuery(givenVariables))
    }, [])

    const getDownloadURL = () => {
        return `${engine.link.baseUrl}/${
            engine.link.apiPath
        }/sqlViews/${id}/data.csv?paging=false&var=${parameterizeVariablesQuery(
            variablesUsed
        ).join(',')}`
    }

    return (
        <>
            {loading && <CircularLoader />}
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
    setRefreshQuery: PropTypes.func,
    variables: PropTypes.object,
}

export default DataWrapper
