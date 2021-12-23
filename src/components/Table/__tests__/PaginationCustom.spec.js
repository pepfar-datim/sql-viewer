import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import React from 'react'
import PaginationCustom from '../PaginationCustom'

describe('PaginationCustom', () => {
    it('displays correct page position', () => {
        render(
            <PaginationCustom
                enablePagination={true}
                maxRows={20}
                pagePosition={1}
                rowCount={100}
                setMaxRows={() => {}}
                setPagePosition={() => {}}
                totalRows={200}
            />
        )
        // displays
        expect(screen.getByText('Page 2 of 5')).toBeInTheDocument()
    })
    it('shows row display out of total rows', () => {
        render(
            <PaginationCustom
                enablePagination={true}
                maxRows={20}
                pagePosition={1}
                rowCount={100}
                setMaxRows={() => {}}
                setPagePosition={() => {}}
                totalRows={200}
            />
        )
        expect(
            screen.getByText('Displaying 20 of 200 rows')
        ).toBeInTheDocument()
    })
})
