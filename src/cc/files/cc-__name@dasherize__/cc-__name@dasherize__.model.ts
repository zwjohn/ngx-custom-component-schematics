import {ValidationErrors} from "@angular/forms";

export enum <%= classify(name) %>OutputAction {
SAVE,
UPDATE
}

export interface <%= classify(name) %>InputConfig {

  readonly?: boolean;
  action:<%= classify(name) %>OutputAction;
  data: {
    model: any;
    $currentLabelsBundle?: { [key: string]: string; };
    $currentOptionsBundle?: { [optionKey: string]: [{ label: string; value: string }]; };
  };

}

export interface <%= classify(name) %>OutputConfig {
  action?:<%= classify(name) %>OutputAction;
  data: {
    model: any;
  };
  formState:{
    isFormValid:boolean;
    formErrors:ValidationErrors;
  };
}

