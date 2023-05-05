import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResponse, ApiConfig } from '../models/api.interface';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.url;
  }

  // Data sent to the server is stored in the request body of the HTTP request
  post<T = any>(url, data, config?: ApiConfig): Observable<ApiResponse<T>> {
    return this.http.post<ApiResponse<T>>(
      this.apiUrl + url,
      data,
      this.getCustomHeader(config)
    );
  }

  //This will Put request updates a resource at a specified URI
  put<T = any>(url, data, config?: ApiConfig): Observable<ApiResponse<T>> {
    return this.http.put<ApiResponse<T>>(
      this.apiUrl + url,
      data,
      this.getCustomHeader(config)
    );
  }

  // This will the PATCH method applies partial modifications to a resource
  patch<T = any>(url, data, config?: ApiConfig): Observable<ApiResponse<T>> {
    return this.http.patch<ApiResponse<T>>(
      this.apiUrl + url,
      data,
      this.getCustomHeader(config)
    );
  }

  //HTTP DELETE method is used to delete a resource from the server
  delete<T = any>(url, config?: ApiConfig): Observable<ApiResponse<T>> {
    return this.http.delete<ApiResponse<T>>(
      this.apiUrl + url,
      this.getCustomHeader(config)
    );
  }

  //  Delete With Query if key is null ,undefiend or empty
  deleteWithQuery<T = any>(
    url,
    httpParams?: any,
    config?: ApiConfig
  ): Observable<ApiResponse<T>> {
    for (let item in httpParams) {
      if (
        httpParams[item] === '' ||
        httpParams[item] === undefined ||
        httpParams[item] === null
      ) {
        delete httpParams[item];
      }
    }
    const header = this.getCustomHeader(config);
    if (httpParams) {
      header['params'] = httpParams;
    }
    return this.http.delete<ApiResponse<T>>(this.apiUrl + url, header);
  }

  // This will used to retreive data from a server at the specified resource
  get<T = any>(
    url,
    httpParams?: any,
    config?: ApiConfig
  ): Observable<ApiResponse<T>> {
    for (let item in httpParams) {
      if (
        httpParams[item] === '' ||
        httpParams[item] === undefined ||
        httpParams[item] === null
      ) {
        delete httpParams[item];
      }
    }
    const header = this.getCustomHeader(config);
    if (httpParams) {
      header['params'] = httpParams;
    }
    return this.http.get<ApiResponse<T>>(this.apiUrl + url, header);
  }

  // This will get custom header
  getCustomHeader(config) {
    if (config && config.customHeader) {
      return {
        headers: {
          config: JSON.stringify(config || {}),
          ...config.customHeader,
        },
      };
    }
    return {
      headers: {
        config: JSON.stringify(config || {}),
      },
    };
  }

  // This will fetch language through get api
  fetchLanguageData(url): Observable<any> {
    return this.http.get(url);
  }
}
