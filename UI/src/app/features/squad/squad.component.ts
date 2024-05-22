import { Component, OnInit, inject } from '@angular/core';
import { SquadService } from './services/squad.service';
import { Squad } from 'src/app/domain/squad/squad-model';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-squad',
  templateUrl: './squad.component.html',
  styleUrls: ['./squad.component.scss']
})
export class SquadComponent implements OnInit {
  
  private destroy$ = new Subject();  

  private squadService = inject(SquadService);
  private router = inject(Router);

  public squads: Squad[] = [];

  ngOnInit(): void {
    this.squadService.getSquads()
    .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
        this.squads = response;
      });
  }

  openExam(id: number){
    this.router.navigate(['exam-step', id])
  }
}
