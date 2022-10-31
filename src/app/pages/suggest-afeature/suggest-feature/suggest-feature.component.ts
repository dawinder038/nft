import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GenericHttpService } from '../../../@core/services/generic-http.service';
import { CommonService } from '../../../@core/services/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-suggest-feature',
  templateUrl: './suggest-feature.component.html',
  styleUrls: ['./suggest-feature.component.scss']
})
export class SuggestFeatureComponent implements OnInit {
  suportTicketForm!: FormGroup;
  isFormSubmited: boolean = false;
  code: any = "91"
  constructor(private fb: FormBuilder, private router: Router, private httpService: GenericHttpService, private cs: CommonService) {
    this.suportTicketForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone_no: ['', [Validators.required, Validators.maxLength(10)]],
      country_code: ['971', Validators.required],
      message: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
  }
  get f() {
    return this.suportTicketForm.controls
  }

  submitForm() {
    console.log(this.suportTicketForm.value);
    if (this.suportTicketForm.invalid) {
      this.isFormSubmited = true;
      return
    }
    this.httpService.httpRequest('post', 'user/suggestion', this.suportTicketForm.value).subscribe((res: any) => {
      this.cs.showSuccess(res.message, 'Success');
      console.log(res);
      this.suportTicketForm.reset();
      this.suportTicketForm.reset();
      this.isFormSubmited = false;
      setTimeout(() => {
        this.router.navigateByUrl('/home');
      }, 1000);
    })
  }

  getNumber(data: any) { }

  onCountryChange(data: any) {
    console.log(data);
    this.code = data.dialCode;
    this.suportTicketForm.patchValue({
      country_code: data.dialCode
    })
  }
  telInputObject(obj: any) {
    this.code = this.suportTicketForm.value.country_code
      ? this.suportTicketForm.value.country_code
      : obj.s.dialCode;
    if (this.code) {
      let itemMatched = obj.p.filter((item: any) => {
        if (item.dialCode == this.code) {
          return item;
        }
      });
      if (itemMatched && itemMatched.length > 0)
        obj.setCountry(itemMatched[0].iso2);
      //obj.setCountry(this.profile.country_abv);
    } else {
      obj.setCountry('cd');
    }
  }
  keyPressAlphaNumeric(event: any) {
    var inp = String.fromCharCode(event.keyCode);
    if (/[a-zA-Z ]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
  isNaN(value: any) {
    return isNaN(value)
  }
}

