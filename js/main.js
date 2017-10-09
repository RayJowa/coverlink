function populateTable() {
    console.log("table called");
    var table = document.getElementById("breakdown_table");
    var tableBody = document.getElementById("table_body");

    while (tableBody.hasChildNodes()) {
        tableBody.removeChild(tableBody.firstChild)
    }

    var year = [];
    var monthly_premium = document.getElementById("monthly_premium").value;
    var years = document.getElementById("period").value;
    var interest_rate = document.getElementById("interest").value;
    var annual_premium = monthly_premium * 12;
    var open_balance = 0;
    var interest = 0;
    var close_balance = 0;

    for (i = 0; i < years; i++){
        interest = (open_balance + annual_premium) * (interest_rate / 100);
        close_balance = open_balance + annual_premium + interest;
        year[i] = [i+1,
            round(open_balance),
            round(annual_premium),
            round(interest),
            round(close_balance)];
        open_balance = close_balance;
    }


    for (i = 0; i < years; i++){
        var tr = document.createElement('TR');
        for (j = 0; j < year[i].length; j++){
            var td = document.createElement('TD');
            td.appendChild(document.createTextNode(year[i][j]));
            tr.appendChild(td)
        }
        tableBody.appendChild(tr);
    }

    var ind = years - 1;
    var y = year[ind].length -1;
    console.log(y);

    document.getElementById("results").style.display = "block";
    document.getElementById("result_monthly").innerHTML = round(monthly_premium);
    document.getElementById("result_value").innerHTML = year[ind][y]



}

function round(value) {
    var number = Number(Math.round(value+'e'+2)+'e-'+2).toFixed(2);
    return number.toLocaleString("en-US");
}

function showChart() {
    graph_function()
}


