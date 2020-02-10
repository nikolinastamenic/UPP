import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../service/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrManager} from 'ng6-toastr-notifications';
import {MagazineService} from '../../../service/magazine.service';

@Component({
  selector: 'app-unos-informacija-o-radu',
  templateUrl: './unos-informacija-o-radu.component.html',
  styleUrls: ['./unos-informacija-o-radu.component.css']
})
export class UnosInformacijaORaduComponent implements OnInit {

  processInstanceId: any;
  taskId: any;
  form: any;
  editors: any;
  PDF: any;
  constructor(private userService: UserService, private route: ActivatedRoute, private toastr: ToastrManager, private router: Router,
              private magazineService: MagazineService) { }

  ngOnInit() {

    this.processInstanceId = this.route.snapshot.paramMap.get('processInstanceId');

    this.userService.getForm('Unos_informacija_o_radu', this.processInstanceId).subscribe(ret => {
      this.taskId = ret['taskId'];
      this.form = ret['formFields'];
      this.processInstanceId = ret['processInstanceId'];
      this.userService.getUrednici().subscribe(urednici => {
      this.editors = urednici;
      this.editors.push({id: 'nema_urednika', name: 'Nema urednika', lastName: ''});
      });
    });
  }

  potvrda() {
    const formData = [];
    this.magazineService.savePDF(this.PDF).subscribe(filename => {
      for (let i = 0; i < this.form.length; i++) {
        // if (this.form[i]['id'] === 'pdf') {
        //   this.form[i]['value']['value'] = filename;
        // }
        formData.push({fieldId: this.form[i]['id'], fieldValue: this.form[i]['value']['value']});
      }
      this.userService.submitTaskForm(this.processInstanceId, formData).subscribe(ret => {
        this.toastr.successToastr('Obrada', 'Rad poslat na obradu glavnom uredniku');
        this.router.navigate(['obrada-rada-glavni-urednik/'.concat(this.processInstanceId)]);
      });
    });
  }

  onChange(event) {
    this.PDF = event.target.files.item(0);
  }

}
