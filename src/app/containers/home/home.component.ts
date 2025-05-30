import {
    Component,
    effect,
    inject,
    Injector,
    linkedSignal,
    model,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { httpResource, HttpResourceRef } from '@angular/common/http';
import { MatInput } from '@angular/material/input';

// FIRST ATTEMPT
// SEE STEP! for second attempt

@Component({
    selector: 'app-home',
    imports: [CommonModule, MatSlideToggle, FormsModule, MatButton, MatInput],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})
export class HomeComponent {
    injector = inject(Injector); // Needed for lazy httpResource (unfortunately :-( )
    toggle = model();
    id = model(2);
    requestId = linkedSignal<number, number | undefined>({
        source: this.id,
        computation: (newVal, previous) => {
            if (!newVal) {
                // Why .value? even prevous.source works. I would expect new & prev to be same type here (i.e. the unpacked value signal)? Also, ? is needed here because... ? Why...?
                // I must type the previous as undefined as well as otherwise TS is complaining? But how? previous is a signal so should always have a value?
                // I guess previous.value could be undefined on first emit - but why can previous itself be undefined?
                return previous?.value;
                // return previous?.source also works..???
            }
            // So I can just return newVal here.. not newVal.value like previous? Inconsistency is unexpected here?
            return newVal;
        },
    });
    eagerResource = httpResource(
        () => `https://jsonplaceholder.typicode.com/todos/${this.requestId()}`,
    );
    lazyResource: HttpResourceRef<any> | undefined;

    loadResource() {
        this.lazyResource = httpResource(
            () =>
                `https://jsonplaceholder.typicode.com/users/${this.requestId()}`,
            { injector: this.injector },
        );
    }

    constructor() {
        effect(() => {
            // if (this.lazyResource?.hasValue()) {
            //     // this.lazyResource?.value(); // Will this throw in 20? If so - how should this effect work? Wrap it in an hasValue()? That seems like unneeded friction?
            // }
            console.log('Load..', this.id());
        });
    }
}
