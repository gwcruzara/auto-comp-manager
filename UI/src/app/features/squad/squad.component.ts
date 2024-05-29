import { Component, OnInit, inject } from '@angular/core';
import { SquadService } from './services/squad.service';
import { Squad } from 'src/app/domain/squad/squad-model';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { initFlowbite } from 'flowbite';

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
  public squadSelected: Squad | null = null;
  public squadIsOpened: boolean = false;

  ngOnInit(): void {
    this.squadService.getSquads()
    .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
        this.squads = response;
      });
  }

  openExam(id: number) {
    this.router.navigate(['exam-step', id])
  }

  openSquadDetails(squad: Squad) {
    this.squadSelected = squad;
    this.squadIsOpened = true;
  }

  goToRamp() {
    this.router.navigateByUrl(`ramp/${this.squadSelected?.id}`)
  }

  goToTraction() {
    this.router.navigateByUrl(`traction/${this.squadSelected?.id}`)
  }

  goToSpeed() {
    this.router.navigateByUrl(`speed/${this.squadSelected?.id}`)
  }
}
