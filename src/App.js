import {useState} from 'react'
import * as XLSX from 'xlsx'
import {Data} from './Components/Data'

function App() {  
  
  // onChange
  const [excelFile, setExcelFile]=useState(null);
  const [excelFileError, setExcelFileError]=useState(null);
  // submit
  const [excelData, setExcelData]=useState(null);

  // handle excel file
  const fileType=['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','application/vnd.ms-excel'];
  const handleFile=(e)=>{
    let selectedFile=e.target.files[0];
    if(selectedFile){
      // console.log(selectedFile.type);
      if(selectedFile&&fileType.includes(selectedFile.type)){
        let reader = new FileReader();        
        reader.readAsArrayBuffer(selectedFile);
        reader.onload=(e)=>{
          setExcelFileError(null);
          setExcelFile(e.target.result);
        }
      }
      else{
          setExcelFile(null);
          setExcelFileError('please select only excel file');
      }               
    }
    else{
      console.log('select your file');
    }
  }

  // consoled
  // console.log(excelFile);

  // file submit
  const handleSubmit=(e)=>{
    e.preventDefault();
    if(excelFile!==null){      
      const workbook = XLSX.read(excelFile,{type:'buffer'});
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(data);
    }
    else{
      setExcelData(null);
    }
  }

  // consoled
  // console.log(excelData);

  return (
    <div className="container">

      <div className='form'>
        <form className='form-group' autoComplete="off"
        onSubmit={handleSubmit}>
          <label><h5>Upload Excel file</h5></label>
          <br></br>
          <input type='file' className='form-control'
          onChange={handleFile} required></input>                  
          {excelFileError&&<div className='text-danger'
          style={{marginTop:5+'px'}}>
            {excelFileError}
          </div>}
          <button type='submit' className='btn btn-success'
          style={{marginTop:5+'px'}}>Submit</button>
        </form>
      </div>

      <br></br>
      <hr></hr>
      <h5>View Excel file</h5>
      <div className='viewer'>
        {excelData===null&&<>No file selected</>}
        {excelData!==null&&(
          <>
            <table className='table'>
              <thead>
                <tr>
                  <th scope='col'>ID</th>
                  <th scope='col'>First Name</th>
                  <th scope='col'>Last Name</th>
                  <th scope='col'>Gender</th>
                  <th scope='col'>Age</th>                  
                </tr>
              </thead>
              <tbody>
                <Data excelData={excelData}/>
              </tbody>
            </table>            
          </>
        )}       
      </div>

    </div>
  );
}

export default App;
