import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http :HttpClient) {}


    postEtudiant(data : any){
      return this.http.post<any>("http://localhost:3001/etudiantList/",data);
    }

    getEtudiant(){
      return this.http.get<any>("http://localhost:3001/etudiantList/");
    }
   
    putEtudiant(data:any,id:number){
        return this.http.put<any>("http://localhost:3001/etudiantList/"+id,data);
    }

    deleteEtudiant(id:number){
      return this.http.delete<any>("http://localhost:3001/etudiantList/"+id);
    }
    
}
