let now = new Date()
let firstDayPM  = new Date(now.getFullYear(), now.getMonth() - 1, 1);
let firstMonPM = new Date(firstDayPM.getFullYear(), firstDayPM.getMonth(), 1 + ((8 - firstDayPM.getDay()) % 7)).getDate();
let numDaysPM = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
//console.log ("num days last Month:" + numDaysPM);

let weeks = []
let month = '"Ad Number", "Item Number", "Views", "Clicks"\n';
for (let i = firstMonPM; i <= numDaysPM; i += 7){
    weeks.push('"Ad Number", "Item Number", "Views", "Clicks"\n')
}


let delay = 0;
let datePicker;
let statsBttns = document.querySelectorAll('a[data-bs-target="#sharedStats"]');
for (let i = 0; i < statsBttns.length; i++){ // < statsBttns.length i = 14
    setTimeout(() => {
        //while testing only do srfp
        let adNum = statsBttns[i].parentElement.parentElement.firstElementChild.innerText;
        let itemNum = "";
        
        if (adNum.startsWith("SR") || adNum.startsWith("KW") || adNum.startsWith("FP") || adNum.startsWith("DW")) {
            itemNum = statsBttns[i].parentElement.parentElement.firstElementChild.nextElementSibling.innerText;
        } else if (adNum.startsWith("SR")) {
            itemNum = statsBttns[i].parentElement.parentElement.firstElementChild.nextElementSibling.nextElementSibling.innerText;
        } else if (adNum.startsWith("BA")) {
            itemNum = statsBttns[i].parentElement.parentElement.firstElementChild.nextElementSibling.innerText + " : " + statsBttns[i].parentElement.parentElement.firstElementChild.nextElementSibling.nextElementSibling.innerText;
        } else {
            console.log ("AD ID type not accounted for");
            console.log (statsBttns[i].parentElement);
        }

        
        console.log(adNum + " - " + itemNum);
        console.log (statsBttns[i]);

        statsBttns[i].click();

        setTimeout(() => {
            document.getElementById("RangeName").parentElement.querySelector(".form-control.dateMulti").click();

            setTimeout(() => {
                let datePicker = document.querySelectorAll(".daterangepicker.ltr.show-ranges.show-calendar.opensright");
                datePicker = datePicker[datePicker.length - 1];
                datePicker.querySelector('li[data-range-key="Last Month"]').click();

                setTimeout(() => {
                    let chart = Chart.getChart(document.getElementById("statsAdPerformanceViews")); // Select using the canvas element
                    let views = chart.data.datasets[0].data;
                    chart = Chart.getChart(document.getElementById("statsAdPerformanceEngagement"));
                    let clicks = chart.data.datasets[0].data;
                    month += '"' + adNum + '", "' + itemNum + '", "' + views.reduce((partialSum, a) => partialSum + a, 0) + '", "' + clicks.reduce((partialSum, a) => partialSum + a, 0) + '"\n';
                    document.getElementById("RangeName").parentElement.querySelector(".form-control.dateMulti").click();
                  
                    setTimeout(() => {
                        datePicker = document.querySelectorAll(".daterangepicker.ltr.show-ranges.show-calendar.opensright");
                        datePicker = datePicker[datePicker.length - 1];
                        datePicker.querySelector('li[data-range-key="This Month"]').click();

                        setTimeout(() => {   
                            chart = Chart.getChart(document.getElementById("statsAdPerformanceViews")); // Select using the canvas element
                            views.push(...chart.data.datasets[0].data);
                            chart = Chart.getChart(document.getElementById("statsAdPerformanceEngagement"));
                            clicks.push(...chart.data.datasets[0].data);

                            for (let k = 0; k < weeks.length; k++){
                                let weeklyViews = views.splice(firstMonPM - 1, 7).reduce((partialSum, a) => partialSum + a, 0);
                                let weeklyClicks = clicks.splice(firstMonPM - 1, 7).reduce((partialSum, a) => partialSum + a, 0);
                                weeks[k] += '"' + adNum + '", "' + itemNum + '", "' + weeklyViews + '", "' + weeklyClicks + '"\n';
                            }
                            statsBttns[i].click();
                        }, 1000);
                    }, 1000);
                }, 1000);
            }, 1000);
        }, 1000);
    }, delay);
    
    delay += 6000;
}

setTimeout(() => {
    console.log(weeks);
    console.log(month);

    
    let bb = new Blob([month], { type: 'text/plain' });
    let a = document.createElement('a');
    a.download =  "monthlySageStats-" + (firstDayPM.getMonth() + 1) + "-" + firstDayPM.getFullYear() + ".csv";
    a.href = window.URL.createObjectURL(bb);
    a.click();
    for (let i = 0; i < weeks.length; i++){
        bb = new Blob([weeks[i]], { type: 'text/plain' });
        a.download = "weeklySageStats-" + (firstDayPM.getMonth() + 1) + "-" + (firstMonPM + i*7) + "-" + firstDayPM.getFullYear() + ".csv";
        a.href = window.URL.createObjectURL(bb);
        a.click()
    }
    
}, delay + 6000);