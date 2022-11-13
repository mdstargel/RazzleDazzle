/**
 * @param:
 * CID
 * customer_name,
 * customer_address,
 * customer_phone_number,
 * customer_email_address,
 * customer_emergency_name,
 * customer_emergency_phone_number,
 * customer_difficulty,
 * customer_phone_notifications
 */
class customer {
    constructor(
        CID,
        customer_name,
        customer_address,
        customer_phone_number,
        customer_email_address,
        customer_emergency_name,
        customer_emergency_phone_number,
        customer_difficulty,
        customer_phone_notifications
    )

    {
        this.CID = CID;
        this.customer_name = customer_name;
        this.customer_address = customer_address;
        this.customer_phone_number = customer_phone_number;
        this.customer_email_address = customer_email_address;
        this.customer_emergency_name = customer_emergency_name;
        this.customer_emergency_phone_number = customer_emergency_phone_number;
        this.customer_difficulty = customer_difficulty;
        this.customer_phone_notifications = customer_phone_notifications;
    }

    // Getters and Setters
    Get_CID() {
        return this.CID;
    }

    Get_Customer_Name() {
        return this.customer_name;
    }

    Set_Customer_Name(customer_name) {
        this.customer_name = customer_name;
    }

    Get_Customer_Address() {
        return this.customer_address;
    }

    Set_Customer_Address(customer_address) {
        this.customer_address = customer_address;
    }

    Get_Customer_Phone_Number() {
        return this.customer_phone_number;
    }

    Set_Customer_Phone_Number(customer_phone_number) {
        this.customer_phone_number = customer_phone_number;
    }

    Get_Customer_Email_Address() {
        return this.customer_email_address;
    }

    Set_Customer_Email_Address(customer_email_address) {
        this.customer_email_address = customer_email_address;
    }

    Get_Customer_Emergency_Name() {
        return this.customer_emergency_name;
    }

    Set_Customer_Emergency_Name(customer_emergency_name) {
        this.customer_emergency_name = customer_emergency_name;
    }

    Get_Customer_Emergency_Phone_Number() {
        return this.customer_emergency_phone_number;
    }

    Set_Customer_Emergency_Phone_Number(customer_emergency_phone_number) {
        this.customer_emergency_phone_number = customer_emergency_phone_number;
    }

    Get_Customer_Difficulty() {
        return this.customer_difficulty;
    }

    Set_Customer_Difficulty(customer_difficulty) {
        this.customer_difficulty = customer_difficulty;
    }

    Get_Customer_Phone_Notifications() {
        return this.customer_phone_notifications;
    }

    Set_Customer_Phone_Notifications(customer_phone_notifications) {
        this.customer_phone_notifications = customer_phone_notifications;
    }
}

module.exports = customer;