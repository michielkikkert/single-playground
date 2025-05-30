import { ActivatedRoute } from '@angular/router';
import { computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

export function injectRoute() {
    const route = inject(ActivatedRoute);
    const routeChanges = toSignal(route.url);

    return computed(() => {
        routeChanges();

        return route;
    });
}
