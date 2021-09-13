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
