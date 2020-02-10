import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../service/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrManager} from 'ng6-toastr-notifications';
import {MagazineService} from '../../../service/magazine.service';

@Component({
  selector: 'app-analiza-recenzije',
  templateUrl: './analiza-recenzije.component.html',
  styleUrls: ['./analiza-recenzije.component.css']
})
export class AnalizaRecenzijeComponent implements OnInit {

  processInstanceId: any;
  taskId: any;
  form: any;
  pdf: string;
  constructor(private userService: UserService, private route: ActivatedRoute, private toastr: ToastrManager, private router: Router,
              private magazineService: MagazineService) { }

  ngOnInit() {

    this.processInstanceId = this.route.snapshot.paramMap.get('processInstanceId');

    this.userService.getForm('pregled_pdfa', this.processInstanceId).subscribe(ret => {
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
      this.toastr.successToastr('Recenzija izvrsena', 'Recenzija izvrsena');
      this.router.navigate(['home']);
    }, error => {
      this.toastr.warningToastr('Greska', 'Vreme za recenziranje rada je isteklo');
      this.router.navigate(['home']);
    });
  }

}
