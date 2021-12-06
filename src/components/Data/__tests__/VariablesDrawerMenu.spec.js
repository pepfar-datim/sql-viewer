import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import VariablesDrawerMenu from '../VariablesDrawerMenu'

jest.mock('@dhis2/ui', () => ({
    InputField: ({ label, children }) => {
        return (
            <div>
                <span>{label}</span>
                <>{children}</>
            </div>
        )
    },
    ReactFinalForm: ({ children }) => ({
        Form: ({ children }) => {
            return <>{children}</>
        },
    }),
    Tag: ({ children }) => {
        return (
            <div>
                <>{children}</>
            </div>
        )
    },
    Button: ({ onClick }) => {
        return (
            <button
                onClick={() => {
                    onClick()
                }}
            ></button>
        )
    },
    IconSubtractCircle24: () => <></>,
    IconSync24: () => <></>,
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
