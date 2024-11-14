import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HabitacionesService } from 'src/app/services/habitaciones.service';

@Component({
  selector: 'app-listroomsfilter',
  templateUrl: './listroomsfilter.component.html',
  styleUrls: ['./listroomsfilter.component.css'],
})
export class ListroomsfilterComponent implements OnInit {
  habitaciones: any[] = [];
  capacidad: number;
  fechaEntrada: Date;
  fechaSalida: Date;
  fechaEntradaPasada: string;
  fechaSalidaPasada: string;
  diasHospedaje: number;

  constructor(
    private _habitacionService: HabitacionesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.capacidad = +params['capacidad'];
      this.fechaEntrada = new Date(params['fechaIni']);
      this.fechaSalida = new Date(params['fechaFin']);

      if (this.capacidad && this.fechaEntrada && this.fechaSalida) {
        this._habitacionService
          .filtrarHabitaciones(
            this.capacidad,
            this.fechaEntrada,
            this.fechaSalida
          )
          .subscribe(
            (data: any) => {
              this.habitaciones = data.habitaciones;
            },
            (error) => {
              console.error('Error al obtener habitaciones filtradas:', error);
            }
          );
      } else {
        console.error('No se proporcionaron todos los parámetros necesarios.');
      }
    });

    var fechas = localStorage.getItem('fechas');
    if (fechas) {
      const parsedFechas = JSON.parse(fechas);

      const fechaEntrada = new Date(parsedFechas.fechaIni);
      const fechaSalida = new Date(parsedFechas.fechaFin);

      this.fechaEntradaPasada = fechaEntrada.toISOString().split('T')[0];
      this.fechaSalidaPasada = fechaSalida.toISOString().split('T')[0];

      const diferenciaMilisegundos =
        fechaSalida.getTime() - fechaEntrada.getTime();
      const diferenciaDias = diferenciaMilisegundos / (1000 * 60 * 60 * 24);

      this.diasHospedaje = diferenciaDias;
      localStorage.setItem('diasHospedaje', JSON.stringify(this.diasHospedaje));
    }
  }
}
