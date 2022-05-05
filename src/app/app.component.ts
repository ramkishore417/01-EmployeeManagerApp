import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public employees: Employee[] = [];
  public editEmployee: Employee | undefined | null;
  public deleteEmployee: Employee | undefined | null;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  // Get all Employees
  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (reponse: Employee[]) =>
        {this.employees=reponse},

      (error: HttpErrorResponse) =>
      { alert(error.message) }
    );
  }

  // Add Employee
  public onAddEmployee(addForm: NgForm) : void {   
    document.getElementById('add-employee-form')?.click(); 
    this.employeeService.addEmployee(addForm.value).subscribe(
      (response: Employee) => {
        console.log(response)
        this.getEmployees();
        addForm.reset();
      },
      (error: HttpErrorResponse) =>
      { alert(error.message) }
    );
  }
   
  // Update Emplpoyee
  public onUpdateEmployee(employee: Employee): void {
    document.getElementById('update-employee-form')?.click();
    this.employeeService.updateEmployee(employee).subscribe(
      (response: Employee) =>{
        console.log(response)
        this.getEmployees();
      },

      (error: HttpErrorResponse)=>{alert(error.message)}
    );
  }

   // Delete Emplpoyee
   public onDeleteEmployee(employeeId: number | undefined): void {
    this.employeeService.deleteEmployee(employeeId).subscribe(
      (response: void) =>{
        console.log(response)
        this.getEmployees();
      },

      (error: HttpErrorResponse)=>{alert(error.message)}
    );
  }

  //search Employees
  public searchEmployees(key: string): void{
    const results: Employee[]=[];
    for(const employee of this.employees){
      if(employee.name.toLowerCase().indexOf(key.toLowerCase()) !==-1
      || employee.email.toLowerCase().indexOf(key.toLowerCase()) !==-1
      || employee.phone.toLowerCase().indexOf(key.toLowerCase()) !==-1
      || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !==-1
      ){
        results.push(employee);
      }      
    }
    this.employees=results;
      if(!key){
        this.getEmployees();
      }
  }

  public onOpenModal(employee: Employee | null, mode: string): void
  {
    const container=document.getElementById('main-container');
    const button=document.createElement('button');
    button.type='button';
    button.style.display='none';
    button.setAttribute('data-toggle','modal');

    if(mode ==='add'){
      button.setAttribute('data-target','#addEmployeeModal');
    }

    if(mode ==='edit'){
      this.editEmployee = employee;
      button.setAttribute('data-target','#updateEmployeeModal');
    }

    if(mode ==='delete'){
      this.deleteEmployee=employee;
      button.setAttribute('data-target','#deleteEmployeeModal');
    }
    container?.appendChild(button);
    button.click();
  }
}
