import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import PropTypes from 'prop-types'
import React from 'react'
import VariablesDrawerMenu from '../VariablesDrawerMenu'

const MockInputField = ({ label, children }) => (
    <div>
        <span>{label}</span>
        <>{children}</>
    </div>
)

MockInputField.propTypes = {
    children: PropTypes.node,
    label: PropTypes.string,
}

const MockReactFinalForm = ({ children }) => ({
    Form: <>{children}</>,
})

MockReactFinalForm.propTypes = {
    children: PropTypes.node,
}

const MockTag = ({ children }) => (
    <div>
        <>{children}</>
    </div>
)

MockTag.propTypes = {
    children: PropTypes.node,
}

const MockButton = ({ onClick }) => (
    <button
        onClick={() => {
            onClick()
        }}
    ></button>
)

MockButton.propTypes = {
    onClick: PropTypes.func,
}

const MockIconSubtractCircle = () => <></>

const MockIconSync24 = () => <></>

jest.mock('@dhis2/ui', () => ({
    InputField: ({ label, children }) => MockInputField({ label, children }),
    ReactFinalForm: ({ children }) => MockReactFinalForm({ children }),
    Tag: ({ children }) => MockTag({ children }),
    Button: ({ onClick }) => MockButton({ onClick }),
    IconSubtractCircle24: () => MockIconSubtractCircle(),
    IconSync24: () => MockIconSync24(),
}))

describe('VariablesDrawerMenu', () => {
    it('renders variables...', () => {
        render(
            <VariablesDrawerMenu
                variables={{ var1: 'cat', var2: 'dog', var3: 'penguin' }}
                toggleVariableDrawer={() => {}}
                updateVariable={() => {}}
                refreshQuery={() => {}}
            />
        )
        expect(screen.getByText('cat')).toBeInTheDocument()
    })
})
