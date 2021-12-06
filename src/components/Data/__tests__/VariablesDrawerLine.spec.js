import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import VariablesSummaryLine from '../VariablesSummaryLine'

jest.mock('@dhis2/ui', () => ({
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
    IconAddCircle24: () => <></>,
}))

describe('VariablesSummaryLine', () => {
    it('displays values for all filled out variables', () => {
        render(
            <VariablesSummaryLine
                variables={{ var1: 'cat', var2: 'dog', var3: 'penguin' }}
                toggleVariableDrawer={() => {}}
            />
        )
        expect(screen.getByText('cat')).toBeInTheDocument()
        expect(screen.getByText('dog')).toBeInTheDocument()
        expect(screen.getByText('penguin')).toBeInTheDocument()
    })

    it('displays undefined for variables that are not filled out', () => {
        render(
            <VariablesSummaryLine
                variables={{ var1: 'cat', var2: null, var3: null }}
                toggleVariableDrawer={() => {}}
            />
        )
        expect(screen.getByText('cat')).toBeInTheDocument()
        expect(screen.getAllByText('undefined')).toHaveLength(2)
    })

    it('toggles variables drawer when button is clicked', () => {
        const toggleVariableDrawer = jest.fn()
        render(
            <VariablesSummaryLine
                variables={{ var1: 'cat', var2: null, var3: null }}
                toggleVariableDrawer={toggleVariableDrawer}
            />
        )
        fireEvent.click(screen.getByRole('button'))
        expect(toggleVariableDrawer).toHaveBeenCalledTimes(1)
    })
})
