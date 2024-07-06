import { Checkbox } from "@mui/material";
import React, { useContext } from "react";
import { DepartmentContext, withDepartmentContext } from "./departmentContext";

const MARGIN_PER_LEVEL = 20;

const spanStyles = {
  fontSize: "20px",
};

function CheckableDepartment(props: any): React.ReactElement {
  const context = useContext(DepartmentContext);
  if (!context) return <></>;
  const { onUpdateDepartment } = context;
  const { title, checked, collapsed, subDepartments, parentIndex } = props;

  const onChangeToggle = (e: React.ChangeEvent) => {
    onUpdateDepartment(parentIndex, { checked: (e.target as HTMLInputElement).checked });
  };

  const onCollapseToggle = () => {
    onUpdateDepartment(parentIndex, { collapsed: !collapsed });
  };

  return (
    <div style={{ marginLeft: `${props.margin}px` }}>
      {subDepartments && collapsed && (
        <span style={spanStyles} onClick={onCollapseToggle}>
          -
        </span>
      )}
      {subDepartments && !collapsed && (
        <span style={spanStyles} onClick={onCollapseToggle}>
          +
        </span>
      )}
      <Checkbox checked={checked} onChange={onChangeToggle} />
      {title} {subDepartments && "(" + subDepartments.length + ")"}
      {collapsed &&
        subDepartments?.map((aDepartment: any, index: number) => (
          <CheckableDepartment
            key={aDepartment.title}
            {...aDepartment}
            parentIndex={`${parentIndex}.${index}`}
            margin={props.margin + MARGIN_PER_LEVEL}
          ></CheckableDepartment>
        ))}
    </div>
  );
}

function Department(): React.ReactElement {
  const context = useContext(DepartmentContext);
  if (!context) return <></>;
  const { departments } = context;
  return (
    <div>
      {departments.map((aDepartment, index) => (
        <CheckableDepartment
          key={aDepartment.title}
          {...aDepartment}
          parentIndex={index.toString()}
          margin={MARGIN_PER_LEVEL}
        />
      ))}
    </div>
  );
}

export default withDepartmentContext(Department);
