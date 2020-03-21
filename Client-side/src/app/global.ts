import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class Globals {
  readonly _BaseUri = environment.apiUrl;
}
