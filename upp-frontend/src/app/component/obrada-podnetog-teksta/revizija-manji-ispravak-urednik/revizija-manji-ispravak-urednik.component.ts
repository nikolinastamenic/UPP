import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../service/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrManager} from 'ng6-toastr-notifications';
import {MagazineService} from '../../../service/magazine.service';
import saveAs from 'file-saver';

@Component({
  selector: 'app-revizija-manji-ispravak-urednik',
  templateUrl: './revizija-manji-ispravak-urednik.component.html',
  styleUrls: ['./revizija-manji-ispravak-urednik.component.css']
})
export class RevizijaManjiIspravakUrednikComponent implements OnInit {

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
    const formData = [];
    for (let i = 0; i < this.form.length; i++) {
      formData.push({fieldId: this.form[i]['id'], fieldValue: this.form[i]['value']['value']});
    }
    this.userService.submitTaskForm(this.processInstanceId, formData).subscribe(ret => {
        this.toastr.successToastr('Uspesna revizija', 'Revizija je uspesno izvrsena');
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
