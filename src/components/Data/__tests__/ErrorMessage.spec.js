import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import PropTypes from 'prop-types'
import React from 'react'
import ErrorMessage from '../ErrorMessage'

const MockNoticeBox = ({ children }) => (
    <div>
        <>{children}</>
    </div>
)

MockNoticeBox.propTypes = {
    children: PropTypes.node,
}

jest.mock('@dhis2/ui', () => ({
    NoticeBox: ({ children }) => MockNoticeBox({ children }),
}))

describe('ErrorMessage', () => {
    it('renders variables warning if E4307 error is returned from DHIS2', () => {
        const errorDetails = {
            details: { errorCode: 'E4307', message: 'A taco is not valid!' },
        }
        render(<ErrorMessage error={errorDetails} />)
        expect(
            screen.getByText(
                'Fill in variables to the left and refresh the query'
            )
        ).toBeInTheDocument()
    })

    it('renders error message from details if other error is present', () => {
        const errorDetails = {
            details: { errorCode: 'taco', message: 'A taco is not valid!' },
        }
        render(<ErrorMessage error={errorDetails} />)
        expect(screen.getByText('A taco is not valid!')).toBeInTheDocument()
    })
})
