import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'

export const useQuery = () => {
    const { search } = useLocation()

    return useMemo(() => {
        const params = new URLSearchParams(search)

        const paramObject = {}
        for (const [key, value] of params) {
            paramObject[key] = value
        }
        return paramObject
    }, [search])
}

export const getSearchTermLink = ({ searchTerm, baseUrl }) => {
    let linkURL
    if (process.env.NODE_ENV !== 'development') {
        linkURL = `${baseUrl}/api/apps/SQLViewer/index.html#/`
    } else {
        linkURL = `${location.origin}/#/`
    }
    if (searchTerm !== '') {
        linkURL += `?appSearchTerm=${searchTerm}`
    }
    return linkURL
}
