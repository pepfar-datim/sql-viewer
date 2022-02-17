export const executeQuery = {
    resource: 'sqlViews/',
    type: 'create',
}

export const getEditLink = ({ baseUrl, id }) => {
    return `${baseUrl}/dhis-web-maintenance/index.html#/edit/otherSection/sqlView/${id}`
}

export const getApiLink = ({ baseUrl, apiVersion, id }) =>
    `${baseUrl}/api/${apiVersion}/sqlViews/${id}.json`
