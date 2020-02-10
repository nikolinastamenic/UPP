import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../service/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrManager} from 'ng6-toastr-notifications';
import {MagazineService} from '../../../service/magazine.service';
import saveAs from 'file-saver';

@Component({
  selector: 'app-recenzija-rada',
  templateUrl: './recenzija-rada.component.html',
  styleUrls: ['./recenzija-rada.component.css']
})
export class RecenzijaRadaComponent implements OnInit {

  processInstanceId: any;
  taskId: any;
  form: any;
  pdf: string;
  odlukeORadu: any;
  private odluka: any;
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
        } else if (this.form[i]['id'] === 'odluka_o_radu') {
          this.odlukeORadu = Object.entries(this.form[i].type.values).sort((a, b) => b[0].localeCompare(a[0]));

        }
      }
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

  downloadPDF() {
    this.magazineService.getPDF(this.pdf).subscribe(data => {
        const blob = new Blob([data], {type: 'application/pdf;charset=utf-8'});
        saveAs(blob, 'paper.pdf');
      }
    );
  }
}
