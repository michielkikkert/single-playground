import { Route } from '@angular/router';
import { LayoutComponent } from './shared/components/layout/layout.component';

const prefix = 'Angular 20 playground | ';

export const routes: Route[] = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./containers/home/home.component').then(
                        (comp) => comp.HomeComponent,
                    ),
                title: `${prefix} Home`,
            },
            {
                path: 'step1',
                loadComponent: () =>
                    import('./containers/step1/step1.component').then(
                        (comp) => comp.Step1Component,
                    ),
                title: `${prefix} Step 1`,
            },
            {
                path: 'step2',
                loadComponent: () =>
                    import('./containers/step2/step2.component').then(
                        (comp) => comp.Step2Component,
                    ),
                title: `${prefix} Step 2`,
            },
        ],
    },
];
