/**
 * Mysql connection
 */
var mysql = require('mysql2');

var con = mysql.createConnection({
    host: "108.213.201.29",
    user: "root",
    password: "RazzleDazzle1!",
    database: "Horse_Site",
    insecureAuth: true,
    connectTimeout: 30000
});

con.connect(function(err) {
    if (err) throw err;
});

/**
 * Imports
 */
const { nodemailer, transporter, emailAppt, textAppt } = require('./Notifications');
let { customer_appt } = require("./Customer/Appointments/Class_Customer_Appointment");
let { trainer_appt } = require("./Trainer/Appointments/Class_Trainer_Appointment");
let { mini_customer } = require("./Admin/Mini_Customer/Class_Mini_Customer");
let { mini_trainer } = require("./Admin/Mini_Trainer/Class_Mini_Trainer");

/**
 * Customer Class. Class consists of:
 * Customer ID
 * Name
 * Address
 * Phone Number
 * Email Address
 * Emergency Contact Name
 * Emergency Contact Phone Number
 * Phone Notifications (Y/N)
 * Calendar
 */
class customer {
    // Constructor
    constructor(customer_id) {
        // Get key at creation
        this.customer_id = customer_id;

        // Query simple values from Database
        con.query("SELECT Cust_Name, Cust_Address, Cust_Phone_Num, Cust_Email_Addr, Cust_Emer_Name, " +
            "Cust_Emer_Num, Difficulty, Phone_Notif FROM Customer WHERE CID = " +
            this.customer_id + ";",
            function(err, result) {
                if (err) throw err;
                this.cust_name = result[0].Cust_Name;
                this.address = result[0].Cust_Address;
                this.phone = result[0].Cust_Phone_Num;
                this.email = result[0].Cust_Email_Addr;
                this.emer_name = result[0].Cust_Emer_Name;
                this.emer_num = result[0].Cust_Emer_Num;
                this.difficulty = result[0].Difficulty;
                this.phone_notif = result[0].Phone_Notif;
            });

        // Get array of appointments (calendar) starting with reservations
        var calendar = [];
        con.query("SELECT Appt_Key, Appt_Name, Appt_Date, Appt_Time, Appt_Description, Appt_Public_Notes, " +
            "Appt_Size FROM Appointment " +
            "INNER JOIN Customer_Group ON Appointment.Appt_GID = Customer_Group.GID " +
            "WHERE Customer_Group.CID_1 = " + this.customer_id + " " +
            "OR Customer_Group.CID_2 = " + this.customer_id + " " +
            "OR Customer_Group.CID_3 = " + this.customer_id + " " +
            "OR Customer_Group.CID_4 = " + this.customer_id + ";",
            function(err, result) {
                if (err) throw err;
                for (var i = 0; i < result.length; i++) {
                    calendar.push(new customer_appt(result[i].Appt_Key, result[i].Appt_Name,
                        result[i].Appt_Date, result[i].Appt_Time, result[i].Appt_Description,
                        result[i].Appt_Public_Notes, result[i].Appt_Size, true));
                };
            });

        // Current Date String
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        var curr_date = yyyy + '-' + mm + '-' + dd;

        // Add on appointments available for reservation
        con.query("SELECT Appt_Key, Appt_Name, Appt_Date, Appt_Time, Appt_Description, Appt_Public_Notes, " +
            "Appt_Size FROM Appointment " +
            "INNER JOIN Customer_Group ON Appointment.Appt_GID = Customer_Group.GID " +
            "WHERE Customer_Group.CID_1 != " + this.customer_id + " " +
            "AND Customer_Group.CID_2 != " + this.customer_id + " " +
            "AND Customer_Group.CID_3 != " + this.customer_id + " " +
            "AND Customer_Group.CID_4 != " + this.customer_id + " " +
            "AND Appt_Size > 0 " +
            "AND Appt_Date > '" + curr_date + "';",
            function(err, result) {
                if (err) throw err;
                for (var i = 0; i < result.length; i++) {
                    calendar.push(new customer_appt(result[i].Appt_Key, result[i].Appt_Name,
                        result[i].Appt_Date, result[i].Appt_Time, result[i].Appt_Description,
                        result[i].Appt_Public_Notes, result[i].Appt_Size, false));
                };
            });

    }

    // Getters and setters
    getName() {
        return this.cust_name;
    }

    setName(name) {
        this.cust_name = name;
    }

    getAddress() {
        return this.address;
    }

    setAddress(addr) {
        this.address = addr;
    }

    getPhone() {
        return this.phone;
    }

    setPhone(phone_num) {
        this.phone = phone_num;
    }

    getEmail() {
        return this.email;
    }

    setEmail(email_addr) {
        this.email = email_addr;
    }

    getEmerName() {
        return this.emer_name;
    }

