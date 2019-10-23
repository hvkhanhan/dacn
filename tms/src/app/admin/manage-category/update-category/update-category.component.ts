import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute, } from '@angular/router';

import { MatDialogRef } from '@angular/material';
import { CategoryService } from 'src/app/shared/services/category.service';
import { Category } from 'src/app/shared/models/category.model';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {

  formfroupEdit: FormGroup;
  public static detailCategory: any = [];

  constructor(
    private toastr: ToastrService,
    private router: Router ,
    private formbuilder: FormBuilder,
    private categoryservice: CategoryService,
    public activatedRouterService: ActivatedRoute,
    public dialogRef: MatDialogRef<UpdateCategoryComponent>
  ) { }

  ngOnInit() {
    var temp = UpdateCategoryComponent.detailCategory;
    var result = Object.keys(temp).map(e => temp[e]);
    UpdateCategoryComponent.detailCategory = result;
    console.log(UpdateCategoryComponent.detailCategory[1]);

    this.formfroupEdit = this.formbuilder.group({
      categoryid: [null, null],
      categoryname: [null, [Validators.required]],
    });

    this.loadCategoryToEdit();
  }

  loadCategoryToEdit() {
      this.formfroupEdit.controls.categoryid.setValue(UpdateCategoryComponent.detailCategory[0]);
      this.formfroupEdit.controls.categoryname.setValue(UpdateCategoryComponent.detailCategory[1]);
  }

  onSubmit(category: Category){
    console.log(category.categoryid);
    this.categoryservice.updatecategory(category)
        .subscribe( res => {
          this.toastr.success('Update is successfully!','Notification');
          this.router.navigate(['/admin/category-list']);
          this.onClose();
        },(err) =>{
          console.log(err);
   });
  }

  onClose(){
    this.dialogRef.close();
  }

}
