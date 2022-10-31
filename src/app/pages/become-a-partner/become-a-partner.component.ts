import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { CommonService } from 'src/app/@core/services/common.service';
import { GenericHttpService } from 'src/app/@core/services/generic-http.service';
import { noWhitespaceValidator } from 'src/app/@core/validators/whitespace.validator';

@Component({
  selector: 'app-become-a-partner',
  templateUrl: './become-a-partner.component.html',
  styleUrls: ['./become-a-partner.component.scss']
})
export class BecomeAPartnerComponent implements OnInit {
  contactInfoForm!: FormGroup;
  countriesList: any = [];
  countriesListArray: any = [];
  userDetail: any = {};
  selectedCountryFlag: any;
  statesList: any = [];
  submitted: boolean = false;
  selectedCountry: any = '';
  cityList: any = [];
  lineOfBusinessList: any = [];
  constructor(private fb: FormBuilder, private httpService: GenericHttpService, private cs: CommonService) { }

  ngOnInit(): void {
    this.contactInfoForm = this.fb.group({
      first_name: new FormControl('', [
        Validators.required,
        noWhitespaceValidator,
      ]),
      last_name: new FormControl('', [
        Validators.required,
        noWhitespaceValidator,
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone_no: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]{10}'),
      ]),
      country_code: new FormControl('United Arab Emirates', [
        Validators.required,
      ]),
      company_name: new FormControl('', [
        Validators.required,
        noWhitespaceValidator,
      ]),
      line_of_business: new FormControl('', [
        Validators.required,
        noWhitespaceValidator,
      ]),
      country: new FormControl('United Arab Emirates', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      expected_limit: new FormControl('', [Validators.required]),
    })
    this.GetCountriesList();
    this.getBusinesses();
  }
  submitPartner() {
    this.submitted = true;
    if (this.contactInfoForm.invalid) {
      return
    }
    console.log(this.contactInfoForm);
    let payload = this.contactInfoForm.value;
    payload.expected_limit = Number(payload.expected_limit)
    this.httpService.httpRequest('post', 'user/become-partner/request', payload).subscribe((res: any) => {
      console.log(res);
      this.cs.showSuccess(res.message, 'Success');
      this.cs.navigate('/home');
    })
  }

  GetCountriesList() {
    if (localStorage.getItem('countries')) {
      this.countriesList = JSON.parse(
        localStorage.getItem('countries') || '{}'
      );
      if (this.userDetail?.country) {
        this.GetStates(this.userDetail?.country)
      } else {
        this.GetStates();
      }
      // this.GetStates(this.userDetail?.country?this.userDetail?.country:null);
    } else {
      this.httpService.GetCountries().subscribe((res: any) => {
        this.countriesList = res;
        this.countriesListArray = this.countriesList;

        if (this.userDetail?.country) {
          this.GetStates(this.userDetail?.country)
        } else {
          this.GetStates();
        }
        // this.GetStates(this.userDetail?.country?this.userDetail?.country:'');
      });
    }
    this.countriesListArray = this.countriesList;
  }
  GetStates(event: any = 'United Arab Emirates', changeCountry?: any) {
    let changeEvent = false;
    let countryName;
    if (changeCountry) {
      countryName = event;
      changeEvent = true;
    } else if (event == 'United Arab Emirates') {
      countryName = 'United Arab Emirates';
    } else {
      countryName = event
    }
    let selectedCountry = this.getCountry(countryName)[0];
    this.selectedCountry = selectedCountry;
    let countryShortName = selectedCountry.shortName;
    this.selectedCountryFlag = selectedCountry.emoji;
    this.selectCountry(selectedCountry);
    let payload = {
      countryShortName: countryShortName
    }
    this.httpService.httpRequest('get', 'user/states-of-country', payload).subscribe((res: any) => {
      console.log(res);
      this.contactInfoForm.patchValue({
        state: '',
        city: ''
      });
      this.statesList = res.states;
      this.cityList = []
    })
    // this.httpService.GetStates(countryShortName).subscribe((res: any) => {
    //   this.contactInfoForm.patchValue({
    //     state: '',
    //   });
    //   this.statesList = res;
    // });
  }
  setCountry(country: any, event: any) {
    country = this.getCountry(event.target.value)[0];
    this.contactInfoForm.patchValue({
      country: country.name
    });
    this.selectedCountryFlag = country.emoji;
    this.GetStates(country.name, true);
    // this.showCountries=false;
  }
  // filterCountries(){
  //   this.contactInfoForm.patchValue({
  //     state: '',
  //   });
  //   this.statesList = [];
  //  this.countriesList= this.countriesListArray.filter((item:any)=>item.name.toLowerCase().indexOf(this.countriesFilter.toLowerCase())!=-1)
  // }
  selectCountry(country: any) {
    this.contactInfoForm.patchValue({
      country: country.name,
      country_code: country.phone,
    });
  }
  getCountry(countryName: string) {
    return this.countriesList.filter(
      (country: any) => country.name == countryName
    );
  }
  getCities(event: any) {
    let state = event.target.value;
    let selectedCountry = this.selectedCountry;
    let selectedState = this.getStateByName(state ? state : this.contactInfoForm.value.state)[0]
    let payload = {
      country_code: selectedState.countryCode,
      state_code: selectedState.isoCode
    }
    this.httpService.httpRequest('get', 'user/cities', payload).subscribe((res: any) => {
      console.log(res);
      this.cityList = res;
      this.contactInfoForm.patchValue({
        city: '',
      });
    })
  }
  getBusinesses() {
    this.httpService.httpRequest('get', 'user/line-of-business').subscribe((res: any) => {
      this.lineOfBusinessList = res.busniess;
    })
  }
  getStateByName(stateName: string) {
    return this.statesList.filter(
      (state: any) => state.name == stateName
    );
  }
}
