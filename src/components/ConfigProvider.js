import { useDataEngine } from '@dhis2/app-runtime'
import PropTypes from 'prop-types'
import React, { useContext, useEffect, useState, createContext } from 'react'

const configQuery = {
    config: {
        resource: 'dataStore/sqlViewer/config',
    },
}

export const ConfigProviderCtx = createContext({})

const ConfigProvider = ({ children }) => {
    const [config, setConfig] = useState({})
    const [waiting, setWaiting] = useState(true)
    const engine = useDataEngine()

    useEffect(() => {
        async function fetchData() {
            try {
                const { config } = await engine.query(configQuery)
                setConfig({
                    ...config,
                })
            } catch (e) {
                console.log('config not present or inaccessible')
                console.log(e)
            } finally {
                setWaiting(false)
            }
        }
        fetchData()
    }, [])

    return (
        <ConfigProviderCtx.Provider
            value={{
                config: config,
                waiting: waiting,
            }}
        >
            {children}
        </ConfigProviderCtx.Provider>
    )
}

ConfigProvider.propTypes = {
    children: PropTypes.node,
}

export default ConfigProvider

export const useDataStoreConfig = () => useContext(ConfigProviderCtx)
