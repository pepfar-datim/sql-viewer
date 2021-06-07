import { Button, InputField, IconSubtractCircle24 } from "@dhis2/ui";
import PropTypes from "prop-types";
import React from "react";

const VariablesDrawerMenu = ({
  variables,
  toggleVariableDrawer,
  updateVariable,
}) => (
  <>
    <div className="drawer">
      <div className="flexWrap">
        <div className="buttonWrap">
          <Button
            icon={<IconSubtractCircle24 />}
            small
            onClick={toggleVariableDrawer}
          ></Button>
        </div>
        <span className="variablesText">Variables</span>
      </div>
      {Object.keys(variables).map((v) => (
        <InputField
          key={`variableInput_${v}`}
          name={`variableInput_${v}`}
          onChange={(e) => updateVariable({ [v]: e.value })}
          label={v}
          value={variables[v]}
          inputWidth="80%"
        />
      ))}
    </div>
    <style jsx>
      {`
        .drawer {
          min-width: var(--drawer-width);
          max-width: var(--drawer-width);
          padding: var(--spacers-dp16);
          height: 100%;
          background-color: var(--colors-grey300);
          overflow: hidden;
        }
        .flexWrap {
          display: flex;
          align-items: center;
          margin-bottom: var(--spacers-dp16);
        }
        .buttonWrap {
          margin-right: var(--spacers-dp8);
        }
        .variablesText {
          font-size: 18px;
          font-weight: 500;
          color: var(--colors-grey900);
        }
      `}
    </style>
  </>
);

VariablesDrawerMenu.propTypes = {
  toggleVariableDrawer: PropTypes.func,
  updateVariable: PropTypes.func,
  variables: PropTypes.object,
};

export default VariablesDrawerMenu;
