import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {<%= classify(name) %>Component} from './cc-<%= dasherize(name) %>.component';
import {<%= classify(name) %>Service} from './cc-<%= dasherize(name) %>.service';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [<%= classify(name) %>Component],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [<%= classify(name) %>Component],
  providers: [<%= classify(name) %>Service],
})
export class <%= classify(name) %>Module {}
