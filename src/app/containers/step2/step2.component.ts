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
    resource = httpResource(() =>
        this.id()
            ? `https://jsonplaceholder.typicode.com/users/${this.id()}`
            : undefined,
    );

    constructor() {
        effect(() => {
            // console.log(this.resource?.value());
        });
    }
}
