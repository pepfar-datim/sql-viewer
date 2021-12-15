import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import PropTypes from 'prop-types'
import React from 'react'
import VariablesSummaryLine from '../VariablesSummaryLine'

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

const MockIconAddCircle24 = () => <></>

jest.mock('@dhis2/ui', () => ({
    Tag: ({ children }) => MockTag({ children }),
    Button: ({ onClick }) => MockButton({ onClick }),
    IconAddCircle24: () => MockIconAddCircle24(),
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
