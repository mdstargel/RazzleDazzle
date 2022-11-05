let appt = require('./Admin_Appt');
let admin_appt = appt.admin_appt;

let news = require('./Admin_News');
let admin_news = news.admin_news;

let trainer = require('./Mini_Trainer');
let mini_trainer = trainer.mini_trainer;

let customer = require('./Mini_Customer');
let mini_customer = customer.mini_customer;

class admin {
    constructor(admin_id) {
        this.admin_id = admin_id;

        // Get simple values
        con.query("SELECT Train_Name, Train_Address, Train_Phone_Num, Train_Email_Addr, Train_Emer_Name, " +
            "Train_Emer_Num FROM Trainer WHERE TID = " + this.admin_id + ";",
            function(err, result) {
                if (err) throw err;
                this.admin_name = result[0].Train_Name;
                this.address = result[0].Train_Address;
                this.phone = result[0].Train_Phone_Num;
                this.email = result[0].Train_Email_Addr;
                this.emer_name = result[0].Train_Emer_Name;
                this.emer_num = result[0].Train_Emer_Num;
            });

        // Get Mini-Customer List
        var customers = [];
        con.query("SELECT * FROM Customer;",
            function(err, result) {
                if (err) throw err;
                for (var i = 0; i < result.length; i++) {
                    customers.push(new mini_customer(result[i].CID, result[i].Cust_Name,
                        result[i].Cust_Address, result[i].Cust_Phone_Num,
                        result[i].Cust_Email_Addr, result[i].Cust_Emer_Name,
                        result[i].Cust_Emer_Num, result[i].Difficulty,
                        result[i].Phone_Notif));
                };
            });

        // Get Mini-Trainer List
        var trainers = [];
        con.query("SELECT TID, Train_Name, Train_Address, Train_Phone_Num, Train_Email_Addr, " +
            "Train_Emer_Name, Train_Emer_Num, Admin FROM Trainer;",
            function(err, result) {
                if (err) throw err;
                for (var i = 0; i < result.length; i++) {
                    trainers.push(new mini_trainer(result[i].TID, result[i].Train_Name,
                        result[i].Train_Address, result[i].Train_Phone_Num,
                        result[i].Train_Email_Addr, result[i].Train_Emer_Name,
                        result[i].Train_Emer_Num, result[i].Admin));
                };
            });

        // Get All Appointments
        var calendar = [];
        con.query("SELECT * FROM Appointment;", function(err, result) {
            if (err) throw err;
            for (var i = 0; i < result.length; i++) {
                calendar.push(new admin_appt(result[i].Appt_Key, result[i].Appt_Name,
                    result[i].Appt_Date, result[i].Appt_Time, result[i].Appt_Difficulty,
                    result[i].Appt_Description, result[i].Appt_Public_Notes,
                    result[i].Appt_Private_Notes, result[i].Appt_Size, result[i].Appt_TID_1,
                    result[i].Appt_TID_2, result[i].Appt_GID));
            };
        });

        // Get All News
        var admin_news_array = [];
        con.query("SELECT * FROM News;", function(err, result) {
            if (err) throw err;
            for (var i = 0; i < result.length; i++) {
                admin_news_array.push(new admin_news(result[i].Key, result[i].IMG_Name,
                    result[i].Title, result[i].Link, result[i].News_Description));
            }
        })
    }

    // Getters and setters
    getName() {
        return this.trainer_name;
    }

    updateName() {
        var name;
        con.query("SELECT Train_Name FROM Trainer WHERE TID = '" +
            this.trainer_id + "';",
            function(err, result) {
                if (err) throw err;
                name = result[0].Train_Name;
            })
        this.trainer_name = name;
    }

    setName(name) {
        this.admin_name = name;
        con.query("UPDATE Trainer SET Train_Name = '" + name +
            "' WHERE TID = " + this.admin_id + ";",
            function(err) {
                if (err) throw err;
            });
    }

    getAddress() {
        return this.address;
    }

    updateAddress() {
        var address;
        con.query("SELECT Train_Address FROM Trainer WHERE TID = '" +
            this.trainer_id + "';",
            function(err, result) {
                if (err) throw err;
                address = result[0].Train_Address;
            })
        this.address = address;
    }

    setAddress(address) {
        this.address = address;
        con.query("UPDATE Trainer SET Train_Address = '" + address +
            "' WHERE TID = " + this.admin_id + ";",
            function(err) {
                if (err) throw err;
            });
    }

    getPhone() {
        return this.phone;
    }

    updatePhone() {
        var phone;
        con.query("SELECT Train_Phone_Num FROM Trainer WHERE TID = '" +
            this.trainer_id + "';",
            function(err, result) {
                if (err) throw err;
                phone = result[0].Train_Phone_Num;
            })
        this.phone = phone;
    }

    setPhone(phone) {
        this.phone = phone;
        con.query("UPDATE Trainer SET Train_Phone_Number = '" + phone +
            "' WHERE TID = " + this.admin_id + ";",
            function(err) {
                if (err) throw err;
            });
    }

    getEmail() {
        return this.email;
    }

    updateEmail() {
        var email;
        con.query("SELECT Train_Email_Addr FROM Trainer WHERE TID = '" +
            this.trainer_id + "';",
            function(err, result) {
                if (err) throw err;
                email = result[0].Train_Email_Addr;
            })
        this.email = email;
    }

    setEmail(email) {
        this.email = email;
        con.query("UPDATE Trainer SET Train_Email_Addr = '" + email +
            "' WHERE TID = " + this.admin_id + ";",
            function(err) {
                if (err) throw err;
            });
    }

    getEmerName() {
        return this.emer_name;
    }

