import { Component, OnInit } from '@angular/core';
import { ColDef, GridSizeChangedEvent } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';



import * as XLSX from 'xlsx'
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  convertedJson!:string;


  fileUpload(event: any){
    console.log(event.target.files);
    const selectedFile = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(selectedFile);
    fileReader.onload = (event) =>{
      console.log(event);
      let binaryData = event.target?.result;
      let workbook = XLSX.read(binaryData,{type: 'binary'});
      workbook.SheetNames.forEach(sheet =>{
        const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
        console.log(data);
        this.convertedJson = JSON.stringify(data, undefined, 4)
      })
      console.log(workbook)

    }
  }
  async uploadJSONToRTDB(convertedJson: any): Promise<void> {
    // reference the node
    const ref = this.db.database.ref('Data/');
    await ref.set(convertedJson);
  }
  gridApiActive: any;
  columnDefs: ColDef[] = [
    
    { field: 'IMSI', sortable: true, filter: true,checkboxSelection: true, width: 90, minWidth: 50, maxWidth: 100,suppressSizeToFit: true },
    { field: 'IMSI__1', sortable: true, filter: true,  width: 90, minWidth: 50, maxWidth: 100,suppressSizeToFit: false },
    { field: 'IMEI', sortable: true, filter: true,   width: 70, minWidth: 50, maxWidth: 100,suppressSizeToFit: false },
    { field: 'CallTypeCode', sortable: true,filter: true,   width: 90, minWidth: 50, maxWidth: 100,suppressSizeToFit: false },
    { field: 'CallType', sortable: true,filter: true,   width: 90, minWidth: 50, maxWidth: 100,suppressSizeToFit: false },
    { field: 'StartDate', sortable: true,filter: true,  width: 90, minWidth: 50, maxWidth: 100,suppressSizeToFit: false },
    { field: 'CallDuration', sortable: true,filter: true,  width: 90, minWidth: 50, maxWidth: 100,suppressSizeToFit: false },
    { field: 'OtherParty', sortable: true, filter: true,   width: 90, minWidth: 50, maxWidth: 100,suppressSizeToFit: false},
    { field: 'LAC', sortable: true,filter: true,   width: 70, minWidth: 50, maxWidth: 100,suppressSizeToFit: false },
    { field: 'CellId', sortable: true,filter: true, width: 70, minWidth: 50, maxWidth: 100,suppressSizeToFit: false },
    { field: 'CellName', sortable: true,filter: true,  width: 90, minWidth: 50, maxWidth: 100,suppressSizeToFit: false },
    { field: 'TeleServiceCode', sortable: true, filter: true,  width: 90, minWidth: 50, maxWidth: 100,suppressSizeToFit: false},
    { field: 'TeleService', sortable: true, filter: true,  width: 90, minWidth: 50, maxWidth: 100,suppressSizeToFit: false},
    { field: 'ThirdParty', sortable: true, filter: true,  width: 90, minWidth: 50, maxWidth: 100,suppressSizeToFit: false},
    { field: 'IMEITAC' ,sortable: true, filter: true,  width: 90, minWidth: 50, maxWidth: 100,suppressSizeToFit: false},
    { field: 'SubscriberId', sortable: true,filter: true,  width: 90, minWidth: 50, maxWidth: 100,suppressSizeToFit: false },
    { field: 'SubscriberType', sortable: true,filter: true,  width: 90, minWidth: 50, maxWidth: 100,suppressSizeToFit: false },
     { field: 'MobileCountryCode' ,sortable: true, filter: true, width: 70, minWidth: 50, maxWidth: 100,suppressSizeToFit: false},
     { field: 'MobileNetworkCode',sortable: true, filter: true, width: 70, minWidth: 50, maxWidth: 100,suppressSizeToFit: false},


];


rowData :any;
    
onGridReady1(params:any){
this.gridApiActive = params.api;
  this.rowData = this.http.get("https://testing-6becd-default-rtdb.firebaseio.com/Data.json");
}


SearchText:any;
onFilterBoxChanged(){
  this.gridApiActive.setQuickFilter(this.SearchText);
}



onGridSizeChanged(params: GridSizeChangedEvent) {
  params.api.sizeColumnsToFit();
}
  constructor( private http: HttpClient,private db: AngularFireDatabase
    ) { }



  
  ngOnInit(): void {
    
    this.rowData = this.http.get("https://testing-6becd-default-rtdb.firebaseio.com/Data.json");
  }
  

}