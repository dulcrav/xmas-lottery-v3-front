import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { KidsWishesService } from '../_services/kidswishes.service';
import { NewKidsWish } from '../model/new-kidswish.model';

@Component({
  selector: 'app-kids-wishes',
  templateUrl: './kids-wishes.component.html',
  styleUrls: ['./kids-wishes.component.css']
})
export class KidsWishesComponent implements OnInit {

  user: any;
  form: any = {};
  kidsWishes: any[] = [];
  successfullyAdded = false;
  successfullyDeleted = false;

  constructor(private tokenStorage: TokenStorageService, 
              private kidsWishesService: KidsWishesService) {}

  ngOnInit(): void {
    this.user = this.tokenStorage.getUser();
    this.fetchKidsWishes();
  }

  fetchKidsWishes(): void {
    this.kidsWishesService.getKidsWishes().subscribe(data => {
      this.kidsWishes = data;
    });
  }

  onSubmit(): void {
    let kidsWish = new NewKidsWish(this.form.wishKidName, this.form.wishName);
    this.kidsWishesService.saveKidsWish(kidsWish).subscribe(data => {
      this.successfullyAdded = true;
      setTimeout(() => {
        this.successfullyAdded = false;
      }, 3000);
      this.fetchKidsWishes();
    });
  }

  deleteKidsWish(id: number) {
    this.kidsWishesService.deleteKidsWish(id).subscribe(() => {
      this.successfullyDeleted = true;
      setTimeout(() => {
        this.successfullyDeleted = false;
      }, 3000);
      this.fetchKidsWishes();
    });
  }

}
