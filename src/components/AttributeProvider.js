
import PropTypes from 'prop-types'
import SettingsModal from './Selection/SettingsModal'
import { useDataEngine } from '@dhis2/app-runtime'
import React, { useContext, useEffect, useState, createContext } from 'react'

export const AttributeProviderCtx = createContext({})

const DEFAULT_ATTRIBUTE_ID = 'sqlViewerDv';
const AttributeQuery = {
    attribute: {
        resource: 'attributes/'+DEFAULT_ATTRIBUTE_ID
    },
}

const AttributeProvider = ({ children }) => {
    const [attribute, setAttribute] = useState({})
    const [attributeWaiting, setWaiting] = useState(true)
    const engine = useDataEngine()

    useEffect(() => {
        async function fetchData() {
            try {
                const attributeResponse = await engine.query(AttributeQuery)
                const attr = {
                    defaultsAttributeId: attributeResponse?.attribute?.id}

                setAttribute({
                    ...attr,
                })
            } catch (e) {
                console.log('attribute not present or inaccessible')
                console.log(e)
                setAttribute({})
            } finally {
                setWaiting(false)
            }
        }
        fetchData()
    }, [])
    
    return (
        <AttributeProviderCtx.Provider
            value={{
                attribute: attribute,
                attributeWaiting: attributeWaiting,
            }}
        >
            {children}
        </AttributeProviderCtx.Provider>
    )
}

AttributeProvider.propTypes = {
    children: PropTypes.node,
}

export default AttributeProvider
export const useAttribute = () => useContext(AttributeProviderCtx)