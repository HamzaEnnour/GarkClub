import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';

declare const Email: any;
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  name;
  email;
  message;
  result;
  subject;
  isLoading: boolean = false;
  sent: boolean = false;
  error: boolean = false;

  a: number = 0;
  b: number = 0;

  constructor(
    private titleService: Title,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Contactez-nous | GARK');
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
          return;
      }
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
  });
    this.generateRandomNumbers();
  }

  generateRandomNumbers() {
    this.a = Math.floor(Math.random() * 20)
    this.b = Math.floor(Math.random() * 20)
  }

  verifyResult() {
    return this.result == (this.a + this.b);
  }


  sendEmail() {
    if (!this.verifyResult() || this.email == "" || this.message == "" || this.subject =="" || this.name == "" || this.isLoading) {
      return;
    }
    this.isLoading = true;
    //console.log("sending")
    Email.send({
      Host: "smtp.gmail.com",
      Username: "gark.assistance@gmail.com",
      Password: "Gark2020",
      To: 'gark.assistance@gmail.com',
      From: this.email,
      Subject: this.subject,
      Body: ` 
      <html>
        <body>
          <table>
            <tr>
              <th> Nom</th>
              <td> ${this.name} </td>
            </tr>
            <tr>
              <th> Email</th>
              <td> ${this.email} </td>
            </tr>
            <tr>
              <th> Message</th>
              <td> ${this.message} </td>
            </tr>
          </table>
        </body>
      </html>`,
    }).then(
      (message) => {        
        this.isLoading = false;
        this.error = false;
        this.generateRandomNumbers();
        // this.result = "";
        this.sent = true;
      }
    ).catch((err) => {      
      this.isLoading = false;
      this.generateRandomNumbers();
      // this.result = "";
      this.error = true;
      this.sent = true; 
    })
  }
}
