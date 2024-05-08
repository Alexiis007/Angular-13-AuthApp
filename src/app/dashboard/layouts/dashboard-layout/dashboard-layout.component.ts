import { Component, inject } from '@angular/core';
import { AuthServiceService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css'
})
export class DashboardLayoutComponent {
  private authService = inject(AuthServiceService);

  get user(){
    return this.authService.currentUser();
  }
  public onLogout():void{
    this.authService.logout()
  }
}
