import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import React from 'react'
import CustomTableBody from '../CustomTableBody'

describe('CustomTableBody', () => {
    it('renders table in expected order', () => {
        const mockHeaders = [{ name: 'name' }, { name: 'known for' }]
        const mockRows = [
            ['Pippi', 'Lifting horses'],
            ['Nils', 'Flying a goose'],
            ['Moomin', 'Not being a hippo'],
        ]
        render(
            <CustomTableBody
                headers={mockHeaders}
                maxRows={100}
                pagePosition={0}
                rows={mockRows}
            />
        )
        const mockTable = [[...mockHeaders.map(h => h.name)], ...mockRows]
        const renderedRows = screen.queryAllByRole('row')
        renderedRows.forEach((nameNode, index) => {
            expect(nameNode.textContent).toBe(mockTable[index].join(''))
        })
        expect(renderedRows).toHaveLength(4)
    })

    it('sorts in a-z order when clicking on header 1 time', () => {
        const mockHeaders = [{ name: 'name' }, { name: 'known for' }]
        const mockRows = [
            ['Pippi', 'Lifting horses'],
            ['Nils', 'Flying a goose'],
            ['Moomin', 'Not being a hippo'],
        ]
        render(
            <CustomTableBody
                headers={mockHeaders}
                maxRows={100}
                pagePosition={0}
                rows={mockRows}
            />
        )
        fireEvent.click(screen.getByText('known for'))
        expect(screen.queryAllByRole('row')[1].textContent).toBe(
            'NilsFlying a goose'
        )
    })

    it('sorts in z-a order when clicking on header 2 times', () => {
        const mockHeaders = [{ name: 'name' }, { name: 'known for' }]
        const mockRows = [
            ['Pippi', 'Lifting horses'],
            ['Nils', 'Flying a goose'],
            ['Moomin', 'Not being a hippo'],
        ]
        render(
            <CustomTableBody
                headers={mockHeaders}
                maxRows={100}
                pagePosition={0}
                rows={mockRows}
            />
        )
        fireEvent.click(screen.getByText('known for'))
        fireEvent.click(screen.getByText('known for'))
        expect(screen.queryAllByRole('row')[1].textContent).toBe(
            'MoominNot being a hippo'
        )
    })

    it('reverts to original order when clicking on header 3 times ', () => {
        const mockHeaders = [{ name: 'name' }, { name: 'known for' }]
        const mockRows = [
            ['Pippi', 'Lifting horses'],
            ['Nils', 'Flying a goose'],
            ['Moomin', 'Not being a hippo'],
        ]
        render(
            <CustomTableBody
                headers={mockHeaders}
                maxRows={100}
                pagePosition={0}
                rows={mockRows}
            />
        )
        fireEvent.click(screen.getByText('known for'))
        fireEvent.click(screen.getByText('known for'))
        fireEvent.click(screen.getByText('known for'))
        expect(screen.queryAllByRole('row')[1].textContent).toBe(
            'PippiLifting horses'
        )
    })
})
