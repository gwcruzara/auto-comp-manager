import { Component, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { RankingDto } from 'src/app/domain/ranking/ranking-dto.models';
import { Subject, takeUntil } from 'rxjs';
import { RankingStudentService } from './services/ranking-student.service';
import { RankingStudentDto } from 'src/app/domain/ranking/ranking-student.dto.models';

@Component({
  selector: 'app-ranking-student',
  templateUrl: './ranking-student.component.html',
  styleUrls: ['./ranking-student.component.scss']
})
export class RankingStudentComponent implements OnChanges, OnInit {

  private readonly destroy$: Subject<any> = new Subject();

  @Input() title: string = '';

  private rankingService = inject(RankingStudentService);

  rankingDto: RankingStudentDto[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['rankingDto'] && !changes['rankingDto'].firstChange){
      this.rankingDto = this.rankingDto;
    }
  }

  ngOnInit(): void {
    if(this.title === '') {
        this.rankingService.getOverallRanking()
        .pipe(takeUntil(this.destroy$))
        .subscribe(response => {
            this.rankingDto = response;
        });
    }
  }

  getRamp(distance: number | null) : string {    
    return distance !== null ? `${distance}(m)` : 'Pendente'; 
  }

  getTraction(weight: number | null) : string {    
    return weight !== null ? `${weight}(gr)` : 'Pendente'; 
  }

  getSpeed(time: number | null) : string {    
    return time !== null ? `${time}(s)` : 'Pendente'; 
  }
}
