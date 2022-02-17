import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import React from 'react'
import VariablesDrawerMenu from '../VariablesDrawerMenu'

describe('VariablesDrawerMenu', () => {
    const mockVariables = { var1: 'cat', var2: 'dog', var3: 'penguin' }
    it('renders variables...', () => {
        render(
            <VariablesDrawerMenu
                variables={mockVariables}
                toggleVariableDrawer={() => {}}
                updateVariable={() => {}}
                refreshQuery={() => {}}
            />
        )
        Object.keys(mockVariables).forEach(k => {
            expect(screen.getByRole('textbox', { name: k })).toHaveValue(
                mockVariables[k]
            )
        })
    })
})
