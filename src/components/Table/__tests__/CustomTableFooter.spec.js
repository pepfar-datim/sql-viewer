import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import React from 'react'
import CustomTableFooter from '../CustomTableFooter'

describe('CustomTableFooter', () => {
    it('shows option to download if one is provided', () => {
        render(
            <CustomTableFooter
                downloadURL="link/to/download"
                enablePagination={true}
                maxRows={20}
                pagePosition={1}
                rowCount={20}
                setMaxRows={() => {}}
                setPagePosition={() => {}}
                totalRows={20}
            />
        )
        expect(screen.getByText('Download CSV')).toBeInTheDocument()
    })
    it('does not show option to download if none is provided', () => {
        render(
            <CustomTableFooter
                enablePagination={true}
                maxRows={20}
                pagePosition={1}
                rowCount={20}
                setMaxRows={() => {}}
                setPagePosition={() => {}}
                totalRows={20}
            />
        )
        expect(screen.queryByText('Download CSV')).not.toBeInTheDocument()
    })
})