    setEmerName(name) {
        this.emer_name = name;
    }

    getEmerPhone() {
        return this.emer_num;
    }

    setEmerPhone(phone_num) {
        this.emer_num = phone_num;
    }

    getNotifications() {
        return this.phone_notif;
    }

    setNotifications(notif) {
        this.phone_notif = notif;

    }

    getCalendar() {
        return this.calendar;
    }

    setCalendar(calendar) {
        this.calendar = calendar;
    }
}

/** 
 * Trainer Class. Class consists of:
 * Int              ID
 * String           Name
 * String           Address
 * String           Phone
 * String           Email
 * String           Emergency Contact
 * String           Emergency Number
 * trainer_appt[]
 */
class trainer {
    // Constructor
    constructor(trainer_id) {
        // Get key at creation
        this.trainer_id = trainer_id;

        // Query simple values from database
        con.query("SELECT Train_Name, Train_Address, Train_Phone_Num, Train_Email_Addr, Train_Emer_Name, " +
            "Train_Emer_Num FROM Trainer WHERE TID = " + this.trainer_id,
            function(err, result) {
                if (err) throw err;
                this.trainer_name = result[0].Train_Name;
                this.address = result[0].Train_Address;
                this.phone = result[0].Train_Phone_Num;
                this.email = result[0].Train_Email_Addr;
                this.emer_name = result[0].Train_Emer_Name;
                this.emer_num = result[0].Train_Emer_Num;
            });

        // Get all appointments where Trainer is assigned
        var assigned_calendar = [];
        con.query("SELECT Appt_Key, Appt_Name, Appt_Date, Appt_Time, Appt_Difficulty, Appt_Description, " +
            "Appt_Public_Notes, Appt_Private_Notes, Appt_Size FROM Appointment " +
            "WHERE Appt_TID_1 = " + this.trainer_id + " " +
            "OR Appt_TID_2 = " + this.trainer_id + ";",
            function(err, result) {
                if (err) throw err;
                for (var i = 0; i < result.length; i++) {
                    assigned_calendar.push(new trainer_appt(result[i].Appt_Key,
                        result[i].Appt_Name, result[i].Appt_Date, result[i].Appt_Time,
                        result[i].Appt_Description, result[i].Appt_Public_Notes,
                        result[i].Appt_Private_Notes));
                };
            });
    }

    // Getters and setters
    getName() {
        return this.trainer_name;
    }

    setName(name) {
        this.trainer_name = name;
    }

    getAddress() {
        return this.address;
    }

    setAddress(address) {
        this.address = address;
    }

    getPhone() {
        return this.phone;
    }

    setPhone(phone) {
        this.phone = phone;
    }

    getEmail() {
        return this.email;
    }

    setEmail(email) {
        this.email = email;
    }

    getEmerName() {
        return this.emer_name;
    }

    setEmerName(name) {
        this.emer_name = name;
    }

    getEmerPhone() {
        return this.emer_num;
    }

    setEmerPhone(phone) {
        this.emer_num = phone;

    }

    getCalendar() {
        return this.assigned_calendar;
    }

    setCalendar(calendar) {
        this.assigned_calendar = calendar;
    }
}

class admin_appt {
    constructor(appt_key, appt_name, appt_date, appt_time, appt_difficulty,
        appt_desc, appt_pub_notes, appt_priv_notes, appt_size,
        appt_TID_1, appt_TID_2, appt_GID, appt_micro_trainers) {
        this.appt_key = appt_key;
        this.appt_name = appt_name;
        this.appt_date = appt_date;
        this.appt_time = appt_time;
        this.appt_difficulty = appt_difficulty;
        this.appt_desc = appt_desc;
        this.appt_pub_notes = appt_pub_notes;
        this.appt_priv_notes = appt_priv_notes;
        this.appt_size = appt_size;
        this.appt_TID_1 = appt_TID_1;
        this.appt_TID_2 = appt_TID_2;
        this.appt_GID = appt_GID;
        this.appt_micro_trainers = appt_micro_trainers;
    }

    // Getters, Updaters and Setters
    getName() {
        return this.appt_name;
    }

    setName(name) {
        this.appt_name = name;
    }

    getDate() {
        return this.appt_date;
    }

    setDate(date) {
        this.appt_date = date;
    }

    getTime() {
        return this.appt_time;
    }

    setTime(time) {
        this.appt_time = time;
    }

    getDifficulty() {
        return this.appt_difficulty;
    }

    setDifficulty(diff) {
        this.appt_difficulty = diff;
    }

    getDescription() {
        return this.appt_desc;
    }

    setDescription(desc) {
        this.appt_desc = desc;
    }

    getPublicNotes() {
        return this.appt_pub_notes;
    }

    setPublicNotes(pub_notes) {
        this.appt_pub_notes = pub_notes;
    }

