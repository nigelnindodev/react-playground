export interface Challenge {
  id: string;
  name: string;
  description: string;
  starterCode: string;
}

export interface ValidationResult {
  passed: boolean;
  message: string;
}

export type ValidateFunction = (container: HTMLElement) => ValidationResult;
