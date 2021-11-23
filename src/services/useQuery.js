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

export const getSearchTermLink = ({ searchTerm }) => {
    let linkURL = `${location.origin}/#`
    if (process.env.NODE_ENV !== 'development') {
        linkURL = `${location.origin}/api/apps/SQLViewer/index.html#`
    }
    linkURL += `/`
    if (searchTerm !== '') {
        linkURL += `?appSearchTerm=${searchTerm}`
    }
    return linkURL
}