    updateEmerName() {
        var emerName;
        con.query("SELECT Train_Emer_Name FROM Trainer WHERE TID = '" +
            this.trainer_id + "';",
            function(err, result) {
                if (err) throw err;
                emerName = result[0].Train_Emer_Name;
            })
        this.emer_name = emerName;
    }

    setEmerName(name) {
        this.emer_name = name;
        con.query("UPDATE Trainer SET Train_Emer_Name = '" + name +
            "' WHERE TID = " + this.admin_id + ";",
            function(err) {
                if (err) throw err;
            });
    }

    getEmerPhone() {
        return this.emer_num;
    }

    updateEmerPhone() {
        var emerPhone;
        con.query("SELECT Train_Emer_Num FROM Trainer WHERE TID = '" +
            this.trainer_id + "';",
            function(err, result) {
                if (err) throw err;
                emerPhone = result[0].Train_Emer_Num;
            })
        this.emer_num = emerPhone;
    }

    setEmerPhone(phone) {
        this.emer_num = phone;
        con.query("UPDATE Trainer SET Train_Emer_Num = '" + phone +
            "' WHERE TID = " + this.admin_id + ";",
            function(err) {
                if (err) throw err;
            });
    }

    getCalendar() {
        return this.calendar;
    }

    updateCalendar() {
        this.calendar = [];
        con.query("SELECT * FROM Appointment;", function(err, result) {
            if (err) throw err;
            for (var i = 0; i < result.length; i++) {
                this.calendar.push(new admin_appt(result[i].Appt_Key, result[i].Appt_Name,
                    result[i].Appt_Date, result[i].Appt_Time, result[i].Appt_Difficulty,
                    result[i].Appt_Description, result[i].Appt_Public_Notes,
                    result[i].Appt_Private_Notes, result[i].Appt_Size, result[i].Appt_TID_1,
                    result[i].Appt_TID_2, result[i].Appt_GID));
            };
        });
    }

    createTrainer(tr_name, tr_addr, tr_phone, tr_email, tr_econ, tr_enum) {
        // If any values are empty set null;
        if (tr_addr == '') tr_addr = null;
        if (tr_econ == '') tr_econ = null;
        if (tr_enum == '') tr_enum = null;

        // Insert into Trainer table
        con.query("INSERT INTO Trainer (Train_Name, Train_Address, Train_Phone_Num, Train_Email_Addr, Train_Emer_Name, Train_Emer_Num) VALUES ('" +
            tr_name + "', '" + tr_addr + "', '" + tr_phone + "', " + tr_email + "', '" + tr_econ + "', '" + tr_enum + "');",
            function(err) {
                if (err) throw err;
            })

        // Get TID
        var TID;
        con.query("SELECT TID FROM Trainer WHERE Train_Name = " +
            tr_name + ";",
            function(err, result) {
                if (err) throw err;
                TID = result[0].TID;
            })

        // Update Login
        con.query("INSERT INTO Login (Email, Log_Password, TID) VALUES ('" +
            tr_email + "', 'P@ssw0rd', " + TID + ");",
            function(err) {
                if (err) throw err;
            })

        // Add mini trainer
        trainers.push(new mini_trainer(TID, tr_name, tr_addr, tr_phone, tr_email, tr_econ, tr_enum, false));
    }

    createAppointment(appt_name, appt_date, appt_time, appt_difficulty, appt_desc, appt_pub_notes, appt_priv_notes, appt_size, appt_TID_1, appt_TID_2) {
        4
        // Reconfigure default values
        if (appt_difficulty == '') appt_difficulty = 0;
        if (appt_desc == '') appt_desc = null;
        if (appt_pub_notes == '') appt_pub_notes = null;
        if (appt_priv_notes == '') appt_priv_notes = null;
        if (appt_size == '') appt_size = 1;
        if (appt_TID_1 == '') appt_TID_1 = null;
        if (appt_TID_2 == '') appt_TID_2 = null;

        // Insert appointment
        con.query("INSERT INTO Appointment (Appt_Name, Appt_Date, Appt_Time, Appt_Difficulty, " +
            "Appt_Description, Appt_Public_Notes, Appt_Private_Notes, Appt_Size, Appt_TID_1, Appt_TID_2, Appt_GID) " +
            "VALUES ('" + appt_name + "', '" + appt_date + "', '" + appt_time + "', '" +
            appt_difficulty + "', '" + appt_desc + "', '" + appt_pub_notes + "', '" +
            appt_priv_notes + "', '" + appt_size + "', '" + appt_TID_1 + "', '" +
            appt_TID_2 + "', null);",
            function(err) {
                if (err) throw err;
            })

        // Get appt key
        var appt_key;
        con.query("SELECT Appt_Key FROM Appointment ORDER BY Appt_Key DESC LIMIT 1;", function(err, result) {
            if (err) throw err;
            appt_key = result[0].Appt_Key;
        })

        // Add appointment to calendar
        calendar.push(new admin_appt(appt_key, appt_name, appt_date, appt_time, appt_difficulty,
            appt_desc, appt_pub_notes, appt_priv_notes, appt_size, appt_TID_1, appt_TID_2, null));
    }

    createNews(news_name, news_title, news_link, description) {
        if (description == '') description = null;
        admin_news_array.push(new admin_news(news_name, news_title, news_link, description));

        while (admin_news_array.length > 5) {
            admin_news_array[0].delete();
            admin_news_array = [];
            con.query("SELECT * FROM News;", function(err, result) {
                if (err) throw err;
                for (var i = 0; i < result.length; i++) {
                    admin_news_array.push(new admin_news(result[i].Key, result[i].IMG_Name,
                        result[i].Title, result[i].Link, result[i].News_Description));
                }
            })
        }
    }
}

module.exports = {
    admin: admin
}