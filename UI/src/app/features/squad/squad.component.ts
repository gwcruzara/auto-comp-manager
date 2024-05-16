import { Component, OnInit, ViewChild } from '@angular/core';
import { SquadService } from './services/squad.service';
import { Squad } from 'src/app/domain/squad/squad-model';
import { MatAccordion } from '@angular/material/expansion';
import { Router } from '@angular/router';

@Component({
  selector: 'app-squad',
  templateUrl: './squad.component.html',
  styleUrls: ['./squad.component.scss']
})
export class SquadComponent implements OnInit {

  squads: Squad[] = [];

  @ViewChild(MatAccordion) accordion!: MatAccordion;


  constructor(private readonly squadService: SquadService, private readonly router: Router){

  }

  ngOnInit(): void {
    this.squadService.getSquads().subscribe(response => {
      this.squads = response;
      console.log(this.squads)
    });
  }

  openExam(id: number){
    this.router.navigate(['exam-step', id])
  }

}
