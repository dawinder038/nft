import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class GenericHttpService {

  baseURL = environment.baseURL;
  imgUrl = environment.imgUrl;
  originalImgUrl = this.imgUrl + 'original/';
  smallImgUrl = this.imgUrl + 'small/';
  mediumImgUrl = this.imgUrl + 'medium/';

  constructor(private http: HttpClient, private cs: CommonService) { }

  GetCountries() {
    return this.http.get(`${this.baseURL}user/countries`)
  }
  GetStates(countryCode: string) {
    return this.http.get(`${this.baseURL}user/states?countryShortName=${countryCode}`)
  }

  SignUp(formData: any) {
    return this.http.post(`${this.baseURL}user/signUp`, formData, { headers: { skip: "true" } })
  }

  Login(formData: any) {
    return this.http.post(`${this.baseURL}user/login`, formData, { headers: { skip: "true" } });
  }

  forgetPassword(formData: any) {
    return this.http.post(`${this.baseURL}user/forgot-password`, formData, { headers: { skip: "true" } });

  }
  submitForgetPasswordOtp(formData: any) {
    return this.http.post(`${this.baseURL}user/verify/reset-password-otp`, formData, { headers: { skip: "true" } });

  }
  resetPassword(formData: any, token: string) {
    return this.http.post(`${this.baseURL}user/reset-password`, formData, { headers: { Authorization: token, skip: "true" } });
  }

  getProfileDetail(data?: any) {
    return this.http.get(`${this.baseURL}user/profile`, { params: data });
  }

  editProfileDetail(formData: any) {
    return this.http.put(`${this.baseURL}user/profile`, formData, { headers: {} });
  }

  checUsernameAvalability(username: string) {
    return this.http.get(`${this.baseURL}user/user-name/exist?user_name=` + username);
  }

  checkEmailAvalability(email: string) {
    return this.http.get(`${this.baseURL}user/email/exist?email=` + email);
  }

  sendVerificationEmail(payload: any, token: any) {
    return this.http.post(`${this.baseURL}user/resend/email`, payload, { headers: { Authorization: token, skip: 'true' } });
  }

  verifyEmail(payload: any) {
    return this.http.post(`${this.baseURL}user/email/verify`, payload);
  }

  uploadImage(formData: any) {
    return this.http.post(`${this.baseURL}upload`, formData, { headers: { skip: "true" } });
  }

  submitFormData(formData: any, params: any) {
    let headerToken = this.cs.getLocalStorageData('user-session') || '';
    return this.http.post(`${this.baseURL}gift/nft-by-csv`, formData, { headers: { skip: "true", Authorization: headerToken, }, params: params });

  }

  getBNBValue() {
    return this.http.get("https://api.polygon.io/v2/aggs/ticker/X:BNBUSD/prev?adjusted=true&apiKey=Xf3wJE7Lt8Bj4h1r2J1eXsyhtpXIvocK", { headers: { skip: "true" } });
  }

  getUrl(url: any) {
    return this.baseURL + url;
  }




  getHeader(isSkipHeader?: any, token?: string) {
    let headerToken = (token ? token : this.cs.getLocalStorageData('user-session')) || ''
    let headers: HttpHeaders
    if (!isSkipHeader) {
      headers = new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": headerToken,
      });
    } else {
      headers = new HttpHeaders({
        "skip": "true",
        "Authorization": token ? token : '',
      });
    }
    return headers;
  }
  httpRequest(req: string, serverURL: String, data?: any, isSkipHeader?: any, token?: string) {
    if (req == 'get') {
      return this.http.get(this.getUrl(serverURL), {
        headers: this.getHeader(isSkipHeader, token),
        params: data
      });
    } else if (req == 'post') {
      return this.http.post(this.getUrl(serverURL), data, {
        headers: this.getHeader(isSkipHeader, token),
      });
    } else if (req == 'put') {
      return this.http.put(this.getUrl(serverURL), data, {
        headers: this.getHeader(isSkipHeader, token),
      });
    } else if (req == 'patch') {
      return this.http.patch(this.getUrl(serverURL), data, {
        headers: this.getHeader(isSkipHeader, token),
      });
    } else {
      let request = {
        body: data,
        headers: this.getHeader(isSkipHeader, token),
      };
      return this.http.delete(this.getUrl(serverURL), request);
    }
  }





  AuthenticateVenly() {
    let params = {
      grant_type: 'client_credentials',
      client_id: 'Testaccount-capsule',
      client_secret: '82c19251-1753-44f5-ae76-93438d3628de'
    }
    return this.http.post(`${this.baseURL}auth`, params, { headers: { skip: "true" } });

  }

  CreateWallet() {
    let params = {
      "walletType": "WHITE_LABEL",
      "secretType": "BSC",
      "identifier": "type=unrecoverable",
      "description": "My first unrecoverable wallet",
      "pincode": "1234"
    }
    return this.http.post(`${this.baseURL}wallet/newWallet`, params);
  }

  GetAllWallets() {
    return this.http.get(`${this.baseURL}wallet/allWallets`);
  }

  GetWalletBalance(wallet_id: string) {
    return this.http.get(`${this.baseURL}wallet/walletBalance/${wallet_id}`);
  }

  GetTokenBalance(wallet_id: string = 'bb32c421-2d6a-4c6f-ab47-24bbf4904f5e') {
    return this.http.get(`${this.baseURL}wallet/tokenBalance/${wallet_id}`);
  }


}
