export const executeQuery = async (engine, id) => {
    let resp
    if (process.env.NODE_ENV === 'development') {
        const url = `${engine.link.baseUrl}/${engine.link.apiPath}/sqlViews/${id}/execute`
        resp = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
        })
        return resp
    } else {
        const url = `${engine.link.apiPath}/sqlViews/${id}/execute`
        resp = await fetch(url, { method: 'POST' })
        return resp
    }
}

export const getEditLink = (engine, id) =>
    `${engine.link.baseUrl}/dhis-web-maintenance/index.html#/edit/otherSection/sqlView/${id}`

export const getApiLink = (engine, id) =>
    `${engine.link.baseUrl}/api/sqlViews/${id}.json`
