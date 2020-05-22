import { Component, OnInit } from '@angular/core';
import { DigimonService } from '../../services/digimon.service';
import { RickMortyService } from '../../services/rick-morty.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public cont: number;
  public digimons: any;
  public characters: any;
  public loading: any;

  constructor(private digimonService: DigimonService, private rickMortService: RickMortyService) { }

  ngOnInit(): void {
    this.cont = 12;
    this.loading = true;
    // this.digimonService.getDigimons().subscribe((digimons: any) => {
    //   this.digimons = digimons.slice(0, this.cont);
    //   // console.log(digimons);
    // });
    setTimeout(() => {
      this.rickMortService.getCharacters().subscribe((characters) => {
        this.characters = characters.slice(0, this.cont);
        this.loading = false;
        // console.log(characters);
      });
    }, 2000);
  }

}
