import { Component, OnInit } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection } from '@angular/fire';
import { FormBuilder,FormGroup,Validators} from '@angular/forms';
import {  Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { group } from '@angular/animations';


export interface details{
  
  email:string;
  password:string;
  phone:number;
  age:number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  title = 'CRUD Operation';
   myform: FormGroup;

constructor(private afs:AngularFirestore,private fb:FormBuilder){
   
 
 this.detailcollection=this.afs.collection<details>('details');
 this.details=this.detailcollection.valueChanges();
 
  this.myform=this.fb.group({
    detailno:['',[
      Validators.required
    ]],
    email:['',[
      Validators.email,
      Validators.required
    ]],
  password:['',[
    Validators.required,
   Validators.maxLength(10),
   Validators.minLength(5)
  ]],
  phone:['',[
    Validators.required,
    Validators.maxLength(10),
    Validators.minLength(10)
  ]],
  age:['',[
    Validators.max(50),
    Validators.maxLength(2),
    Validators.min(18),
    Validators.required
  ]],
 
  });
}

private detailcollection:AngularFirestoreCollection<details>;
details:Observable<details[]>;
showl:boolean=true;
showu:boolean=false;
detail:any;

ngOnInit(): void {
 
}

get detailno(){
  return this.myform.get('detailno');
}
get email(){
  return this.myform.get('email');
}  
get password(){
  return this.myform.get('password');
}  
get phone(){
  return this.myform.get('phone');
}  
get age(){
  return this.myform.get('age');
}  
get agree(){
  return this.myform.get('agree');
}

async submitHandler() {
  const formValue = this.myform.value;
try {
    await this.afs.collection('details').add(formValue);
    console.log(formValue);
    this.myform.reset();
  } catch(err) {
    console.error(err)
  }
}



edorddet:any;

shows:boolean=true;

preloadData(Event:any) {
 this.shows=false;
  
  this.showu=true;
  this.edorddet=Event;
  this.afs.collection('details').doc(this.edorddet.id).valueChanges().pipe(
    tap(data => {
      this.myform.patchValue(data)
    })
  )
  .subscribe()
}

async updateData(){
  
  this.shows=false;
  this.showu=false;
  const formValue = this.myform.value;
  try {
    await this.afs.collection('details').doc(this.edorddet.id).update(formValue);
    this.myform.reset();
  } catch(err) {
    console.error(err)
  }
}



}








