import {Injectable} from '@angular/core';
import {<%= classify(name) %>Module} from "./cc-<%= dasherize(name) %>.module";
@Injectable({
  providedIn: <%= classify(name) %>Module,
})
export class <%= classify(name) %>Service {
  /**
   * Constructor
   */
  constructor() {
  }

}
