import {IContextMessage, ILuigiContextTypes, NgLuigiContextService} from '../ng-luigi-context-service';
import {addContextUpdateListener, addInitListener, Context} from '@luigi-project/client';
import {Observable, ReplaySubject} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NgLuigiContextServiceImpl implements NgLuigiContextService{
  private subject: ReplaySubject<IContextMessage> = new ReplaySubject<IContextMessage>(1);
  private currentContext: IContextMessage;

  constructor() {
    addInitListener(initContext => {this.addListener(ILuigiContextTypes.INIT, initContext)});
    addContextUpdateListener(updateContext => {this.addListener(ILuigiContextTypes.UPDATE, updateContext)});
  }

  public listenContext(): Observable<IContextMessage> {
    return this.subject.asObservable();
  }

  public getContext(): Context {
    return this.currentContext && this.currentContext.context;
  }

  public setContext(obj: IContextMessage): void {
    this.currentContext = obj;
    this.subject.next(obj);
  }

  addListener(contextType:ILuigiContextTypes, context: Context){
    console.debug('[LuigiContextService] ' + contextType + 'context');
    this.setContext({
      contextType,
      context
    } as IContextMessage);
  }

}
