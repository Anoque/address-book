import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DataService} from '../shared/data.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

export interface MapCoords {
  coords: any;
}

@Component({
  selector: 'app-address-book-form',
  templateUrl: './address-book-form.component.html',
  styleUrls: ['./address-book-form.component.css']
})
export class AddressBookFormComponent implements OnInit {
  @Input() addressId: number;
  form: FormGroup;
  lat: number;
  lng: number;
  zoom: number;

  constructor(private formBuilder: FormBuilder, private dataService: DataService, private router: Router, private route: ActivatedRoute) {
    this.addressId = null;
    this.lat = 55.004795;
    this.lng = 82.930751;
    this.zoom = 15;
  }

  ngOnInit() {
    this.setDefaultMapValues();
    this.form = this.formBuilder.group({
      label: [''],
      info: ['']
    });

    this.route.params.subscribe((params: Params) => {
      if (typeof params.id !== 'undefined') {
        this.addressId = params.id;
        this.lat = this.dataService.addresses[this.addressId].lat;
        this.lng = this.dataService.addresses[this.addressId].lng;
        Object.keys(this.form.controls).forEach(value => {
          // @ts-ignore
          this.form.controls[value].value = this.dataService.addresses[this.addressId][value];
        });
      }
    });
  }

  onSubmit() {
    const address = {
      label: this.form.value.label,
      info: this.form.value.info,
      lat: this.lat,
      lng: this.lng
    };

    if (this.addressId != null) {
      this.dataService.addresses[this.addressId] = address;
    } else {
      this.dataService.addAddress(address);
    }

    this.setDefaultMapValues();
    this.form.reset();
    this.router.navigate(['/']);
  }

  setDefaultMapValues() {
    this.lat = 55.004795;
    this.lng = 82.930751;
  }

  mapClicked($event: MapCoords) {
    this.lat = $event.coords.lat;
    this.lng = $event.coords.lng;
  }

  clickedMarker() {
    // console.log(`clicked the marker: ${this.form.value.label}`);
  }

}
