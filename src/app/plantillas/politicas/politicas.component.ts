import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-politicas',
  templateUrl: './politicas.component.html',
  styleUrls: ['./politicas.component.css']
})
export class PoliticasComponent implements OnInit {

  posts = [];
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('http://localhost:4200/politicas-privacidad').subscribe(
      (posts: any = []) => this.posts = posts
    )
  }

}
