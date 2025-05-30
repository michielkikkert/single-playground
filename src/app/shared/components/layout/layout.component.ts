import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatButton } from '@angular/material/button';
import { RouterState } from '../../../services/router-state';

@Component({
    selector: 'lib-layout',
    imports: [
        CommonModule,
        RouterOutlet,
        MatMenu,
        MatMenuTrigger,
        RouterLink,
        MatButton,
        MatMenuItem,
    ],
    templateUrl: './layout.component.html',
    styleUrl: './layout.component.css',
})
export class LayoutComponent {
    routerState = inject(RouterState);

    // route = inject(Router);
    // events = toSignal(this.route.events);
    // current = computed(() => {
    //     if (!(this.events() instanceof NavigationEnd)) return '';
    //     const step = (this.events() as unknown as NavigationEnd).url?.substring(
    //         1
    //     );
    //     return step ? step : 'Home';
    // });
}
