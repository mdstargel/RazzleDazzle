const express = require('express');
const app = express();
app.use(express.json());

let con = require('../../mysql.js');

app.put('/Customer/Calendar/Set_Reserved', (req, res) => {
    var reserve = req.body.reserved;
    var appt_key = req.body.appt_key;
    var customer_id = req.body.customer_id;
    if (reserve) {
        con.query("UPDATE Appointment SET Appt_Size = Appt_Size - 1 WHERE " +
            "Appt_Key = " + appt_key + ";",
            function(err) {
                if (err) throw err;
            });

        // Get GID of appointment reserved
        var appt_gid;
        con.query("SELECT Appt_GID FROM Appointment WHERE Appt_Key = " +
            appt_key + ";",
            function(err, result) {
                if (err) throw err;
                appt_gid = result[0].Appt_GID;
            });

        // If no group exists
        if (appt_gid == null) {
            con.query("INSERT INTO Customer_Group (CID_1) VALUES (" +
                customer_id + ");",
                function(err) {
                    if (err) throw err;
                });
        }

        // If group does exist
        else {
            // Get GID and all CID's
            var gid;
            con.query("SELECT Appt_GID FROM Appointment WHERE Appt_Key = " +
                appt_key + ";",
                function(err, result) {
                    if (err) throw err;
                    gid = result[0].Appt_GID;
                });

            var CID_2, CID_3, CID_4;
            con.query("SELECT CID_2, CID_3, CID_4 FROM Customer_Group WHERE " +
                "GID = " + gid + ";",
                function(err, result) {
                    if (err) throw err;
                    CID_2 = result[0].CID_2;
                    CID_3 = result[0].CID_3;
                    CID_4 = result[0].CID_4;
                })

            // If CID_2 is empty
            if (CID_2 == null) {
                con.query("UPDATE Customer_Group SET CID_2 = " + customer_id +
                    " WHERE GID = " + gid + ";",
                    function(err) {
                        if (err) throw err;
                    })
            }

            // Else if CID_3 is empty
            else if (CID_3 == null) {
                con.query("UPDATE Customer_Group SET CID_3 = " + customer_id +
                    " WHERE GID = " + gid + ";",
                    function(err) {
                        if (err) throw err;
                    })
            }

            // Else if CID_4 is empty
            else if (CID_4 == null) {
                con.query("UPDATE Customer_Group SET CID_4 = " + customer_id +
                    " WHERE GID = " + gid + ";",
                    function(err) {
                        if (err) throw err;
                    })
            }
        }
    }

    // If set reserved to false, reduce available group size (also in DB)
    else if (!reserve) {
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
        } else if (CID_1 == customer_id && CID_2 != NULL && CID_3 != NULL &&
            CID_4 != NULL) {
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
            con.query("UPDATE Appointment SET Appt_GID = NULL WHERE " +
                "Appt_Key = " + appt_key + ";",
                function(err) {
                    if (err) throw err;
                })
            con.query("DELETE FROM Customer_Group WHERE GID = " + gid + ";",
                function(err) {
                    if (err) throw err;
                })
        }
    }
})

module.exports = app;