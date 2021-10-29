import { Component, OnInit } from '@angular/core';
import { LotteryService } from '../_services/lottery.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {

  user: any;
  drawnUser: any;

  constructor(private tokenStorage: TokenStorageService, private lotteryService: LotteryService) { }

  ngOnInit(): void {
    this.user = this.tokenStorage.getUser();
    this.lotteryService.getLotByPlayer(this.user.id).subscribe(data => this.drawnUser = data.drawnUser);
  }

}
