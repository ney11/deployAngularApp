import { AuthService } from './../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder } from '@angular/forms';
import { FormGroup, FormControl, Validators, FormControlName } from '@angular/forms';
import { PostsService } from 'src/app/posts/posts.service';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit{
  isLoading = false;
  form: FormGroup;
  loading = false;
  submitted = false;

  constructor(public postsService: PostsService, public router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder) {
    if (this.postsService.userValue) {
      this.router.navigate(['/']);
  }
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      userName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      dateOfBirth: new Date()
  });
  }

  get f() { return this.form.controls; }

    onRegister() {
      this.submitted = true;
      if(this.form.invalid) {
        return;
      }
      this.isLoading = true;
      this.postsService.register(this.form.value)
            .pipe(first())
            .subscribe(
                data => {
                  console.log(data);
                  this.router.navigate(['./login']);
                },
                error => {
                  this.loading = false;
                });
    }
}
