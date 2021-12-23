import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import React from 'react'
import PageCount from '../PageCount'

describe('PageCount', () => {
    it('displays "maxRows of totalRows" if rowCount > maxRows and totalRows > maxRows', () => {
        render(<PageCount maxRows={10} rowCount={20} totalRows={30} />)
        expect(screen.getByText('Displaying 10 of 30 rows')).toBeInTheDocument()
    })
    it('displays "rowCount of totalRows" if rowCount < maxRows and totalRows > rowCount (maxRows>totalRows)', () => {
        render(<PageCount maxRows={10} rowCount={5} totalRows={8} />)
        expect(screen.getByText('Displaying 5 of 8 rows')).toBeInTheDocument()
    })
    it('displays "rowCount of totalRows" if rowCount < maxRows and totalRows > rowCount (maxRows<totalRows)', () => {
        render(<PageCount maxRows={10} rowCount={8} totalRows={12} />)
        expect(screen.getByText('Displaying 8 of 12 rows')).toBeInTheDocument()
    })
    it('displays "totalRows" if rowCount == totalRows', () => {
        render(<PageCount maxRows={40} rowCount={30} totalRows={30} />)
        expect(screen.getByText('Displaying 30 rows')).toBeInTheDocument()
    })
})
