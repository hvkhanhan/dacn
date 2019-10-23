import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { UpdateCategoryComponent } from '../update-category/update-category.component';
import { Category } from 'src/app/shared/models/category.model';
import { CategoryService } from 'src/app/shared/services/category.service';
@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {


  public searchText: string;
  p: number = 1;
  allCategory: Observable<Category[]>;
  categoryid: string;
  categoryname: string;

  item: number = 10;
  options: any[] = [
    { id: 1, value: 'show 5' },
    { id: 2, value: 'show 10' },
    { id: 3, value: 'show 20' },
    { id: 4, value: 'show all' },
  ];
  selected: number = 2;


  constructor(
    private servicecategory: CategoryService,
    private toastr: ToastrService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    console.log();
    this.loadAllCategory();
  }

  loadAllCategory() {
    this.allCategory = this.servicecategory.getAllCategory();
  }

  deleteCategory(categoryid) {
    if (confirm("Are you sure you want to delete this ?")) {
      this.servicecategory.deleteCategoryById(categoryid).subscribe(() => {
        this.toastr.success('Delete is successfully!', 'Notification');
        this.loadAllCategory();
      });
    }
  }

  onCreate() {
    const dialogRef = this.dialog.open(AddCategoryComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadAllCategory();
    });
  }

  onEdit(cate: any[]) {
    UpdateCategoryComponent.detailCategory = cate;
    const dialogRef = this.dialog.open(UpdateCategoryComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadAllCategory();
    });
  }
  selectOption(id: number) {
    if (id == 1) {
      return this.item = 5;
    }
    if (id == 2) {
      this.item = 10;
    }
    if (id == 3) {
      this.item = 20;
    }
    if (id == 4) {
      this.item = 999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999;
    }
  }
}
