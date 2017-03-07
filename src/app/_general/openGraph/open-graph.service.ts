import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http } from '@angular/http';

export interface OpenGraphInfo {
  title: string;
  description: string;
  image: string;
}

@Injectable()
export class OpenGraphService {
  apiUrl = 'https://opengraph.io/api/1.0/site/';
  appId = '58bdaad6c8a6f295630edaa4'; // Just free-tier app id, not a big secret

  constructor (private http: Http) {
  }

  parse (url: string): Observable<OpenGraphInfo | undefined> {
    const encodedUrl = encodeURIComponent(url);
    const compiledUrl = `${this.apiUrl}${encodedUrl}?app_id=${this.appId}`;
    return this.http.get(compiledUrl)
      .map(res => res.json())
      .map(json => {
        if (json.error) {
          return undefined;
        }
        const result: OpenGraphInfo = {
          title: json.hybridGraph.title,
          description: json.hybridGraph.description,
          image: json.hybridGraph.image
        };
        return result;
      });
  }

}
