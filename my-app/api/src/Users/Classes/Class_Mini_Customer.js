/** 
 * @param:
 * CID,
 * customer_name
 */
class mini_customer {
    constructor(
        CID,
        customer_name)

    {
        this.CID = CID;
        this.customer_name = customer_name;
    }

    // Getters
    Get_CID() {
        return this.CID;
    }

    Get_Customer_Name() {
        return this.customer_name;
    }
}

module.exports = mini_customer;