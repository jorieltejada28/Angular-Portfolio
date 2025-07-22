import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private titleService: Title) {}

  ngOnInit(): void{
    this.titleService.setTitle('Sign In');
  }
}
