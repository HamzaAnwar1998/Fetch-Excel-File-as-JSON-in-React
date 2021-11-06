import React, { Component } from 'react'
import {Data} from './Components/Data'
import * as XLSX from 'xlsx'

export class AppClass extends Component {

    state={
        // on change states
        excelFile: null,
        excelFileError: null,
        // on submit state
        excelData: null // it will contain the array of objects
    }
    
    // handle File      
    handleFile = (e)=>{
        const fileType=['application/vnd.ms-excel'];
        let selectedFile = e.target.files[0];
        if(selectedFile){
            // console.log(selectedFile.type);
            if(selectedFile&&fileType.includes(selectedFile.type)){
                let reader = new FileReader();
                reader.readAsArrayBuffer(selectedFile);
                reader.onload=(e)=>{         
                    this.setState({
                        excelFileError: null,
                        excelFile: e.target.result
                    })
                } 
            }
            else{         
                this.setState({
                    excelFileError: 'Please select only excel file types',
                    excelFile: null
                })
            }
        }   
        else{
            console.log('plz select your file');
        }
    }

    // submit function
    handleSubmit=(e)=>{
        e.preventDefault();        
        if(this.state.excelFile!==null){
            const workbook = XLSX.read(this.state.excelFile,{type:'buffer'});
            const worksheetName = workbook.SheetNames[0];
            const worksheet=workbook.Sheets[worksheetName];
            const data = XLSX.utils.sheet_to_json(worksheet);        
            this.setState({
                excelData: data
            })
        }
        else{   
            this.setState({
                excelData: null
            })
        }
    }

    render() { 
        return (
            <div className="container">
            <br></br>
            <h1>Fetch Excel File as JSON and Display in React</h1>
            {/* upload file section */}
            <div className='form'>
              <form className='form-group' autoComplete="off"
              onSubmit={this.handleSubmit}>
                <label><h5>Upload Excel file</h5></label>
                <br></br>
                <input type='file' className='form-control'
                onChange={this.handleFile} required></input>                  
                {this.state.excelFileError&&<div className='text-danger'
                style={{marginTop:5+'px'}}>{this.state.excelFileError}</div>}
                <button type='submit' className='btn btn-success'
                style={{marginTop:5+'px'}}>Submit</button>
              </form>
            </div>
      
            <br></br>
            <hr></hr>
      
            {/* view file section */}
            <h5>View Excel file</h5>
            <div className='viewer'>
              {this.state.excelData===null&&<>No file selected</>}
              {this.state.excelData!==null&&(
                <div className='table-responsive'>
                  <table className='table'>
                    <thead>
                      <tr>
                        <th scope='col'>ID</th>
                        <th scope='col'>First Name</th>
                        <th scope='col'>Last Name</th>
                        <th scope='col'>Gender</th>
                        <th scope='col'>Country</th>
                        <th scope='col'>Age</th>
                        <th scope='col'>Date</th>                  
                      </tr>
                    </thead>
                    <tbody>
                      <Data excelData={this.state.excelData}/>
                    </tbody>
                  </table>            
                </div>
              )}       
            </div>      
          </div>
        )
    }
}

export default AppClass