    getPrivateNotes() {
        return this.appt_priv_notes;
    }

    setPrivateNotes(priv_notes) {
        this.appt_priv_notes = priv_notes;
    }

    getSize() {
        return this.appt_size;
    }

    setSize(size) {
        this.appt_size = size;
    }

    getTID1() {
        return this.appt_TID_1;
    }

    setTID1(tid_1) {
        this.appt_TID_1 = tid_1;
    }

    getTID2() {
        return this.appt_TID_2;
    }


    setTID2(tid_2) {
        this.appt_TID_2 = tid_2;

    }

    getGID() {
        return this.appt_GID;
    }

    setGID(gid) {
        this.appt_GID = gid;
    }

    getMicroTrainers() {
        return this.appt_micro_trainers;
    }

    sendNotifications(title, notification) {
        var emails = getEmails();
        for (var i = 0; i < emails.length; i++) {
            emailAppt(emails[i], title, notification);
        }

        // Send texts
        var phone = getPhoneNumbers();
        for (var i = 0; i < phone.length; i++) {
            textAppt(phone[i], notification);
        }
    }
}

class admin_news {
    constructor(news_key, img_name, title, link, news_description) {
        this.news_key = news_key;
        this.img_name = img_name;
        this.title = title;
        this.link = link;
        this.news_description = news_description;
    }

    getImageName() {
        return this.img_name;
    }

    updateImageName() {
        var imgName;
        con.query("SELECT IMG_Name FROM News WHERE Key = " + this.news_key + ";",
            function(err, result) {
                if (err) throw err;
                imgName = result[0].IMG_Name;
            })
        this.img_name = imgName;
    }

    setImageName(imgName) {
        con.query("UPDATE News SET IMG_Name = '" + imgName + "' WHERE KEY = " +
            this.news_key + ";",
            function(err) {
                if (err) throw err;
            })
        this.img_name = imgName;
    }

    getTitle() {
        return this.title;
    }

    updateTitle() {
        var news_title;
        con.query("SELECT Title FROM News WHERE Key = " + this.news_key + ";",
            function(err, result) {
                if (err) throw err;
                news_title = result[0].Title;
            })
        this.title = news_title;
    }

    setTitle(news_title) {
        con.query("UPDATE News SET Title = '" + news_title + "' WHERE KEY = " +
            this.news_key + ";",
            function(err) {
                if (err) throw err;
            })
        this.title = news_title;
    }

    getLink() {
        return this.link;
    }

    updateLink() {
        var news_link;
        con.query("SELECT Link FROM News WHERE Key = " + this.news_key + ";",
            function(err, result) {
                if (err) throw err;
                news_link = result[0].Link;
            })
        this.link = news_link;
    }

    setLink(news_link) {
        con.query("UPDATE News SET Link = '" + news_link + "' WHERE KEY = " +
            this.news_key + ";",
            function(err) {
                if (err) throw err;
            })
        this.link = news_link;
    }

    getNewsDescription() {
        return this.news_description;
    }

    updateNewsDescription() {
        var description;
        con.query("SELECT News_Description FROM News WHERE Key = " + this.news_key + ";",
            function(err, result) {
                if (err) throw err;
                description = result[0].News_Description;
            })
        this.news_description = description;
    }

    setNewsDescription(description) {
        con.query("UPDATE News SET IMG_Name = '" + description + "' WHERE KEY = " +
            this.news_key + ";",
            function(err) {
                if (err) throw err;
            })
        this.news_description = description;
    }

    delete() {
        con.query("DELETE FROM News WHERE Key = " + this.news_key + ";",
            function(err) {
                if (err) throw err;
            })
    }
}

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

// TODO: Change login? We need a way to return that the user is cust, trainer, or admin
// Add getType to classes? Call user.getType() after generation to get type then load?

login = (email, passwrd) => {
    var CID = null;
    var TID = null;
    var administrator;
    var user;
    con.query("SELECT * FROM Login WHERE Email = '" + email + "' " +
        "AND Log_Password = '" + passwrd + "';",
        function(err, result) {
            if (err) throw err;

            // If login values match
            if (result != NULL) {
                // If Customer
                if (result[0].CID = !NULL) {
                    CID = result[0].CID;
                }

                // If Trainer
                else if (result[0].TID != NULL) {
                    TID = result[0].TID;
                };
            };
        });
    if (CID != null) {
        user = new customer(CID);
    } else {
        con.query("SELECT Admin FROM Trainer WHERE TID = " + TID + ";",
            function(err, result) {
                if (err) throw err;
                administrator = result[0].Admin;
            });
        if (administrator) user = new admin(TID);
        else user = new trainer(TID);
    }

    return user;
}

var user = new customer(1);

con.end();

module.exports = {
    login: login
}