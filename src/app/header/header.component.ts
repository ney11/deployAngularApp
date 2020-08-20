import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostsService } from '../posts/posts.service';
import { Post } from '../posts/posts.model';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy{
  // userIsAuthenticard = false;
  user: Post;
  private authListenSubs: Subscription;

  constructor(private postsService: PostsService, private router: Router) {}

  ngOnInit() {
    this.postsService.user.subscribe(x => this.user = x);
  }

  onLogout() {
    this.postsService.logout();
    this.router.navigate(['./login']);
  }

  ngOnDestroy() {
    this.authListenSubs.unsubscribe();
  }
}
