import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../service/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrManager} from 'ng6-toastr-notifications';
import {MagazineService} from '../../../service/magazine.service';
import saveAs from 'file-saver';

@Component({
  selector: 'app-pregled-pdfa',
  templateUrl: './pregled-pdfa.component.html',
  styleUrls: ['./pregled-pdfa.component.css']
})
export class PregledPdfaComponent implements OnInit {

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
      for (let i = 0; i < this.form.length; i++) {
        if (this.form[i]['id'] === 'pdf') {
          this.pdf = this.form[i]['value']['value'];
          const temp = this.pdf.split('\\');
          this.pdf = temp[temp.length - 1];
        }
      }
      this.processInstanceId = ret['processInstanceId'];
    });
  }

  potvrda() {
    let validan;
    const formData = [];
    for (let i = 0; i < this.form.length; i++) {
      formData.push({fieldId: this.form[i]['id'], fieldValue: this.form[i]['value']['value']});
      if (this.form[i]['id'] === 'validnost_rada') {
        if (this.form[i]['value']['value'] === true) {
          validan = true;
        } else {
          validan = false;
        }
      }
    }
    this.userService.submitTaskForm(this.processInstanceId, formData).subscribe(ret => {
      if (validan) {
        this.toastr.successToastr('Odabir recenzenta', 'Rad poslat na odabir recenzenta');
        this.router.navigate(['odabir-recenzenta/'.concat(this.processInstanceId)]);
      } else {
        this.toastr.warningToastr('Ispravak rada', 'Rad je poslat na ispravak');
        this.router.navigate(['ispravak-rada/'.concat(this.processInstanceId)]);
      }
    });
  }

  downloadPDF() {
    this.magazineService.getPDF(this.pdf).subscribe(data => {
        const blob = new Blob([data], {type: 'application/pdf;charset=utf-8'});
        saveAs(blob, 'paper.pdf');
      }
    );
  }

}
