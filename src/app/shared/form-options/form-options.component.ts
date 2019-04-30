/*
 * @CreateTime: Sep 6, 2018 4:49 PM
 * @Author:  Mikael Araya
 * @Contact: MikaelAraya12@gmail.com
 * @Last Modified By:  Mikael Araya
 * @Last Modified Time: Sep 6, 2018 4:52 PM
 * @Description: Modify Here, Please
 */
import { Location } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-form-options',
  templateUrl: './form-options.component.html',
  styleUrls: ['./form-options.component.css']
})
export class FormOptionsComponent implements OnInit {

  @Input() isSelfContained: Boolean;
  @Input() submitDisabled: Boolean;
  @Input() cancelDisabled: Boolean;

  constructor(private location: Location) {
    // setting default valeue
    this.cancelDisabled = false;
    this.submitDisabled = false;
    this.isSelfContained = true;
  }

  ngOnInit() {
  }

  // on cancel button click return the user back
  cancel() {
    this.location.back();
  }

}
