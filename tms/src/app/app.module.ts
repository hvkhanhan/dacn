import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CompareValidatorDirective } from './shared/compare-validator.directive';
import { AlertComponent } from './commons/alert/alert.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { MentorEditProfileComponent } from './edit-profile/mentor-edit-profile/mentor-edit-profile.component';
import { TraineeEditProfileComponent } from './edit-profile/trainee-edit-profile/trainee-edit-profile.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CoursesComponent } from './courses/courses.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MatIconModule } from '@angular/material/icon';
import { WavesModule, TableModule, BreadcrumbModule } from 'angular-bootstrap-md';
import { NotifierModule } from 'angular-notifier';
import { FooterComponent } from './footer/footer.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AddCourseComponent } from './courses/add-course/add-course.component';
import { EditCourseComponent } from './courses/edit-course/edit-course.component';
import { ViewCourseComponent } from './courses/view-course/view-course.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { GrdFilterPipe } from './shared/pipes/grd-filter.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import {
  MatFormFieldModule,
  MatSelectModule
} from '@angular/material';
import { ResetTraineeComponent } from './forget-password/reset-trainee/reset-trainee.component';
import { ResetMentorComponent } from './forget-password/reset-mentor/reset-mentor.component';
import { LayoutModule } from 'angular-admin-lte';    // Loading layout module
import { BoxModule } from 'angular-admin-lte';
import { AdminComponent } from './admin/admin.component';
import { CourseAssignedComponent } from './course-assigned/course-assigned.component';
import { CoursesBySkillComponent } from './courses-by-skill/courses-by-skill.component';
import { CourseAcceptComponent } from './courses-by-skill/course-accept/course-accept.component';
import { OrderModule } from 'ngx-order-pipe';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { AssignedTimeComponent } from './course-assigned/assigned-time/assigned-time.component';
import { CourseCateByIdComponent } from './course-cate-by-id/course-cate-by-id.component';
import { ListCoursesComponent } from './courses/list-courses/list-courses.component';
import { CoursesAllComponent } from './courses-all/courses-all.component';
import { ListBySkillComponent } from './courses-by-skill/list-by-skill/list-by-skill.component';
import { AssignedListComponent } from './course-assigned/assigned-list/assigned-list.component';
import { SkillListComponent } from './admin/manage-skill/skill-list/skill-list.component';
import { CategoryListComponent } from './admin/manage-category/category-list/category-list.component';
import { CourseListComponent } from './admin/manage-course/course-list/course-list.component';
import { AddCategoryComponent } from './admin/manage-category/add-category/add-category.component';
import { AddTraineeComponent } from './admin/manage-user/trainees/add-trainee/add-trainee.component';
import { UpdateCategoryComponent } from './admin/manage-category/update-category/update-category.component';
import { UpdateMentorsComponent } from './admin/manage-user/mentors/update-mentors/update-mentors.component';
import { AddMentorsComponent } from './admin/manage-user/mentors/add-mentors/add-mentors.component';
import { AddSkillComponent } from './admin/manage-skill/add-skill/add-skill.component';
import { UpdateSkillComponent } from './admin/manage-skill/update-skill/update-skill.component';
import { UpdateTraineeComponent } from './admin/manage-user/trainees/update-trainee/update-trainee.component';
import { UpdateAssignedComponent } from './admin/manage-assigned/update-assigned/update-assigned.component';
import { UpdateCourseComponent } from './admin/manage-course/update-course/update-course.component';
import { MentorsListComponent } from './admin/manage-user/mentors/mentors-list/mentors-list.component';
import { TrainnesListComponent } from './admin/manage-user/trainees/trainnes-list/trainnes-list.component';
import { AdminAssignedListComponent } from './admin/manage-assigned/assigned-list/assigned-list.component';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { ViewCourseSkillComponent } from './courses/view-course-skill/view-course-skill.component';
@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    CompareValidatorDirective,
    AlertComponent,
    EditProfileComponent,
    MentorEditProfileComponent,
    TraineeEditProfileComponent,
    SignInComponent,
    HomeComponent,
    NavbarComponent,
    CoursesComponent,
    FooterComponent,
    AddCourseComponent,
    EditCourseComponent,
    ViewCourseComponent,
    ForgetPasswordComponent,
    GrdFilterPipe,
    ResetTraineeComponent,
    ResetMentorComponent,
    AdminComponent,
    CourseAssignedComponent,
    CoursesBySkillComponent,
    CourseAcceptComponent,
    BreadcrumbComponent,
    AssignedTimeComponent,
    CourseCateByIdComponent,
    ListCoursesComponent,
    CoursesAllComponent,
    ListBySkillComponent,
    AssignedListComponent,
    SkillListComponent,
    CategoryListComponent,
    CourseListComponent,
    AddCategoryComponent,
    AddTraineeComponent,
    UpdateCategoryComponent,
    UpdateMentorsComponent,
    AddMentorsComponent,
    AddSkillComponent,
    UpdateSkillComponent,
    UpdateAssignedComponent,
    UpdateTraineeComponent,
    UpdateCourseComponent,
    MentorsListComponent,
    TrainnesListComponent,
    AdminAssignedListComponent,
    LoginAdminComponent,
    ViewCourseSkillComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularSvgIconModule,
    MatIconModule,
    WavesModule,
    TableModule,
    NotifierModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSelectModule,
    LayoutModule,
    BoxModule,
    OrderModule,
    NgxPaginationModule,
    MatDialogModule,

    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    AddCategoryComponent,
    UpdateCategoryComponent,
    AddSkillComponent,
    UpdateSkillComponent,
    UpdateAssignedComponent,
    AddTraineeComponent,
    UpdateTraineeComponent,
    AddMentorsComponent,
    UpdateMentorsComponent,
    UpdateCourseComponent,
  ],
})
export class AppModule { }
