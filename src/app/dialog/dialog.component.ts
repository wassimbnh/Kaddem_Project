import { Component,Inject,OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog'
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
etudiantForm !: FormGroup;
actionBtn:string='Enregister'


constructor(private formBuilder: FormBuilder,
   private api :ApiService, 
   @Inject(MAT_DIALOG_DATA) public editData : any ,
    private dialogRef :MatDialogRef<DialogComponent>){}
 
 
 
    ngOnInit() {
    this.etudiantForm=this.formBuilder.group({
      EtudiantNom : ['',Validators.required],
      EtudiantPrenom : ['',Validators.required],
      option : ['',Validators.required],
    }) ;
    if(this.editData){
      this.actionBtn="Update"
        this.etudiantForm.controls['EtudiantNom'].setValue(this.editData.EtudiantNom);
          this.etudiantForm.controls['EtudiantPrenom'].setValue(this.editData.EtudiantPrenom);
            this.etudiantForm.controls['option'].setValue(this.editData.option)
    }
  }
  addEtudiant(){
    if (!this.editData){
    if(this.etudiantForm.valid){
      this.api.postEtudiant(this.etudiantForm.value)
      .subscribe({
        next:(res:any)=>{
          alert("Etudiant ajouté avec succès!!")
          this.etudiantForm.reset();
          this.dialogRef.close('save');
        }
      })
    }
    
    }else{
      this.updateEtudiant()
    }
  }
  updateEtudiant(){
    this.api.putEtudiant(this.etudiantForm.value,this.editData.id)
    .subscribe({
    next :(res:any)=>{
      alert("Etudiant mis a jour !!");
      this.etudiantForm.reset();
      this.dialogRef.close('update');
    },
  })
  }

}
