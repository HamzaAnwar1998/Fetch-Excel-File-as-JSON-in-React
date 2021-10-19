import React from 'react'
import { IndividualData } from './IndividualData'

export const Data = ({excelData}) => {
    return excelData.map((individualExcelData)=>(
        <tr><IndividualData key={individualExcelData.Id} individualExcelData={individualExcelData}/></tr>        
    ))
}
