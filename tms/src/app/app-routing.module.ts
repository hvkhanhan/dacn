import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MentorEditProfileComponent } from './edit-profile/mentor-edit-profile/mentor-edit-profile.component';
import { TraineeEditProfileComponent } from './edit-profile/trainee-edit-profile/trainee-edit-profile.component';
import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { CoursesComponent } from './courses/courses.component';
import { AddCourseComponent } from './courses/add-course/add-course.component';
import { ViewCourseComponent } from './courses/view-course/view-course.component';
import { EditCourseComponent } from './courses/edit-course/edit-course.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetTraineeComponent } from './forget-password/reset-trainee/reset-trainee.component';
import { ResetMentorComponent } from './forget-password/reset-mentor/reset-mentor.component';
import { AdminComponent } from './admin/admin.component';
import { CourseAssignedComponent } from './course-assigned/course-assigned.component';
import { CoursesBySkillComponent } from './courses-by-skill/courses-by-skill.component';
import { CourseAcceptComponent } from './courses-by-skill/course-accept/course-accept.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { Role } from './shared/models/role.model';
import { CourseCateByIdComponent } from './course-cate-by-id/course-cate-by-id.component';
import { AssignedTimeComponent } from './course-assigned/assigned-time/assigned-time.component';
import { ListCoursesComponent } from './courses/list-courses/list-courses.component';
import { CoursesAllComponent } from './courses-all/courses-all.component';
import { ListBySkillComponent } from './courses-by-skill/list-by-skill/list-by-skill.component';
import { AssignedListComponent } from './course-assigned/assigned-list/assigned-list.component';
import { CourseListComponent } from './admin/manage-course/course-list/course-list.component';
import { SkillListComponent } from './admin/manage-skill/skill-list/skill-list.component';
import { CategoryListComponent } from './admin/manage-category/category-list/category-list.component';
import { MentorsListComponent } from './admin/manage-user/mentors/mentors-list/mentors-list.component';
import { TrainnesListComponent } from './admin/manage-user/trainees/trainnes-list/trainnes-list.component';
import { AdminAssignedListComponent } from './admin/manage-assigned/assigned-list/assigned-list.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { ViewCourseSkillComponent } from './courses/view-course-skill/view-course-skill.component';

//   },
const routes: Routes = [

  // user
  { path: 'sign-up', component: SignUpComponent },
  { path: 'sign-in', component: SignInComponent },

  {
    path: 'home',
    redirectTo: '/'
  },
  {
    path: '',
    component: HomeComponent,
    data: {
      breadcrumb: 'Home'
    },
    children: [
      {
        path: 'cate/:id',
        component: CourseCateByIdComponent,
        data: {
          breadcrumb: 'Category'
        },
        children: [

        ]
      },
      {
        path: 'details/:id',
        component: ViewCourseSkillComponent,
        data: {
          breadcrumb: 'Details'
        },
        children: [
        ]
      },
      {
        path: '',
        component: CoursesAllComponent,
      },
      {
        path: 'courses',
        component: CoursesComponent,
        data: {
          roles: Role.Trainee, breadcrumb: 'Courses'
        },
        children: [
          {
            path: 'add',
            component: AddCourseComponent,
            data: {
              breadcrumb: 'Add '
            }
          },

          {
            path: 'edit/:id',
            component: EditCourseComponent,
            data: {
              breadcrumb: 'Edit'
            }
          },
          {
            path: 'view/:id',
            component: ViewCourseComponent,
            data: {
              breadcrumb: 'Details'
            }
          },
          {
            path: '',
            component: ListCoursesComponent,
            data: {
              breadcrumb: ''
            }
          },
        ]
      },
      // related courses for mentor
      {
        path: 'mentor-courses',
        component: CoursesBySkillComponent,
        canActivate: [AuthGuard],
        data: {
          roles: Role.Mentor,
          breadcrumb: 'Related Course'
        },
        children: [
          {
            path: 'accept/:id',
            component: CourseAcceptComponent,
            canActivate: [AuthGuard],
            data: {
              roles: Role.Mentor,
              breadcrumb: 'Accept Course'
            },
          },

          {
            path: '',
            component: ListBySkillComponent,
            data: {
              breadcrumb: ''
            }
          },
        ]
      },

      // Assign
      {
        path: 'assign',
        component: CourseAssignedComponent,
        canActivate: [AuthGuard],
        data: {
          breadcrumb: 'Assign'
        },
        children: [
          // {
          //   path: 'mentor-courses/accept/:id',
          //   component: CourseAcceptComponent,
          //   canActivate: [AuthGuard],
          //   data: { roles: Role.Mentor },
          // },
          {
            path: 'assigned-time/:id',
            component: AssignedTimeComponent,
            canActivate: [AuthGuard],
            data: {
              breadcrumb: 'Edit'
            },
          },
          {
            path: '',
            component: AssignedListComponent,
            data: {
              breadcrumb: ''
            }
          },
        ]
      },
      {
        path: 'mentor-edit',
        component: MentorEditProfileComponent,
        canActivate: [AuthGuard],
        data: {
          roles: Role.Mentor,
          breadcrumb: 'Edit Profile',
        },
      },
      {
        path: 'trainee-edit',
        component: TraineeEditProfileComponent,
        canActivate: [AuthGuard],
        data: {
          roles: Role.Trainee,
          breadcrumb: 'Edit Profile',
        },
      },
    ]
  },
  {
    path: 'forgot-password',
    component: ForgetPasswordComponent
  },
  {
    path: 'reset-trainee',
    component: ResetTraineeComponent,
  },
  {
    path: 'reset-mentor',
    component: ResetMentorComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],

    children: [
      // mangage trainee
      {
        path: 'user-trainee-list',
        component: TrainnesListComponent
      },
      // manage mentor
      {
        path: 'user-mentor-list',
        component: MentorsListComponent
      },

      // category
      {
        path: 'category-list',
        component: CategoryListComponent,
      },

      // assigned
      {
        path: 'assigned-list',
        component: AdminAssignedListComponent
      },

      // course
      {
        path: 'course-list',
        component: CourseListComponent
      },
      // skill
      {
        path: 'skill-list',
        component: SkillListComponent
      },
    ]
  },
  { path: 'loginadmin', component: LoginAdminComponent },
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
