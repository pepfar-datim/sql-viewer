import { useDataEngine } from '@dhis2/app-runtime'
import PropTypes from 'prop-types'
import React, { useContext, useEffect, useState, createContext } from 'react'

const userQuery = {
    userInfo: {
        resource: 'me',
    },
}

export const UserInfoProviderCtx = createContext({})

const UserInfoProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState({ superuser: false })
    const [userWaiting, setWaiting] = useState(true)
    const engine = useDataEngine()

    useEffect(() => {
        async function fetchData() {
            try {
                const { userInfo } = await engine.query(userQuery)
                setUserInfo({
                    id: userInfo?.id,
                    superuser:
                        userInfo.authorities.filter(a => a === 'ALL').length >
                        0,
                })
            } catch (e) {
                console.log('userInfo not present or inaccessible')
                console.log(e)
            } finally {
                setWaiting(false)
            }
        }
        fetchData()
    }, [])

    return (
        <UserInfoProviderCtx.Provider
            value={{
                userInfo: userInfo,
                userWaiting: userWaiting,
            }}
        >
            {children}
        </UserInfoProviderCtx.Provider>
    )
}

UserInfoProvider.propTypes = {
    children: PropTypes.node,
}

export default UserInfoProvider

export const useUserInfo = () => useContext(UserInfoProviderCtx)
