import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MailService } from '../../services/mail.services';

@Component({
  selector: 'app-mail',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  recipient: string[] = [];
  mail = inject(MailService);

  sendMails = new FormGroup({
    recipient_mail_id: new FormControl(''),
    mail_subject: new FormControl(''),
    mail_text: new FormControl(''),
  });

  add() {
    this.recipient.push(this.sendMails.value.recipient_mail_id ?? '');
    this.sendMails.get('recipient_mail_id')?.reset();
    console.log(this.recipient);
  }

  send() {
    this.mail
      .sendMail(
        this.recipient,
        this.sendMails.value.mail_subject ?? '',
        this.sendMails.value.mail_text ?? ''
      )
      .subscribe(
        (response) => {
          console.log(response.response);
        },

        (error) => {
          console.error(error);
        }
      );
  }
}
