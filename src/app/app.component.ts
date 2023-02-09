import { Component,OnInit,ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'kaddemProject';
  constructor(private dialog:MatDialog, private api :ApiService){}
  displayedColumns: string[] = ['EtudiantNom', 'EtudiantPrenom', 'option','action',];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngOnInit(): void {
   this.getAllEtudiant();
  }
  
  private _opened: boolean = false;

  private _toggleSidebar() {
    this._opened = !this._opened;
  }
  
  openDialog() {
    this.dialog.open(DialogComponent, {
      width:"40%"
    }).afterClosed().subscribe(val=>{
      if(val=='save'){
          this.getAllEtudiant();
      }
    }

    )
  }
  getAllEtudiant(){
    this.api.getEtudiant()
    .subscribe({
      next:(res)=>{
        this.dataSource =new MatTableDataSource(res);
        this.dataSource.paginator=this.paginator;
        this.dataSource.sort=this.sort;
      },
      error:(err)=>{  
        alert("error dsl !")
      }
      
    })
  }
    editEtudiant(row:any){
      this.dialog.open(DialogComponent,{
        width:'30%',
        data :row 
      }).afterClosed().subscribe(val=>{
        if(val=='update'){
          this.getAllEtudiant();
        }
      })}
    

      deleteEtudiant(id:number){
        this.api.deleteEtudiant(id)
        .subscribe({
          next:(res)=>{
            alert("Etudiant supprimer !!");
            this.getAllEtudiant();
          }
        })




      }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  }
