import { useAlert, useDataEngine } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import {
    Button,
    ButtonStrip,
    Modal,
    ModalActions,
    ModalContent,
} from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'

const DEFAULT_ATTIBUTE_NAME = 'default-sql-values'
const DEFAULT_ATTRIBUTE_ID = 'sqlViewerDv'

const attributeCreate = {
    resource: 'attributes',
    type: 'create',
    data: ({ data }) => data,
}
const SettingsModal = ({ setSettingsModalOpen }) => {
    const engine = useDataEngine()
    const { show: showAlert } = useAlert(
        ({ msg }) => msg,
        ({ options }) => ({ ...options, duration: 3000 })
    )

    const createAttribute = async () => {
        try {
            // post to create attribute
            const defaultsAttribute = {
                name: DEFAULT_ATTIBUTE_NAME,
                valueType: 'LONG_TEXT',
                sqlViewAttribute: true,
                id: DEFAULT_ATTRIBUTE_ID,
            }
            const attributeResponse = await engine.mutate(attributeCreate, {
                variables: { data: defaultsAttribute },
            })
            showAlert({
                msg: i18n.t('Attribute has been created. App will reload shortly.'),
                options: { success: true },
            })

            // here the context should be created, but reloading page is a simpler approach
            setTimeout(() => {
                location.reload()
            }, 3000)
        } catch (e) {
            showAlert({
                msg: i18n.t('Attribute could not be created.'),
                options: { warning: true },
            })
        }
        setSettingsModalOpen(false)
    }

    return (
        <Modal
            onClose={() => {
                setSettingsModalOpen(false)
            }}
            position="middle"
        >
            <ModalContent>
                {i18n.t(
                    'Do you want to create an attribute that allows saving default variable values?'
                )}
            </ModalContent>
            <ModalActions>
                <ButtonStrip>
                    <Button
                        onClick={() => {
                            setSettingsModalOpen(false)
                        }}
                    >
                        {i18n.t('Cancel')}
                    </Button>
                    <Button primary onClick={createAttribute}>
                        {i18n.t('Create')}
                    </Button>
                </ButtonStrip>
            </ModalActions>
        </Modal>
    )
}

SettingsModal.propTypes = {
    setSettingsModalOpen: PropTypes.func,
}

export default SettingsModal
