import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd, Event } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcumbs',
  templateUrl: './breadcumbs.component.html',
  styleUrls: ['./breadcumbs.component.scss']
})
export class BreadcumbsComponent implements OnInit {

  public titulo: string;
  public contenido: string;

  constructor(private router: Router, private title: Title, private metaTag: Meta) { }

  ngOnInit(): void {
    this.dataRoutes().subscribe((dataRoutes) => {

      this.titulo = dataRoutes.titulo;
      this.contenido = dataRoutes.descrip;
      this.title.setTitle(this.titulo);

      // Metas Tags
      const metasTag: MetaDefinition = {
          name: this.titulo,
          content: this.contenido
      };
      this.metaTag.updateTag(metasTag);
      // console.log(dataRoutes);
      // console.log('this.titulo: ', this.titulo);
      // console.log('this.contenido: ', this.contenido);
    });
  }


  dataRoutes() {
    return this.router.events.pipe(filter((event: Event) => {
      // console.log('typeof: ', event instanceof ActivationEnd);
      // console.log('event: ', event);
      if (event instanceof ActivationEnd) {
        return true;
      }
    }),
    filter((event: ActivationEnd) => {
      // console.log('evento 2 filter: ', event);
      if (event.snapshot.firstChild === null) {
        // console.log('evento 2 filter: ', event.snapshot.firstChild);
        return true;
      }
    }),
    map((event: ActivationEnd) => {
      // console.log(event);
      return event.snapshot.data;
    }));
  }
}


