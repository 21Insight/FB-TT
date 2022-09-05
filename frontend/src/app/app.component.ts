import { Component, OnInit } from '@angular/core';
import { AlbumsService } from './services/albums.service';
import { Album } from './models/albums';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit {
  formGroup: FormGroup;
  albums: Array<Album> = [];
  page: number;

  constructor(private fb: FormBuilder, private albumsService: AlbumsService) {}

  ngOnInit(): void {
    this.builForm();
  }

  builForm() {
    this.formGroup = this.fb.group({
      albumSearch: new FormControl('', Validators.required),
    });
  }

  getAlbums() {
    const albumSearch = this.formGroup.get('albumSearch').value;
    this.albumsService
      .getAlbums(albumSearch)
      .subscribe((response: Array<Album>) => {
        this.albums = response;
      });
  }

  keyPressAlphaNumeric(event: any) {
    const regex = new RegExp('[^@<>!"#$%&/*]');
    const inp = String.fromCharCode(event.keyCode);
    if (!regex.test(inp)) {
      event.preventDefault();
      return false;
    }
    return true;
  }

  goToAlbum(url: string) {
    window.open(url, '_blank');
  }
}
