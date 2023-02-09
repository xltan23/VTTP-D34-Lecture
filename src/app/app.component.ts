import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpBinService } from './http-bin.service';
import { UserData } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'D34';

  // VARIABLES
  data!:UserData 
  form!:FormGroup

  // CONSTRUCTOR
  constructor(private http:HttpClient, private fb:FormBuilder, private httpBinSvc:HttpBinService) {}

  // METHODS
  // Form creation
  ngOnInit(): void {
      this.form = this.fb.group({
        userId:this.fb.control('123'),
        name:this.fb.control('txl'),
        email:this.fb.control('txl@gmail.com')
      })
  }

  // Triggered upon "POST"
  // Straight up post UserData object to httpbin.org
  doPost() {
    const formData:UserData = this.form.value
    this.httpBinSvc.doPost(formData)
      .then(result => {
        console.info('>>> Result: ', result)
        // Pass result to data (to be called and displayed in html)
        this.data = result
      })
      .catch(error => {
        console.error('>>> Error: ', error)
      })
  }

  // Triggered upon "POST As Form"
  // Post form data to httpbin.org
  doPostAsForm() {
    const formData:UserData = this.form.value
    this.httpBinSvc.doPostAsForm(formData)
      .then(result => {
        console.info('>>> Result: ', result)
        this.data = result
      })
      .catch(error => {
        console.error('>>> Error: ', error)
      })
  }

  // Triggered upon "GET"
  processForm() {
    const formData:UserData = this.form.value
    this.httpBinSvc.doGet(formData)
      .then(result => {
        console.info('>>> In then')
        this.data = result
      })
      .catch(error => {
        console.info('>>> In error')
        console.error('>>> Error: ', error)
      })
      .finally(() => {
        console.info('>>> In finally')
        this.ngOnInit()
      })
  }
}
