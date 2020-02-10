import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../service/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrManager} from 'ng6-toastr-notifications';
import {MagazineService} from '../../../service/magazine.service';

@Component({
  selector: 'app-odredjivanje-roka-za-ocenjivanje',
  templateUrl: './odredjivanje-roka-za-ocenjivanje.component.html',
  styleUrls: ['./odredjivanje-roka-za-ocenjivanje.component.css']
})
export class OdredjivanjeRokaZaOcenjivanjeComponent implements OnInit {

  processInstanceId: any;
  taskId: any;
  form: any;
  constructor(private userService: UserService, private route: ActivatedRoute, private toastr: ToastrManager, private router: Router,
              private magazineService: MagazineService) { }

  ngOnInit() {

    this.processInstanceId = this.route.snapshot.paramMap.get('processInstanceId');

    this.userService.getForm('odredjivanje_roka_za_recenziranje', this.processInstanceId).subscribe(ret => {
      this.taskId = ret['taskId'];
      this.form = ret['formFields'];
      this.processInstanceId = ret['processInstanceId'];
    });
  }

  potvrda() {
    const formData = [];
    for (let i = 0; i < this.form.length; i++) {
      formData.push({fieldId: this.form[i]['id'], fieldValue: this.form[i]['value']['value']});
    }
    this.userService.submitTaskForm(this.processInstanceId, formData).subscribe(ret => {
        this.toastr.successToastr('Recenzija', 'Rad poslat na recenziju');
        this.router.navigate(['home']);
    });
  }

}
