import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class RouterState {
    router = inject(Router);
    route = inject(ActivatedRoute);

    constructor() {
        // console.log('Router', this.router);
        //
        // console.log('Activate Route', this.route.url.value);
        //
        // this.router.events.subscribe((events) => {
        //     console.log('EVENTS', events);
        // });
    }
}
