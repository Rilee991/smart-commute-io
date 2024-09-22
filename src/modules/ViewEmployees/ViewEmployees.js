import React from 'react';

const ViewEmployees = () => {
  const tableData = [
    { department: 'HR', MS: 10, Google: 10, Intel: 8 },
    { department: 'Tech', MS: 70, Google: 80, Intel: 65 },
    { department: 'Marketing', MS: 10, Google: 5, Intel: 15 },
    { department: 'Operation', MS: 10, Google: 5, Intel: 12 },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f4f4f4', textAlign: 'left' }}>
            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Department</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>MS</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Google</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Intel</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '10px' }}>{row.department}</td>
              <td style={{ padding: '10px' }}>{row.MS}</td>
              <td style={{ padding: '10px' }}>{row.Google}</td>
              <td style={{ padding: '10px' }}>{row.Intel}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewEmployees;
