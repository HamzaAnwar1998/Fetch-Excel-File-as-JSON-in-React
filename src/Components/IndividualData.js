import React from 'react'

export const IndividualData = ({individualExcelData}) => {
    return (
        <>
            <th>{individualExcelData.Id}</th>
            <th>{individualExcelData.FirstName}</th>
            <th>{individualExcelData.LastName}</th>
            <th>{individualExcelData.Gender}</th>
            <th>{individualExcelData.Country}</th>
            <th>{individualExcelData.Age}</th>
            <th>{individualExcelData.Date}</th>
        </>
    )
}
