import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostsService } from './posts.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})

export class PostsComponent implements OnInit{
  posts = [];
  step = 0;
  private postsSub: Subscription;

  constructor(public postsService: PostsService, public router: Router) {}

  ngOnInit(){
    this.postsService.getAll()
            .pipe(first())
            .subscribe((users: []) => this.posts = users);
  }
}
