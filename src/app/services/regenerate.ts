import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RegenerateService {
  private regenerateAction = new Subject<any>();

  regenerateAction$ = this.regenerateAction.asObservable();

  announceRegeneration(data: any) {
    this.regenerateAction.next(data);
  }
}
