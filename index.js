let globalData;

async function fetchData() {
  const response = await fetch('https://SilkyThornyStartup.saifahmed60.repl.co');
  const data = await response.json();
  console.log("yes")
  displayData(data)
}

fetchData()

function displayData(data){
  // const data=fetchData()
  const  jsonData=data
  const countryList = data.map(item => item.Country)
  const countries = countryList.filter((item, index) => countryList.indexOf(item) === index);
  // console.log(countries)

  const select = document.getElementById('countrySelect');
  countries.forEach((item) => {
    const option = document.createElement("option");
    option.textContent = item;
    select.appendChild(option);
    return data 
});
}


async function plot(){
  document.getElementById('container1').innerHTML=""
  document.getElementById('container2').innerHTML=""
  const response = await fetch('https://SilkyThornyStartup.saifahmed60.repl.co');
  const data = await response.json();
  const country=document.getElementById('countrySelect').value 
  console.log(country)
  var filteredData = data.filter(function(item) {
    return item.Country == country})
  // console.log(filteredData)  
  const years=filteredData.map(item=>{
    return item["Year"]
  })
  let Temps=filteredData.map(item=>{
    result = parseFloat(item['AvgTemperature'])
    // console.log(result)
    return result
  })
  Temps=Temps.map(item=>{
    return parseFloat(item.toFixed(2))
  })
  const CO2=filteredData.map(item=>{
    return parseInt(item['Co2 Value'])
  })

  Highcharts.chart('container1', {
    chart: {
      type: 'line' // specify the chart type
    },
    title: {
      text: `CO2 Emission for ${country} over the Years`
    },
    xAxis: {
      categories: years // set the years as x-axis values
    },
    yAxis: {
      title: {
        text: 'CO2 Emmission Value'
      }
    },
    series: [
      {
        name: 'CO2',
        data: CO2 // set the CO2 values as series data
      }
      // {
      //   name: 'Temperature',
      //   data: Temps // set the temperature values as series data
      // }
    ]
  });
  Highcharts.chart('container2', {
    chart: {
      type: 'line' // specify the chart type
    },
    title: {
      text: `Temperature Data for ${country} over the Years`
    },
    xAxis: {
      categories: years // set the years as x-axis values
    },
    yAxis: {
      title: {
        text: 'Temperature in Celcius'
      },
      max: Math.max(...Temps) 
    },
    tooltip: {
      formatter: function () {
        return '<b>' + this.series.name + '</b><br/>' +
          this.x + ': ' + this.y + ' C';
      }
    },
    series: [
      // {
      //   name: 'CO2',
      //   data: CO2 // set the CO2 values as series data
      // },
      {
        name: 'Temperature',
        data: Temps // set the temperature values as series data
      }
    ]
  });    
}
