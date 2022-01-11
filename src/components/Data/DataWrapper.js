import { useDataEngine, useDataQuery } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
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

const DataWrapper = ({
    variables,
    id,
    initialExecuteError,
    isView,
    setRefreshQuery,
}) => {
    const [variablesUsed, setVariablesUsed] = useState({})
    const [executeError, setExecuteError] = useState(initialExecuteError)
    const engine = useDataEngine()
    const { loading, error, data, refetch } = useDataQuery(sqlDataQuery, {
        variables: {
            id: `${id}/data`,
            queryVariables: parameterizeVariablesQuery(variables),
        },
    })

    const refreshQuery = async givenVariables => {
        let refreshVariables = variables
        if (givenVariables !== undefined) {
            refreshVariables = givenVariables
        }
        if (isView) {
            executeQuery.resource = `sqlViews/${id}/execute`
            try {
                await engine.mutate(executeQuery)
                refetch({ id: `${id}/data` })
            } catch (e) {
                setExecuteError(e)
            }
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
        const downloadVariables =
            Object.keys(variablesUsed).length > 0 ? variablesUsed : variables
        return `${engine.link.baseUrl}/${
            engine.link.apiPath
        }/sqlViews/${id}/data.csv?paging=false&var=${parameterizeVariablesQuery(
            downloadVariables
        ).join(',')}`
    }

    return (
        <>
            {loading && <CircularLoader />}
            {(error || executeError) && (
                <>
                    <TableQueryRow refreshQuery={refreshQuery} />
                    <ErrorMessage error={executeError ? executeError : error} />
                </>
            )}
            {data && (
                <CustomTable
                    searchable={true}
                    searchableDescription={`${String.fromCharCode(
                        55357,
                        56589
                    )} ${i18n.t('Search within results')}`}
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
    initialExecuteError: PropTypes.object,
    isView: PropTypes.bool,
    setRefreshQuery: PropTypes.func,
    variables: PropTypes.object,
}

export default DataWrapper
