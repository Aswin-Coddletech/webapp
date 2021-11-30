export const required = (value: any): any =>
  value ? undefined : "Required field";

export const positiveInteger = (value: any) =>
  !Number.isInteger(+value) || +value <= 0
    ? "Please, input positive number"
    : undefined;
