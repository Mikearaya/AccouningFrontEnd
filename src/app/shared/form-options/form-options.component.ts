/**
 * /*
 *
 * @format
 * @CreateTime: Sep 6, 2018 4:49 PM
 * @Author: Mikael Araya
 * @Contact: MikaelAraya12@gmail.com
 * @Last Modified By: Naol
 * @Last Modified Time: May 1, 2019 12:55 PM
 * @Description: Modify Here, Please
 */

import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-form-options',
    templateUrl: './form-options.component.html',
    styleUrls: ['./form-options.component.css'],
})
export class FormOptionsComponent implements OnInit {
    @Input() isSelfContained: boolean;
    @Input() submitDisabled: boolean;
    @Input() cancelDisabled: boolean;
    @Input() showDelete: boolean;
    @Input() isUpdate: boolean;
    buttonText: string;

    constructor(private location: Location, private router: Router) {
        // setting default valeue
        this.cancelDisabled = false;
        this.submitDisabled = false;
        this.isSelfContained = true;
    }

    ngOnInit() {
        if (this.isUpdate) {
            this.buttonText = 'Update';
        } else {
            this.buttonText = 'Submit';
        }
    }

    // on cancel button click return the user back
    cancel() {
        this.location.back();
        // this.router.navigate(["../"]);
    }
}
