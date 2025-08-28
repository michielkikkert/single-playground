import { Component, effect, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { timer } from 'rxjs';

@Component({
    selector: 'app-step2',
    imports: [CommonModule, FormsModule, MatButton],
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

        // This will update the dom for test - as CD triggert by the signal change
        // effect(() => {
        //     this.test = 'Update triggered in Effect:' + this.id();
        // });

        // This should not update the DOM as we are zoneless
        // It will update if something else triggers change detection
        // setTimeout(() => {
        //     this.test =
        //         'I updated because something else triggered change detection!';
        // }, 2000);

        // Below also DOES NOT update the DOM in zoneless
        timer(1000).subscribe(() => {
            console.log('timer!');
            this.test = 'Updated in sub!';
        });
    }

    updateTest() {
        this.test = 'Updated!';
    }
}
