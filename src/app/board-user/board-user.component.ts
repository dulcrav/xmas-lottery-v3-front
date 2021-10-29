import { Component, OnInit } from '@angular/core';
import { LotteryService } from '../_services/lottery.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { WishesService } from '../_services/wishes.service';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {

  user: any;
  drawnUser: any;
  wishes: any;
  areDisplayedWishes = false;

  constructor(private tokenStorage: TokenStorageService, 
              private lotteryService: LotteryService,
              private wishesService: WishesService) { }

  ngOnInit(): void {
    this.user = this.tokenStorage.getUser();
    this.lotteryService.getLotByPlayer(this.user.id).subscribe(data => this.drawnUser = data.drawnUser);
  }

  displayWishes(): void {
    this.areDisplayedWishes = true;
    this.wishesService.getWishesByUserId(this.drawnUser.id).subscribe(data => this.wishes = data);
  }

}
