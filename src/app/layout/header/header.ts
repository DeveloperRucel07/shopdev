import { Component, inject } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule} from '@angular/material/button';
import { RouterLink } from "@angular/router";
import {MatBadgeModule} from '@angular/material/badge';
import { EcommerceStore } from '../../store';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, RouterLink, MatBadgeModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {

  store = inject(EcommerceStore);

}
