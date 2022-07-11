export const extractVariables = query => {
    const variables = {}
    const VARIABLE_EXPRESSION = /\$\{(\w+)\}/g
    const variableMatches = query.matchAll(VARIABLE_EXPRESSION)

    for (const match of variableMatches) {
        if (
            match[1] !== '_current_user_id' &&
            match[1] !== '_current_username'
        ) {
            variables[match[1]] = ''
        }
    }

    return variables
}

export const parameterizeVariablesQuery = varObj => {
    return Object.keys(varObj).map(k => `${k}:${varObj[k]}`)
}

export const getVariablesLink = ({ id, variables, baseUrl }) => {
    let linkURL
    if (process.env.NODE_ENV !== 'development') {
        linkURL = `${baseUrl}/api/apps/SQLViewer/index.html#`
    } else {
        linkURL = `${location.origin}/#`
    }
    linkURL += `/view/${id}`
    if (Object.keys(variables).length > 0) {
        linkURL += `?${parameterizeVariablesQuery(variables)
            .join('&')
            .replaceAll(':', '=')}`
    }
    return linkURL
}

export const populateDefaultVariables = (
    extractedVariables,
    attributeValues,
    attributeID
) => {
    const variables = { ...extractedVariables }
    Object.keys(variables).forEach(k => (variables[k] = null))

    try {
        let defaultVariablesInfo

        if (attributeID) {
            defaultVariablesInfo = attributeValues.filter(
                a => a.attribute.id === attributeID
            )[0]
        }

        if (defaultVariablesInfo) {
            const defaultVariables = JSON.parse(defaultVariablesInfo.value)
            Object.keys(variables).forEach(k => {
                if (defaultVariables[k]) {
                    variables[k] = defaultVariables[k]
                }
            })
        }
        return variables
    } catch (e) {
        console.log(e)
        return { ...extractedVariables }
    }
}
