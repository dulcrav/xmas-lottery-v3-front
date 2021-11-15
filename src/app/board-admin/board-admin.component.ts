import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { LotteryService } from '../_services/lottery.service';
import { UserService } from '../_services/user.service';
import { WishesService } from '../_services/wishes.service';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {

  content: any;
  lots: any[];
  wishes: any[];

  constructor(private userService: UserService, 
              private lotteryService: LotteryService,
              private wishesService: WishesService) { }

  ngOnInit(): void {
    this.userService.getAdminBoard().subscribe(
      data => {
        this.content = JSON.parse(data);
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
    this.getLots();
    this.getAllWishes();
  }

  drawLots() {
    this.lotteryService.drawLots().subscribe(
      data => {
        this.lots = data;
      },
      err => {
        this.lots = JSON.parse(err.error).message;
      }
    )
  }

  getLots() {
    this.lotteryService.getLots().subscribe(data => {
      this.lots = data;
    },
    err => {
      this.lots = JSON.parse(err.error).message;
    }
  )}

  getAllWishes() {
    this.wishesService.getAllWishes().subscribe(data => {
      this.wishes = data;
    },
    err => {
      this.wishes = JSON.parse(err.error).message;
    })
  }
}
