import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Role } from '../models/role.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentRole = this.authService.rolesValue;

    if (currentRole) {
      // kiểm tra xem tuyến đường có bị hạn chế bởi vai trò không
      if (route.data.roles && route.data.roles.indexOf(currentRole) === -1) {
        // vai trò không được ủy quyền để chuyển hướng đến trang chủ
        this.router.navigate(['/home']);
        return false;
      }
      // authorised so return true
      return true;
    }
    // chưa đăng nhập nên chuyển hướng đến trang đăng nhập bằng url trả về
    this.router.navigate(['/sign-in'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
