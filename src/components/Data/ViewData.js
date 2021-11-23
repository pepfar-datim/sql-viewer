import { useDataEngine, useDataQuery } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import { Button, CircularLoader, IconArrowLeft24, IconMore24 } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, { useState, createRef } from 'react'
import { Link } from 'react-router-dom'
import { executeQuery } from '../../api/miscellaneous'
import {
    extractVariables,
    getVariablesLink,
} from '../../services/extractVariables'
import { useQuery } from '../../services/useQuery'
import Layout from '../Layout'
import DataWrapper from './DataWrapper'
import LinksMenu from './LinksMenu'
import VariablesDrawerMenu from './VariablesDrawerMenu'
import VariablesSummaryLine from './VariablesSummaryLine'

const sqlViewDetail = {
    sqlView: {
        resource: 'sqlViews',
        id: ({ id }) => id,
        params: {
            paging: 'false',
            fields: 'id,name,type,sqlQuery',
        },
    },
}

const VIEW_TYPE = 'VIEW'
const QUERY_TYPE = 'QUERY'

const ViewData = ({ match }) => {
    const query = useQuery()
    const engine = useDataEngine()
    const id = match.params.id
    const [variablesDrawerOpen, setVariablesDrawerOpen] = useState(true)
    const [variables, setVariables] = useState({})
    const [queryExecuted, setQueryExecuted] = useState(false)
    const [linksMenuOpen, setLinksMenuOpen] = useState(false)
    const [refreshQuery, setRefreshQuery] = useState(null)

    const toggleLinksMenu = () => {
        setLinksMenuOpen(!linksMenuOpen)
    }

    const prepView = async d => {
        const extractedVariables = extractVariables(d.sqlView.sqlQuery)

        if (
            d.sqlView.type !== QUERY_TYPE ||
            Object.keys(extractedVariables).length === 0
        ) {
            setVariablesDrawerOpen(false)
        }

        Object.keys(extractedVariables).forEach(k => {
            if (query[k]) {
                extractedVariables[k] = query[k]
            }
        })
        setVariables(extractedVariables)

        if (d.sqlView.type === VIEW_TYPE) {
            executeQuery.resource = `sqlViews/${id}/execute`
            const resp = await engine.mutate(executeQuery)
            if (resp) {
                setQueryExecuted(true)
            }
        } else {
            setQueryExecuted(true)
        }
    }

    const { loading, error, data } = useDataQuery(sqlViewDetail, {
        variables: { id: id },
        onComplete: prepView,
    })

    const updateVariable = newVariable => {
        const updatedVariables = Object.assign({}, variables, newVariable)
        window.history.pushState(
            null,
            null,
            getVariablesLink({ id, variables: updatedVariables })
        )
        setVariables(updatedVariables)
    }

    const toggleVariableDrawer = () => {
        setVariablesDrawerOpen(!variablesDrawerOpen)
    }

    const moreButtonRef = createRef()

    return (
        <Layout>
            <>
                {(loading || !queryExecuted) && <CircularLoader />}
                {error && <span>{error.message}</span>}
                {data && queryExecuted && (
                    <div className="container">
                        <div
                            className={
                                variablesDrawerOpen
                                    ? 'drawerWrapper'
                                    : 'drawerWrapper inactive'
                            }
                        >
                            <VariablesDrawerMenu
                                variables={variables}
                                toggleVariableDrawer={toggleVariableDrawer}
                                updateVariable={updateVariable}
                                refreshQuery={refreshQuery}
                            />
                            <div className="main">
                                <div className="marginWrap">
                                    <div className="flexWrap">
                                        <span className="queryTitleText">
                                            {data.sqlView.name}
                                        </span>
                                        <div
                                            ref={moreButtonRef}
                                            className="buttonWrapLeft"
                                        >
                                            <Button
                                                icon={<IconMore24 />}
                                                small
                                                onClick={() => {
                                                    toggleLinksMenu()
                                                }}
                                            />
                                        </div>
                                        {linksMenuOpen && (
                                            <LinksMenu
                                                id={id}
                                                isSearchPage={false}
                                                moreButtonRef={moreButtonRef}
                                                toggleLinksMenu={
                                                    toggleLinksMenu
                                                }
                                                variables={variables}
                                            />
                                        )}
                                        <div className="backButtonWrap">
                                            <Link
                                                to={`/`}
                                                style={{
                                                    textDecoration: 'none',
                                                }}
                                            >
                                                <Button
                                                    icon={<IconArrowLeft24 />}
                                                >
                                                    {i18n.t('Back')}
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                    {Object.keys(variables).length > 0 &&
                                        !variablesDrawerOpen && (
                                            <VariablesSummaryLine
                                                variables={variables}
                                                toggleVariableDrawer={
                                                    toggleVariableDrawer
                                                }
                                            />
                                        )}
                                    {
                                        <DataWrapper
                                            id={id}
                                            variables={variables}
                                            isView={
                                                data.sqlView.type === VIEW_TYPE
                                            }
                                            setRefreshQuery={setRefreshQuery}
                                        />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </>
            <style jsx>{`
                .container {
                    width: 100%;
                    height: 100%;
                    font-size: 1rem;
                }
                .main {
                    width: 100%;
                    overflow: auto;
                }
                .marginWrap {
                    margin: var(--spacers-dp12) var(--spacers-dp16)
                        var(--spacers-dp12) var(--spacers-dp16);
                }
                .drawerWrapper {
                    position: relative;
                    display: flex;
                    overflow: hidden;
                    height: 100%;
                    top: 0;
                    left: 0;
                    transition: margin 0.6s cubic-bezier(0.42, 0, 0.58, 1);
                }
                .inactive {
                    margin-left: -300px;
                }
                .flexWrap {
                    display: flex;
                    align-items: center;
                }
                .queryTitleText {
                    font-size: 24px;
                    font-weight: 700;
                    color: var(--colors-grey800);
                    margin: var(--spacers-dp12) 0;
                    line-height: 20px;
                }
                .buttonWrapLeft {
                    margin-left: var(--spacers-dp12);
                }
                .backButtonWrap {
                    display: flex;
                    margin-left: auto;
                }
                .linkButton {
                    margin-right: 8px;
                }
            `}</style>
        </Layout>
    )
}

ViewData.propTypes = {
    match: PropTypes.object,
}

export default ViewData
