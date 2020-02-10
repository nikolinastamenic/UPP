import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../service/user.service';
import {ToastrManager} from 'ng6-toastr-notifications';
import {MagazineService} from '../../../service/magazine.service';

@Component({
  selector: 'app-odabir-recenzenata',
  templateUrl: './odabir-recenzenata.component.html',
  styleUrls: ['./odabir-recenzenata.component.css']
})
export class OdabirRecenzenataComponent implements OnInit {

  processInstanceId: any;
  taskId: any;
  form: any;
  recenzenti: any;
  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router, private toastr: ToastrManager) {}

  ngOnInit() {
    this.processInstanceId = this.route.snapshot.paramMap.get('processInstanceId');

    this.userService.getForm('pregled_pdfa', this.processInstanceId).subscribe(ret => {
      this.taskId = ret['taskId'];
      this.form = ret['formFields'];
      this.processInstanceId = ret['processInstanceId'];

      for(let i = 0; i < this.form.length; i++) {
        if (this.form[i]['type']['name'] === 'enum') {
          // @ts-ignore
          this.recenzenti = Object.entries(this.form[i].type.values).sort((a, b) => b[0].localeCompare(a[0]));

        }
      }
    });
  }

  create() {
    const formData = [];
    let krajUnosa = false;
    for (let i = 0; i < this.form.length; i++) {
      formData.push({fieldId: this.form[i]['id'], fieldValue: this.form[i]['value']['value']});
      if (this.form[i]['id'] === 'kraj_unosa') {
        if (this.form[i]['value']['value'] === true) {
          krajUnosa = true;
        }
      }
    }
    this.userService.submitTaskForm(this.processInstanceId, formData).subscribe(ret => {
      if (krajUnosa) {
        this.router.navigate(['rok-za-recenziranje/'.concat(this.processInstanceId)]);
      } else {
        // reload component
        this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
          this.router.navigate(['odabir-recenzenta'.concat(this.processInstanceId)]);
        });
      }


    });
  }

}
