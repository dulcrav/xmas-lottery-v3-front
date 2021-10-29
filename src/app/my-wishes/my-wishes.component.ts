import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  wishes: any[] = [];
  successfullyAdded = false;
  successfullyDeleted = false;

  constructor(private tokenStorage: TokenStorageService, 
              private wishesService: WishesService,
              private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.user = this.tokenStorage.getUser();
    this.fetchWishes();
  }

  fetchWishes(): void {
    this.wishesService.getWishesByUserId(this.user.id).subscribe(data => {
      this.wishes = data;
    });
  }

  onSubmit(): void {
    let wish = new NewWish(this.user.id, this.form.wishName);
    this.wishesService.saveWish(wish).subscribe(data => {
      this.successfullyAdded = true;
      setTimeout(() => {
        this.successfullyAdded = false;
      }, 3000);
      this.fetchWishes();
    });
    
  }

  deleteWish(id: number) {
    this.wishesService.deleteWish(id).subscribe(() => {
      this.successfullyDeleted = true;
      setTimeout(() => {
        this.successfullyDeleted = false;
      }, 3000);
      this.fetchWishes();
    });
  }

  tracker(item, index) {
    return `${item.id}-${index}`;
  }

}
