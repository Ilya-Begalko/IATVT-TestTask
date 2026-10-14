import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter, map, startWith } from 'rxjs';

@Component({
  selector: 'app-main-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './main-header.html',
  styleUrl: './main-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainHeader {
  private readonly router = inject(Router);

  protected readonly title = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map(() => headingFrom(this.router)),
      startWith(headingFrom(this.router)),
    ),
    { requireSync: true },
  );
}

function headingFrom(router: Router): string {
  let route = router.routerState.snapshot.root;
  while (route.firstChild) {
    route = route.firstChild;
  }

  const heading = route.data['heading'];
  return typeof heading === 'string' ? heading : 'Экран отображения данных ';
}
