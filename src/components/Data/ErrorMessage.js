import i18n from '@dhis2/d2-i18n'
import { NoticeBox } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'

const ErrorMessage = ({ error }) => {
    return (
        <>
            <div className="noticeBoxContainer">
                {error.details.errorCode === 'E4307' ? (
                    <NoticeBox
                        title={i18n.t('Variables must be filled out')}
                        warning
                    >
                        <span>
                            {i18n.t(
                                'Fill in variables to the left and refresh the query'
                            )}
                        </span>
                    </NoticeBox>
                ) : (
                    <NoticeBox title={i18n.t('Query could not execute')} error>
                        <span>{error.details.message}</span>
                    </NoticeBox>
                )}
            </div>
            <style jsx>{`
                .noticeBoxContainer {
                    max-width: 800px;
                    margin: 30px 20% 0px 20%;
                }
            `}</style>
        </>
    )
}

ErrorMessage.propTypes = {
    error: PropTypes.object,
}

export default ErrorMessage
