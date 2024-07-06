import { createContext, useState } from "react";

export interface Department {
  checked: boolean;
  title: string;
  collapsed?: boolean;
  subDepartments?: Department[];
}

export interface PatchDepartment {
  checked?: boolean;
  collapsed?: boolean;
}

export interface DepartmentContextType {
  departments: Department[];
  onUpdateDepartment: (location: string, patch: PatchDepartment) => void;
}

const data: Department[] = [
  {
    title: "customer_service",
    checked: false,
    collapsed: true,
    subDepartments: [
      { title: "support", checked: false },
      { title: "customer_success", checked: false },
    ],
  },
  {
    title: "design",
    checked: false,
    collapsed: true,
    subDepartments: [
      { title: "graphic_design", checked: false },
      { title: "product_design", checked: false },
      { title: "web_design", checked: false },
    ],
  },
];

const recursivelyUpdateDepartment = (
  location: number[],
  department: Department[] | undefined,
  patch: PatchDepartment
) => {
  if (!department) return;
  const [index, ...others] = location;
  if (others.length !== 0) {
    recursivelyUpdateDepartment(others, department[index].subDepartments, patch);
    department[index].checked = department[index].subDepartments?.every((d) => d.checked) || false;
  } else {
    department[index] = { ...department[index], ...patch };
    if (patch.checked !== undefined) {
      recursivelyApplyPatchToChildren(department[index], patch);
    }
  }
};

const recursivelyApplyPatchToChildren = (department: Department, patch: PatchDepartment) => {
  department.checked = !!patch.checked;
  if (!department.subDepartments) return;
  department.subDepartments.forEach((aDepartment) =>
    recursivelyApplyPatchToChildren(aDepartment, patch)
  );
};

export const DepartmentContext = createContext<DepartmentContextType | null>(null);

export const withDepartmentContext = (Component: React.ElementType) => (props: any) => {
  const [departments, setDepartments] = useState<Department[]>(data);

  const onUpdateDepartment = (location: string, patch: PatchDepartment) => {
    const tokens = location.split(".").map((t) => Number.parseInt(t, 10));
    const departmentsCopy = JSON.parse(JSON.stringify(departments));
    recursivelyUpdateDepartment(tokens, departmentsCopy, patch);
    setDepartments(departmentsCopy);
  };

  return (
    <DepartmentContext.Provider value={{ departments, onUpdateDepartment }}>
      <Component {...props} />
    </DepartmentContext.Provider>
  );
};
