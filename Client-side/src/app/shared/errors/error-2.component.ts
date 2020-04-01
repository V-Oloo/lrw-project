import { Component } from '@angular/core'
import { Location } from '@angular/common';

@Component({
    templateUrl: './access-denied.component.html'
})

export class ACCESSDENIED {
  constructor(private _location: Location)
  {}

  backClicked() {
    this._location.back();
  }
}
