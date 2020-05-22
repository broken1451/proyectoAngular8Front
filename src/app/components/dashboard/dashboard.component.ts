import { Component, OnInit } from '@angular/core';
import { DigimonService } from 'src/app/services/digimon.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public cont: number;
  public digimons: any;
  public loading: any;

  constructor(private digimonService: DigimonService ) { }

  ngOnInit(): void {
    this.cont = 12;
    this.loading = true;
    setTimeout(() => {
      this.digimonService.getDigimons().subscribe((digimons: any) => {
        this.digimons = digimons.slice(0, this.cont);
        this.loading = false;
        // console.log(digimons);
      });
    }, 2000);
  }

}
