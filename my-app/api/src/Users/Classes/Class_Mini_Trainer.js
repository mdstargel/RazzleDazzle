/** 
 * @param:
 * TID,
 * trainer_name
 */
class mini_trainer {
    constructor(
        TID,
        trainer_name)

    {
        this.TID = TID;
        this.trainer_name = trainer_name;
    }

    // Getters
    Get_TID() {
        return this.TID;
    }

    Get_Trainer_Name() {
        return this.trainer_name;
    }
}

module.exports = mini_trainer;