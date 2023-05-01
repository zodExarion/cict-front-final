import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AccountFacultyComponent } from './pages/admin/account-faculty/account-faculty.component';
import { AccountAttendanceCheckerComponent } from './pages/admin/account-attendance-checker/account-attendance-checker.component';
import { AttendanceRecordComponent } from './pages/admin/attendance-record/attendance-record.component';
import { FacultyScheduleComponent } from './pages/admin/faculty-schedule/faculty-schedule.component';
import { KeyInventoryComponent } from './pages/admin/key-inventory/key-inventory.component';
import { KeyHistoryComponent } from './pages/admin/key-history/key-history.component';

import { DataTablesModule } from 'angular-datatables';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScheduleAttendanceComponent } from './pages/checker/schedule-attendance/schedule-attendance.component';
import { CheckerKeyInventoryComponent } from './pages/checker/checker-key-inventory/checker-key-inventory.component';
import { LayoutCheckerComponent } from './components/layout-checker/layout-checker.component';
// import { HeaderDropdownComponent } from './pages/checker/header-dropdown/header-dropdown.component';
import { AdminHeaderDropdownComponent } from './pages/admin/admin-header-dropdown/admin-header-dropdown.component';
// import { CheckerHeaderDropdownComponent } from './pages/admin/checker-header-dropdown/checker-header-dropdown.component';
// import { FacultyCheckerHeaderDropdownComponent } from './pages/faculty/faculty-checker-header-dropdown/faculty-checker-header-dropdown.component';
import { CheckerHeaderDropdownComponent } from './pages/checker/checker-header-dropdown/checker-header-dropdown.component';
import { FacultyHeaderDropdownComponent } from './pages/faculty/faculty-header-dropdown/faculty-header-dropdown.component';
import { KeyInventoryBoardComponent } from './pages/faculty/key-inventory-board/key-inventory-board.component';
import { AttendanceSummaryComponent } from './pages/faculty/attendance-summary/attendance-summary.component';
import { SemesterManagementComponent } from './pages/admin/semester-management/semester-management.component';
import { SubjectManagementComponent } from './pages/admin/subject-management/subject-management.component';
import { RoomManagementComponent } from './pages/admin/room-management/room-management.component';
import { SectionManagementComponent } from './pages/admin/section-management/section-management.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    DashboardComponent,
    FooterComponent,
    SidebarComponent,
    LayoutComponent,
    AccountFacultyComponent,
    AccountAttendanceCheckerComponent,
    AttendanceRecordComponent,
    FacultyScheduleComponent,
    KeyInventoryComponent,
    KeyHistoryComponent,
    ScheduleAttendanceComponent,
    CheckerKeyInventoryComponent,
    LayoutCheckerComponent,
    // HeaderDropdownComponent,
    AdminHeaderDropdownComponent,
    // CheckerHeaderDropdownComponent,
    // FacultyCheckerHeaderDropdownComponent,
    CheckerHeaderDropdownComponent,
    FacultyHeaderDropdownComponent,
    KeyInventoryBoardComponent,
    AttendanceSummaryComponent,
    SemesterManagementComponent,
    SubjectManagementComponent,
    RoomManagementComponent,
    SectionManagementComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTablesModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
