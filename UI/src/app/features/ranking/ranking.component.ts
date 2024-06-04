import { Component, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { RankingDto } from 'src/app/domain/ranking/ranking-dto.models';
import { RankingService } from './services/ranking.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnChanges, OnInit {

  private readonly destroy$: Subject<any> = new Subject();

  @Input() title: string = '';
  @Input() rankingDto: RankingDto[] = [];

  private rankingService = inject(RankingService);

  ranking?: RankingDto[];

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['rankingDto'] && !changes['rankingDto'].firstChange){
      this.rankingDto = this.rankingDto;
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

  ngOnInit(): void {
    if(this.title === '') {
        this.rankingService.getOverallRanking()
        .pipe(takeUntil(this.destroy$))
        .subscribe(response => {
            this.rankingDto = response;
        });
    }
  }
}
