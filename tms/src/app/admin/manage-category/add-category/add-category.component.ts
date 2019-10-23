import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { Category } from 'src/app/shared/models/category.model';
import { CategoryService } from 'src/app/shared/services/category.service';
@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  category: Category;
  formfroupAdd: FormGroup;
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private formbuilder: FormBuilder,
    private categoryservice: CategoryService,
    public dialogRef: MatDialogRef<AddCategoryComponent>
  ) { }

  ngOnInit() {
    this.formfroupAdd = this.formbuilder.group({
      categoryname: [null, [Validators.required]],
    });
  }

  onSubmit(category: Category) {
    console.log(category);
    this.categoryservice.addcategory(category)
      .subscribe(() => {
        this.toastr.success('Create is successfully!', 'Notification');
        this.router.navigate(['/admin/category-list']);
        this.onClose();
      });
  }

  onClose() {
    this.dialogRef.close();
  }
}
