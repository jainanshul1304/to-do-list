import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface MailResponse {
  response: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class MailService {
  private apiUrl = 'http://localhost:5000/api/emails/send-mail';
  private http = inject(HttpClient);

  sendMail(
    recipient: string[],
    subject: string,
    text: string
  ): Observable<MailResponse> {
    const token = localStorage.getItem('token');
    console.log(token);
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    const emailData = {
      recipient,
      subject: subject,
      text: text,
    };
    return this.http.post<MailResponse>(this.apiUrl, emailData, { headers });
  }
}
