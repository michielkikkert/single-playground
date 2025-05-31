import { Component, effect, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-step2',
    imports: [CommonModule, FormsModule],
    templateUrl: './step2.component.html',
    styleUrl: './step2.component.css',
})
export class Step2Component {
    id = model<undefined | number>(undefined);
    test: string | undefined =
        "I should update after 2 secs, but I won't because zoneless";
    resource = httpResource(() =>
        this.id()
            ? `https://jsonplaceholder.typicode.com/users/${this.id()}`
            : undefined,
    );

    constructor() {
        effect(() => {
            // value() can throw on Http error so either try/catch:
            try {
                console.log(this.resource.value());
            } catch (e) {
                console.log('Caught by try/catch in effect!', { e });
            }
            // OR
            if (!this.resource.error()) {
                console.log(this.resource.value());
            }
        });

        // effect(() => {
        //     this.test = this.id();
        // });

        // This should not update the DOM as we are zoneless
        // It will update if something else triggers change detection
        setTimeout(() => {
            this.test =
                'I updated because something else triggered change detection!';
        }, 2000);
    }
}
