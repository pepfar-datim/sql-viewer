import { useDataEngine } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import {
    Menu,
    MenuItem,
    Popover,
    IconEdit24,
    IconLink24,
    IconView24,
} from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'
import { getEditLink, getApiLink } from '../../api/miscellaneous'
import { parameterizeVariablesQuery } from '../../services/extractVariables'

const CodeIcon = () => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            transform="translate(-4.5,0)"
            d="m13.2928932 6.29289322c.3905243-.39052429 1.0236893-.39052429 1.4142136 0 .3604839.36048396.3882135.92771502.0831886 1.32000622l-.0831886.09420734-4.2921068 4.29289322 4.2921068 4.2928932c.3604839.360484.3882135.927715.0831886 1.3200062l-.0831886.0942074c-.360484.3604839-.927715.3882135-1.3200062.0831886l-.0942074-.0831886-4.99999998-5c-.36048396-.360484-.3882135-.927715-.08318861-1.3200062l.08318861-.0942074z"
            fill="#010101"
        />
        <path
            transform="translate(4.5,0)"
            d="m9.29289322 6.29289322c.36048396-.36048396.92771498-.3882135 1.32000618-.08318861l.0942074.08318861 5 4.99999998c.3604839.360484.3882135.927715.0831886 1.3200062l-.0831886.0942074-5 5c-.3905243.3905243-1.02368929.3905243-1.41421358 0-.36048396-.360484-.3882135-.927715-.08318861-1.3200062l.08318861-.0942074 4.29210678-4.2928932-4.29210678-4.29289322c-.36048396-.36048396-.3882135-.92771502-.08318861-1.32000622z"
            fill="#010101"
        />
    </svg>
)

const LinksMenu = ({
    id,
    isSearchPage,
    moreButtonRef,
    toggleLinksMenu,
    variables,
}) => {
    const engine = useDataEngine()

    const getLink = ({ id }) => {
        let linkURL = `${location.origin}/#`
        if (process.env.NODE_ENV !== 'development') {
            linkURL = `${location.origin}/api/apps/SQLViewer/index.html#`
        }
        linkURL += `/view/${id}`
        if (Object.keys(variables).length > 0) {
            linkURL += `?${parameterizeVariablesQuery(variables)
                .join('&')
                .replaceAll(':', '=')}`
        }
        return linkURL
    }

    return (
        <Popover
            reference={moreButtonRef}
            placement="bottom-start"
            arrow={false}
            onClickOutside={toggleLinksMenu}
        >
            <Menu>
                {isSearchPage && (
                    <Link
                        to={`/view/${id}`}
                        style={{
                            textDecoration: 'none',
                        }}
                    >
                        <MenuItem
                            icon={<IconView24 />}
                            dense
                            label={i18n.t('open in sql viewer')}
                        />
                    </Link>
                )}
                <MenuItem
                    icon={<CodeIcon />}
                    dense
                    label={i18n.t('open in api')}
                    onClick={() => {
                        window.open(getApiLink(engine, id))
                    }}
                />
                <MenuItem
                    icon={<IconEdit24 />}
                    dense
                    label={i18n.t('open in maintenance app')}
                    onClick={() => {
                        window.open(getEditLink(engine, id))
                    }}
                />
                {!isSearchPage && (
                    <MenuItem
                        icon={<IconLink24 />}
                        dense
                        label={i18n.t('copy link')}
                        onClick={() => {
                            navigator.clipboard.writeText(getLink({ id }))
                        }}
                    />
                )}
            </Menu>
        </Popover>
    )
}

LinksMenu.propTypes = {
    id: PropTypes.string,
    isSearchPage: PropTypes.bool,
    moreButtonRef: PropTypes.object,
    toggleLinksMenu: PropTypes.func,
    variables: PropTypes.object,
}

export default LinksMenu
