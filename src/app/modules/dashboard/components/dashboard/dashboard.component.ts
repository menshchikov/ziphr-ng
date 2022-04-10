import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import {
  select,
  Store
} from "@ngrx/store";
import { init } from "../../store/dashboard.actions";
import {
  selectDashboardIsLoading,
  selectDashboardState
} from "../../store/dashboard.selectors";
import { initialState } from "../../store/dashboard.reducer";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit, OnDestroy {
  isLoading$ = this.store$.select(selectDashboardIsLoading);
  state = initialState;
  private stateSubscription: Subscription;

  constructor(
    private store$: Store
  ) { }

  ngOnInit(): void {
    this.store$.dispatch(init());

    this.stateSubscription = this.store$.pipe(
      select(selectDashboardState),
    ).subscribe(
      state => {
        this.state = state;
      }
    )
  }

  ngOnDestroy(): void {
    this.stateSubscription.unsubscribe();
  }

}
