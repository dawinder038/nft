import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/@core/services/common.service';
import { GenericHttpService } from 'src/app/@core/services/generic-http.service';
import { noWhitespaceValidator } from 'src/app/@core/validators/whitespace.validator';
import { Location } from '@angular/common';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { NgbCalendar, NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss'],
})
export class PersonalDetailsComponent implements OnInit {
  signUpDetailForm: any;
  submitted1: boolean = false;
  submitted: boolean = false;
  loading: boolean = false;
  countriesList: any[] = [];
  statesList: any[] = [];
  verifyToken: any = '';
  signupToken: any = '';
  userDetail: any = {};
  showCountries: boolean = false;
  selectedCountryFlag: any = '';
  countriesFilter: any = '';
  countriesListArray: any = [];
  isUsernameAvailable: boolean = true;
  maxDate = new Date().getDate();
  maxMonth = new Date().getMonth();
  maxYear = new Date().getFullYear();
  isDisabled = (date: NgbDate, current: { month: number, year: number }) => date.month !== current.month;
  model!: NgbDateStruct;

  constructor( private fb: FormBuilder, private httpService: GenericHttpService, private router: Router, private commonService: CommonService, private route: ActivatedRoute, private location: Location, private calendar: NgbCalendar) {
    let token = route.snapshot.queryParamMap.get('token');
    if (token) {
      this.location.replaceState('/personal-details');
      this.verifyToken = token;
      this.commonService.removeLocalStorageItem('unVerifiedEmail');
      this.commonService.removeLocalStorageItem('unVerifiedEmailVerificationToken');
      this.verifyEmail();
    } else {
      this.userDetail = this.commonService.getParsedLocalStorageData('unVerifiedUserDetails');
      if (!this.userDetail.dobObj && this.userDetail.dob) {
        let dob = new Date(this.userDetail.dob);
        this.userDetail.dobObj = {
          year: dob.getFullYear(), month: dob.getMonth() + 1, day: dob.getDate()
        }
      }
      this.signupToken = this.commonService.getLocalStorageData('verificationToken');
      if (!this.signupToken) {
        this.commonService.navigate('/home');
      }
    }
  }
  ngOnInit(): void {
    this.commonService.preventBackButton();
    this.signUpDetailForm = this.fb.group({
      first_name: new FormControl(this.userDetail?.first_name ? this.userDetail?.first_name : '', [ Validators.required, noWhitespaceValidator]),
      last_name: new FormControl(this.userDetail?.last_name ? this.userDetail?.last_name : '', [ Validators.required, noWhitespaceValidator]),
      user_name: new FormControl(this.userDetail?.user_name ? this.userDetail?.user_name : '', Validators.required),
      phone_no: new FormControl(this.userDetail?.phone_no ? this.userDetail?.phone_no : '', [Validators.required, Validators.pattern('[0-9]{10}')]),
      dob: new FormControl(this.userDetail?.dobObj ? this.userDetail?.dobObj : '', [Validators.required]),
      country_code: new FormControl(this.userDetail?.country_code ? this.userDetail?.country_code : 'United Arab Emirates', [Validators.required]),
      country: new FormControl(this.userDetail?.country ? this.userDetail?.country : 'United Arab Emirates', [Validators.required]),
      state: new FormControl(this.userDetail?.state ? this.userDetail?.state : '', [Validators.required]),
    });
    this.signUpDetailForm.get('user_name')?.valueChanges.pipe(debounceTime(800), distinctUntilChanged()).subscribe((value: string) => {
      console.log('user_name value changed');
      console.log(value);
      this.checkUsernameAvalability(value)
    });
    this.countriesFilter = this.userDetail?.country ? this.userDetail?.country : 'United Arab Emirates';
    this.GetCountriesList();
  }

  checkUsernameAvalability(value: string) {
    let perm = {
      user_name: value
    }
    this.httpService.httpRequest('get', 'user/user-name/exist', perm, true, this.signupToken).subscribe((res: any) => {
      this.isUsernameAvailable = res.user_name_exist ? false : true
    });
  }
  verifyEmail() {
    let payload = {
      token: this.verifyToken,
    };
    this.httpService.verifyEmail(payload).subscribe(
      (res: any) => {
        console.log(res);
        this.commonService.showSuccess(res.message, 'Success');
        this.signupToken = res.token;
        this.commonService.removeLocalStorageItem('');
        this.commonService.setLocalStorage('verificationToken', res.token);
      },
      (err: any) => {
        this.router.navigate(['/login']);
      }
    );
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
    } else {
      this.httpService.GetCountries().subscribe((res: any) => {
        this.countriesList = res;
        this.countriesListArray = this.countriesList;

        if (this.userDetail?.country) {
          this.GetStates(this.userDetail?.country)
        } else {
          this.GetStates();
        }
      });
    }
    this.countriesListArray = this.countriesList;
  }
  selectCountry(country: any) {
    this.signUpDetailForm.patchValue({
      country: country.name,
      country_code: country.phone,
    });
  }

  getCountry(countryName: string) {
    return this.countriesList.filter(
      (country: any) => country.name == countryName
    );
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
    let countryShortName = selectedCountry.shortName;
    this.selectedCountryFlag = selectedCountry.emoji;
    this.selectCountry(selectedCountry);

    this.httpService.GetStates(countryShortName).subscribe((res: any) => {
      this.signUpDetailForm.patchValue({
        state: changeEvent ? '' : this.userDetail.state ? this.userDetail.state : '',
      });
      this.statesList = res;
    });
  }


  SignUp() {
    this.submitted = true;
    if (!this.isUsernameAvailable) {
      return
    }
    if (this.signUpDetailForm.valid) {
      if (!this.loading) {
        this.loading = true;
        let params = this.signUpDetailForm.value;
        let dobObj = params.dob;
        params.dob = '' + dobObj.year + '-' + ('0' + dobObj.month).slice(-2) + '-' + ('0' + dobObj.day).slice(-2);
        this.httpService.httpRequest('post','user/personal-info',params,true,this.signupToken).subscribe({next: (res: any) => {
          this.commonService.showSuccess(res.message, 'Success');
          console.log('res', res);
          this.commonService.setStrLocalStorage('unVerifiedUser', res.user);
          params.dobObj = dobObj;
          this.commonService.setStrLocalStorage('unVerifiedUserDetails', params);
          this.router.navigate(['/verify-otp']);
          },
            error: (err: any) => (this.loading = false),
          });
      }
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
  logout() {
    localStorage.clear();
    this.commonService.navigate('/login');
    this.commonService.showSuccess('Logged Out Successfully')
  }
  setCountry(country: any, event: any) {
    this.GetStates(country.name, true);
    this.showCountries = false;
  }
  filterCountries() {
    this.signUpDetailForm.patchValue({
      state: '',
    });
    this.statesList = [];
    this.countriesList = this.countriesListArray.filter((item: any) => item.name.toLowerCase().indexOf(this.countriesFilter.toLowerCase()) != -1)
  }
  onlyNumericValuesAllowed(event: any) {
    if(event.keyCode >= 48 && event.keyCode <= 57) {
      return true;
    } else {
      return false;
    }
  }
}
