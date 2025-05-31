import { Component, effect, inject, Injector, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { httpResource, HttpResourceRef } from '@angular/common/http';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { injectRoute } from '../../shared/functions/injectRoute';
import { toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { MatInput } from '@angular/material/input';

@Component({
    selector: 'app-step1',
    imports: [
        CommonModule,
        FormsModule,
        MatButton,
        MatInput,
        ReactiveFormsModule,
    ],
    templateUrl: './step1.component.html',
    styleUrl: './step1.component.css',
})
export class Step1Component {
    route = injectRoute();
    injector = inject(Injector); // Needed for lazy httpResource
    id = model<undefined | number>(2);
    // Old skool debouncing still works best
    formInput = new FormControl<undefined | number>(undefined);
    inputSignal = toSignal(
        this.formInput.valueChanges.pipe(
            distinctUntilChanged(),
            debounceTime(400),
        ),
    );
    eagerResource = httpResource(() =>
        this.inputSignal()
            ? `https://jsonplaceholder.typicode.com/todos/${this.inputSignal()}`
            : undefined,
    );
    lazyResource: HttpResourceRef<any> | undefined;

    // So this is not using a linkedSignal - but it checks this.id() - if empty then it will return undefined for the URL - which doesn't make te request.
    // Nice! But not really as now the previous result disappears on the resource, removing the first result from html..? I don't understand why it works like that.
    // When not simply have it not emit anything if the resulting URL is undefined? So maybe we need the linkedSignal after all?

    loadResource() {
        this.lazyResource = httpResource(
            () =>
                this.inputSignal()
                    ? `https://jsonplaceholder.typicode.com/users/${this.inputSignal()}`
                    : undefined,
            { injector: this.injector },
        );
    }

    constructor() {
        effect(() => {
            this.lazyResource?.value();
            console.log('Load..', this.id());
        });

        effect(() => {
            console.log(this.route());
        });
    }
}
