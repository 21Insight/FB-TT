import { Component } from '@angular/core';
import { AlbumsService } from './services/albums.service';
import { Album } from './models/albums';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  albums: Array<Album> = [];

  constructor(private albumsService: AlbumsService) {}

  ngOnInit(): void {}

  getAlbums(albums: string) {
    this.albumsService.getAlbums(albums).subscribe((response: Array<Album>) => {
      this.albums = response;
    });
  }
}
