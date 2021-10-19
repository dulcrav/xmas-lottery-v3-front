import { Component, OnInit } from '@angular/core';
import { NewWish } from '../model/new-wish.model';
import { TokenStorageService } from '../_services/token-storage.service';
import { WishesService } from '../_services/wishes.service';

@Component({
  selector: 'app-my-wishes',
  templateUrl: './my-wishes.component.html',
  styleUrls: ['./my-wishes.component.css']
})
export class MyWishesComponent implements OnInit {

  user: any;
  form: any = {};

  constructor(private tokenStorage: TokenStorageService, private wishesService: WishesService) { }

  ngOnInit(): void {
    this.user = this.tokenStorage.getUser();
  }

  onSubmit(): void {
    let wish = new NewWish(this.user.id, this.form.wishName);
    this.wishesService.saveWish(wish);
  }

}
