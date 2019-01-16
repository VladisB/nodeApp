import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
// import { ActivatedRoute } from '@angular/router';
import { PositionService } from 'src/app/shared/services/positions.service';
import { OrderService } from '../order.servise';
import { MaterialService } from 'src/app/shared/classes/material.service';
import { switchMap, map } from 'rxjs/operators';

import {ActivatedRoute, Params} from '@angular/router'
// import {Observable} from 'rxjs/index'
import {Position} from '../../shared/interfaces'

@Component({
  selector: 'app-order-positions',
  templateUrl: './order-positions.component.html',
  styles: []
})
export class OrderPositionsComponent implements OnInit {

  positions$: Observable<Position[]>

  constructor(private route: ActivatedRoute,
              private positionsService: PositionService,
              private order: OrderService) {
  }

  ngOnInit() {
    this.positions$ = this.route.params
      .pipe(
        switchMap(
          (params: Params) => {
            return this.positionsService.fetch(params['id'])
          }
        ),
        map(
          (positions: Position[]) => {
            return positions.map(position => {
              position.quantity = 1
              return position
            })
          }
        )
      )
  }

  addToOrder(position: Position) {
    MaterialService.toast(`Добавлено x${position.quantity}`)
    this.order.add(position)
  }

}
