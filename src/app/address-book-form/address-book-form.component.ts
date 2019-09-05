import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Address, DataService } from '../shared/data.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

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

  itemDoc: AngularFirestoreDocument<Address>;
  item: Observable<Address>;

  constructor(private formBuilder: FormBuilder, private dataService: DataService, private router: Router, private route: ActivatedRoute,
              private afs: AngularFirestore) {
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
        this.dataService.setTitle('Редактирование адреса');

        if (this.dataService.loadStatus.getValue() === DataService.WITH_KEYS) {
          this.setData(params.id);
        } else {
          const waiting = this.dataService.loadStatus.subscribe((status: string) => {
            if (status === DataService.WITH_KEYS) {
              this.setData(params.id);
              waiting.unsubscribe();
            }
          });
        }
      } else {
        this.dataService.setTitle('Добавление адреса');
      }
    });
  }

  setData(id: number) {
    this.addressId = id;
    this.itemDoc = this.afs.doc<Address>('addresses/' + this.dataService.keys[this.addressId]);
    this.itemDoc.valueChanges().subscribe((res) => {
      this.lat = res.lat;
      this.lng = res.lng;
      this.form.setValue({
        label: res.label,
        info: res.info
      });
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
      this.dataService.updateValue(this.addressId, address);
    } else {
      this.dataService.addItem(address);
    }

    this.setDefaultMapValues();
    this.form.reset();
    this.router.navigate(['/']);
  }

  setDefaultMapValues() {
    this.lat = 55.004795;
    this.lng = 82.930751;
  }

  mapClicked($event: any) {
    this.lat = $event.coords.lat;
    this.lng = $event.coords.lng;
  }
}
