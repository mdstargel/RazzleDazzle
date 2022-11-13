/**
 * @param:
 * TID
 * trainer_name,
 * trainer_address,
 * trainer_phone_number,
 * trainer_email_address,
 * trainer_emergency_name,
 * trainer_emergency_phone_number,
 * trainer_riding_style
 */
class trainer {
    constructor(
        TID,
        trainer_name,
        trainer_address,
        trainer_phone_number,
        trainer_email_address,
        trainer_emergency_name,
        trainer_emergency_phone_number,
        trainer_riding_style
    )

    {
        this.TID = TID;
        this.trainer_name = trainer_name;
        this.trainer_address = trainer_address;
        this.trainer_phone_number = trainer_phone_number;
        this.trainer_email_address = trainer_email_address;
        this.trainer_emergency_name = trainer_emergency_name;
        this.trainer_emergency_phone_number = trainer_emergency_phone_number;
        this.trainer_riding_style = trainer_riding_style;
    }

    // Getters and Setters
    Get_TID() {
        return this.TID;
    }

    Get_Trainer_Name() {
        return this.trainer_name;
    }

    Set_Trainer_Name(trainer_name) {
        this.trainer_name = trainer_name;
    }

    Get_Trainer_Address() {
        return this.trainer_address;
    }

    Set_Trainer_Address(trainer_address) {
        this.trainer_address = trainer_address;
    }

    Get_Trainer_Phone_Number() {
        return this.trainer_phone_number;
    }

    Set_Trainer_Phone_Number(trainer_phone_number) {
        this.trainer_phone_number = trainer_phone_number;
    }

    Get_Trainer_Email_Address() {
        return this.trainer_email_address;
    }

    Set_Trainer_Email_Address(trainer_email_address) {
        this.trainer_email_address = trainer_email_address;
    }

    Get_Trainer_Emergency_Name() {
        return this.trainer_emergency_name;
    }

    Set_Trainer_Emergency_Name(trainer_emergency_name) {
        this.trainer_emergency_name = trainer_emergency_name;
    }

    Get_Trainer_Emergency_Phone_Number() {
        return this.trainer_emergency_phone_number;
    }

    Set_Trainer_Emergency_Phone_Number(trainer_emergency_phone_number) {
        this.trainer_emergency_phone_number = trainer_emergency_phone_number;
    }

    Get_Trainer_Riding_Style() {
        return this.trainer_riding_style;
    }

    Set_Trainer_Riding_Style(trainer_riding_style) {
        this.trainer_riding_style = trainer_riding_style;
    }
}

module.exports = trainer;