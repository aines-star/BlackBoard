var userCountByMonthData = document.getElementById("userCountByMonth");
var ordersAvgByMonth = document.getElementById("ordersAvgByMonth");

var data = JSON.parse(userCountByMonth.dataset.chartviz);
var data2 = JSON.parse(ordersAvgByMonth.dataset.chartviz);

console.log(data2)

var userCountByMonthLabels = []
var userCountByMonthDataResults = []
 for (let i = 0; i < data.length; i++) {
     const element = data[i];
     console.log(element)
     userCountByMonthLabels.push(element._id.month)
     userCountByMonthDataResults.push(element.usercount)
 }

 new Chart(userCountByMonthData, {

    type: 'line',
    data: {
      labels: userCountByMonthLabels,
      datasets: [{
  
        data: userCountByMonthDataResults,
        borderColor: 'pink'
      
      }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    max: 5,
                    stepSize: 1

                }
            }]
        }
    }
  });


  var ordersAvgByMonthzzz = []
var ordersAvgByMonthDataResults = []
 for (let i = 0; i < data2.length; i++) {
     const element = data2[i];
     console.log('=====',element)
     ordersAvgByMonthzzz.push(element._id.month)
     ordersAvgByMonthDataResults.push(element.average_basket)
 }

 new Chart(ordersAvgByMonth, {

    type: 'bar',
    data: {
      labels: ordersAvgByMonthzzz,
      datasets: [{
  
        data: ordersAvgByMonthDataResults,
        borderColor: 'blue',
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'

        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1,
            
      }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
  });