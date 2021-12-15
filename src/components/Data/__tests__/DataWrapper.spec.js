import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import PropTypes from 'prop-types'
import React from 'react'
import DataWrapper from '../DataWrapper'

var MockCircularLoader = () => <span>loading</span>

jest.mock('@dhis2/ui', () => ({
    CircularLoader: () => MockCircularLoader(),
}))

const MockCustomTable = ({ children }) => (
    <div>
        <span>Table</span>
        {children}
    </div>
)

MockCustomTable.propTypes = {
    children: PropTypes.node,
}

jest.mock('../../Table/CustomTable', () => {
    return ({ children }) => MockCustomTable({ children })
})

jest.mock('../../Table/TableQueryRow', () => {
    return <span>Query row</span>
})

jest.mock('../ErrorMessage', () => {
    return <span>Error message</span>
})

jest.mock('@dhis2/app-runtime', () => ({
    useDataQuery: () => {
        return {
            loading: null,
            error: null,
            data: {
                sqlData: {
                    listGrid: {
                        rows: [1, 2, 3],
                        headers: ['a', 'b', 'c'],
                    },
                },
            },
            refetch: () => {},
        }
    },
    useDataEngine: () => {
        return {
            link: {
                apiPath: 'api',
                baseUrl: 'https://awesomeDHIS2Instance.org',
            },
            mutate: () => {},
        }
    },
}))

describe('DataWrapper', () => {
    it('displays table if data is returned from hook', () => {
        render(
            <DataWrapper
                variables={{ var1: 'cat' }}
                setRefreshQuery={() => {}}
                isView={true}
                id="abc"
            />
        )
        expect(screen.getByText('Table')).toBeInTheDocument()
    })
})
