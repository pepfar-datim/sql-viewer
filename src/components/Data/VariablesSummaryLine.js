import { Button, Tag, IconAddCircle24 } from "@dhis2/ui";
import PropTypes from "prop-types";
import React from "react";

const VariablesSummaryLine = ({ variables, toggleVariableDrawer }) => (
  <>
    <div className="variablesLineWrap">
      <div className="elementSpacer">
        <Button
          icon={<IconAddCircle24 />}
          small
          onClick={toggleVariableDrawer}
        ></Button>
      </div>
      <span className="variablesText elementSpacer">Variables:</span>
      {Object.keys(variables).map((k) => (
        <div key={`variableTagDiv_${k}`} className="elementSpacer">
          <Tag>
            <span className="variableNameBold">{`${k}: `}</span>
            <span>{variables[k] || "undefined"}</span>
          </Tag>
        </div>
      ))}
    </div>
    <style jsx>
      {`
        .elementSpacer {
          margin-right: var(--spacers-dp8);
        }
        .variablesLineWrap {
          display: flex;
          align-items: center;
          margin: var(--spacers-dp16) 0 var(--spacers-dp16) var(--spacers-dp16);
        }
        .tagSpacer {
          margin-right: var(--spacers-dp8);
        }
        .variablesText {
          font-size: 18px;
          font-weight: 500;
          color: var(--colors-grey900);
        }
        .variableNameBold {
          font-weight: 500;
        }
      `}
    </style>
  </>
);

VariablesSummaryLine.propTypes = {
  toggleVariableDrawer: PropTypes.func,
  variables: PropTypes.array,
};

export default VariablesSummaryLine;
