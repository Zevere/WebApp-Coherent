import { FormGroup } from '@angular/forms';
import { ValidationErrors } from '@angular/forms/src/directives/validators';

/**
 * Checks for the value in the group controls to be the same
 * @param group Form group controls
 */
export function areEqual(group: FormGroup): ValidationErrors | null {
    let isValid = true;
    const values = [];

    // noinspection TsLint
    for (const controlName in group.controls) {
        const newValue = group.controls[controlName].value;

        if (values.some(v => v !== newValue)) {
            isValid = false;
            break;
        }

        values.push(newValue);
    }

    if (isValid) {
        return null;
    }
    return {
        areEqual: true
    };
}
