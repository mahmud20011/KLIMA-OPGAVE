const { Client } = require('pg');
const Chart = require('chart.js');


const connectionString = 'postgres://dglwrlos:REdYux4OWKxQIr_6vlAK68CcCdtGmSbT@balarama.db.elephantsql.com/dglwrlos';
const client = new Client({
  connectionString: connectionString
});


client.connect()
  .then(() => {
    console.log('Connected to the database');

    
    const query = 'SELECT * FROM greenhouse_gas_emissions';
    return client.query(query);
  })
  .then(result => {
   
    console.log('Data from the database:');
    console.log(result.rows);

    
    const labels = result.rows.map(row => row.sector);
    const values = result.rows.map(row => row.emissions);

    const ctx = document.getElementById('chart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Emissions',
          data: values,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderWidth: 1,
        }],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

  
    client.end();
  })
  .catch(err => {
    console.error('Error connecting to the database:', err);
  });
