export const executeQuery = {
    resource: 'sqlViews/',
    type: 'create',
}

export const getEditLink = (engine, id) =>
    `${engine.link.baseUrl}/dhis-web-maintenance/index.html#/edit/otherSection/sqlView/${id}`

export const getApiLink = (engine, id) =>
    `${engine.link.baseUrl}/api/sqlViews/${id}.json`
