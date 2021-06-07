export const extractVariables = (query) => {
  const variables = {};
  const VARIABLE_EXPRESSION = /\$\{(\w+)\}/g;
  const variableMatches = query.matchAll(VARIABLE_EXPRESSION);

  for (const match of variableMatches) {
    variables[match[1]] = "";
  }

  return variables;
};

export const parameterizeVariables = (varObj) => {
  var varString = "";
  Object.keys(varObj).forEach((k) => {
    varString += `&var=${k}:${varObj[k]}`;
    /*
		if (varString.length === 0) {
			varString +=`?var=${k}:${varObj[k]}`
		} else {
			varString += `&var=${k}:${varObj[k]}`
		}
		*/
  });
  return varString;
};
