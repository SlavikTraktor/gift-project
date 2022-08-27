export interface SelectOption {
  readonly value: string | number | undefined;
  readonly label: string;
  readonly color?: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
}
