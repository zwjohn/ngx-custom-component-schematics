import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import {<%= classify(name) %>Service} from './cc-<%= dasherize(name) %>.service';
import {debounceTime, distinctUntilChanged, startWith, take, takeUntil} from "rxjs/operators";
import {<%= classify(name) %>ErrorMessages} from "./cc-<%= dasherize(name) %>-error.messages";
import {ErrorStateMatcher} from "@angular/material";
import * as uuid from 'uuid';
import {
<%= classify(name) %>OutputAction,
<%= classify(name) %>InputConfig,
<%= classify(name) %>OutputConfig,
} from './cc-<%= dasherize(name) %>.model';

import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm} from "@angular/forms";
import {Subject} from "rxjs";
export class  <%= classify(name) %>ErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && isSubmitted);
  }
}

@Component({
  selector: 'cc-<%= dasherize(name) %>',
  templateUrl: './cc-<%= dasherize(name) %>.component.html',
  styleUrls: ['./cc-<%= dasherize(name) %>.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
  ]
})

export class <%= classify(name) %>Component implements OnInit, OnDestroy, AfterViewInit {
  // *** External Variables ***
  $currentLabelsBundle: { [key: string]: string; } = {};
  $currentOptionsBundle: { [optionKey: string]: [{ label: string, value: any }]; } = {};
  $componentErrorMessages: { [key: string]: string; } = <%= classify(name) %>ErrorMessages;
  $errorStateMatcher: <%= classify(name) %>ErrorStateMatcher = new <%= classify(name) %>ErrorStateMatcher();
  // *** End of External Variables ***

  /*** List all @Input variables***/
  @Input() compConfig: <%= classify(name) %>InputConfig;
  @Input() inputChange?: Subject<<%= classify(name) %>InputConfig>;
  /*** End of @Input Variables ***/

  /*** List all @Output variables***/
  @Output() outputChange?: Subject<<%= classify(name) %>OutputConfig> = new Subject<<%= classify(name) %>OutputConfig>();
  /*** End of @Output Variables ***/

  protected onDestroy$: Subject<void> = new Subject<void>();

  /*** Local Variables ***/
  <%=camelize(name)%>Form: FormGroup;
  componentId: string;
  /*** End of local Variables ***/

  /**
   * Constructor
   * @param formBuilder
   * @param <%=camelize(name)%>Service
   * @param changeDetectorRef
   */
  constructor(private formBuilder: FormBuilder,
              private <%=camelize(name)%>Service: <%= classify(name) %>Service,
              private changeDetectorRef: ChangeDetectorRef) {
    this.componentId = uuid.v4();
  }

  /**
   * Implementation for OnInit
   * @returns void
   */
  ngOnInit(): void {
    if (this.compConfig && this.compConfig.data) {
      this.$currentLabelsBundle = this.compConfig.data.$currentLabelsBundle;
      this.$currentOptionsBundle = this.compConfig.data.$currentOptionsBundle;
    }
    this.initForm();
    this.compConfig.readonly && this.<%=camelize(name)%>Form.disable();
  }

  /**
   * Implementation for OnDestroy
   * @return void
   */
  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  /**
   * Implementation for AfterViewInit
   * @return void
   */
  ngAfterViewInit(): void {
    this.inputChange && this.inputChange.pipe(takeUntil(this.onDestroy$)).subscribe((changes:<%= classify(name) %>InputConfig) => {
      if(changes){
        this.compConfig = changes;
        this.<%=camelize(name)%>Form.patchValue(this.compConfig.data.model);
        !this.changeDetectorRef['destroyed'] && this.changeDetectorRef.detectChanges();
      }
    });
    this.subscribeToRootFormValueChanges();
    this.<%=camelize(name)%>Form.updateValueAndValidity({ onlySelf: false, emitEvent: true });

  }
  /**
   * Method to initialize form.
   * @return void
   */
  private initForm(): void {
    this.<%=camelize(name)%>Form = this.formBuilder.group({

    });
  }

  /**
   * Function to subscribe to value changes
   * @return Subscription
   */
  subscribeToRootFormValueChanges() {
    this.<%=camelize(name)%>Form.valueChanges
      .pipe(takeUntil(this.onDestroy$), distinctUntilChanged(),
        debounceTime(500))
      .subscribe((value:any) => {
        this.sendOutputData();
      });
  }

  /**
   * Function to prepare data for parent
   * @return void
   */
  private sendOutputData(): void {
    const <%=camelize(name)%>OutputConfig: <%= classify(name) %>OutputConfig = {
      action: <%= classify(name) %>OutputAction.UPDATE,
      formState:{
        isFormValid: this.<%=camelize(name)%>Form.valid,
        formErrors: this.<%=camelize(name)%>Form.errors,
      },
      data: {
        model:this.<%=camelize(name)%>Form.getRawValue()
      }
    } ;

    this.outputChange.next(<%=camelize(name)%>OutputConfig);
  }



}
