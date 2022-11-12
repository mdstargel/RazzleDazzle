const express = require('express');
const app = express();
app.use(express.json());

const con = require('../../mysql.js');

setUnreserved = (appt_key, customer_id) => {
    con.query("UPDATE Appointment SET Size = Size + 1 WHERE Appt_Key = " +
        appt_key + ";",
        function(err) {
            if (err) throw err;
        })

    // Update Customer_Group table
    // Get CID_ values
    var gid, CID_1, CID_2, CID_3, CID_4;
    con.query("SELECT * FROM Customer_Group " +
        "INNER JOIN Appointment ON GID = Appointment.Appt_GID " +
        " WHERE Appointment.Appt_Key = " + appt_key + ";",
        function(err, result) {
            if (err) throw err;
            gid = result[0].GID;
            CID_1 = result[0].CID_1;
            CID_2 = result[0].CID_2;
            CID_3 = result[0].CID_3;
            CID_4 = result[0].CID_4;
        })

    // Check values
    if (CID_2 == customer_id) {
        con.query("UPDATE Customer_Group SET CID_2 = NULL WHERE GID = " +
            gid + ";",
            function(err) {
                if (err) throw err;
            })
    } else if (CID_3 == customer_id) {
        con.query("UPDATE Customer_Group SET CID_3 = NULL WHERE GID = " +
            gid + ";",
            function(err) {
                if (err) throw err;
            })
    } else if (CID_4 == customer_id) {
        con.query("UPDATE Customer_Group SET CID_4 = NULL WHERE GID = " +
            gid + ";",
            function(err) {
                if (err) throw err;
            })
    } else if (CID_1 == customer_id && CID_2 != NULL && CID_3 != NULL && CID_4 != NULL) {
        con.query("UPDATE Customer_Group SET CID_1 = CID_4 WHERE GID = " +
            gid + ";",
            function(err) {
                if (err) throw err;
            })
        con.query("UPDATE Customer_Group SET CID_4 = NULL WHERE GID = " +
            gid + ";",
            function(err) {
                if (err) throw err;
            })
    } else if (CID_1 == customer_id && CID_2 != NULL && CID_3 != NULL) {
        con.query("UPDATE Customer_Group SET CID_1 = CID_3 WHERE GID = " +
            gid + ";",
            function(err) {
                if (err) throw err;
            })
        con.query("UPDATE Customer_Group SET CID_3 = NULL WHERE GID = " +
            gid + ";",
            function(err) {
                if (err) throw err;
            })
    } else if (CID_1 == customer_id && CID_2 != NULL) {
        con.query("UPDATE Customer_Group SET CID_1 = CID_2 WHERE GID = " +
            gid + ";",
            function(err) {
                if (err) throw err;
            })
        con.query("UPDATE Customer_Group SET CID_2 = NULL WHERE GID = " +
            gid + ";",
            function(err) {
                if (err) throw err;
            })
    } else {
        con.query("UPDATE Appointment SET Appt_GID = NULL WHERE Appt_Key = " +
            appt_key + ";",
            function(err) {
                if (err) throw err;
            })
        con.query("DELETE FROM Customer_Group WHERE GID = " + gid + ";",
            function(err) {
                if (err) throw err;
            })
    }
}

delete_mini_customer = (customer_id) => {
    // Get today's date
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    var curr_date = yyyy + '-' + mm + '-' + dd;

    // Populate calendar
    var calendar_appt_keys = [];
    con.query("SELECT Appt_Key FROM Appointment INNER JOIN Customer_Group ON " +
        "Appointment.Appt_GID = Customer_Group.GID " +
        "WHERE Appt_Date > '" + curr_date +
        "AND (Customer_Group.CID_1 = " + customer_id + " " +
        "OR Customer_Group.CID_2 = " + customer_id + " " +
        "OR Customer_Group.CID_3 = " + customer_id + " " +
        "OR Customer_Group.CID_4 = " + customer_id + ");",
        function(err, result) {
            if (err) throw err;
            for (var i = 0; i < result.length; i++) {
                calendar_appt_keys.push(result[i].Appt_Key);
            };
        });

    // Unreserve from all appointments after today
    for (var i = 0; i < calendar.length; i++) {
        if (calendar[i].getDate() > curr_date) {
            setUnreserved(calendar_appt_keys[i], customer_id);
        }
    }
}

app.put('/Admin/Customer/Delete_User', (req, res) => {
    customer_id = req.body.user_id;
    con.query("UPDATE Login SET Decomission = 1 WHERE CID = " +
        customer_id + ";",
        function(err) {
            if (err) throw err;
            delete_mini_customer(customer_id);
        });
})

module.exports = app;