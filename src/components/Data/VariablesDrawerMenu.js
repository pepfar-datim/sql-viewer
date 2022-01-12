import i18n from '@dhis2/d2-i18n'
import {
    Button,
    InputField,
    IconSubtractCircle24,
    IconSync24,
    ReactFinalForm,
} from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'

const VariablesDrawerMenu = ({
    variables,
    toggleVariableDrawer,
    updateVariable,
    refreshQuery,
}) => {
    const handleRefresh = () => {
        refreshQuery(variables)
    }

    return (
        <>
            <div className="drawer">
                <div className="flexWrap">
                    <div className="buttonWrap">
                        <Button
                            dataTest="variable-drawer-toggle-expand"
                            icon={<IconSubtractCircle24 />}
                            small
                            onClick={toggleVariableDrawer}
                        />
                    </div>
                    <span className="variablesText">{i18n.t('Variables')}</span>
                </div>
                <ReactFinalForm.Form onSubmit={handleRefresh}>
                    {({ handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                            {Object.keys(variables).map(v => (
                                <InputField
                                    key={`variableInput_${v}`}
                                    name={`variableInput_${v}`}
                                    onChange={e =>
                                        updateVariable({ [v]: e.value })
                                    }
                                    label={v}
                                    value={variables[v]}
                                    inputWidth="80%"
                                />
                            ))}
                            {refreshQuery !== null && (
                                <div className="rightButtonOuter">
                                    <Button
                                        dataTest="refresh-query-left"
                                        icon={<IconSync24 />}
                                        type="submit"
                                        primary
                                    >
                                        {i18n.t('Refresh Query')}
                                    </Button>
                                </div>
                            )}
                        </form>
                    )}
                </ReactFinalForm.Form>
            </div>
            <style jsx>
                {`
                    .drawer {
                        min-width: var(--drawer-width);
                        max-width: var(--drawer-width);
                        padding: var(--spacers-dp16);
                        height: 100%;
                        background-color: var(--colors-grey300);
                        overflow: auto;
                    }
                    .flexWrap {
                        display: flex;
                        align-items: center;
                        margin-bottom: var(--spacers-dp16);
                    }
                    .buttonWrap {
                        margin-right: var(--spacers-dp8);
                    }
                    .variablesText {
                        font-size: 18px;
                        font-weight: 500;
                        color: var(--colors-grey900);
                    }
                    .rightButtonOuter {
                        margin-top: var(--spacers-dp8);
                    }
                `}
            </style>
        </>
    )
}

VariablesDrawerMenu.propTypes = {
    refreshQuery: PropTypes.func,
    toggleVariableDrawer: PropTypes.func,
    updateVariable: PropTypes.func,
    variables: PropTypes.object,
}

export default VariablesDrawerMenu
