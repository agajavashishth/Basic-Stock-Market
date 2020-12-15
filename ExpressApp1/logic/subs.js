// subs.js
// ========

////main subs array
//var subBase = new Array();

module.exports = {


    //create new sub, populate subID, push object to subBase array, return subID of object
    newSub: function (subBase) {
        let sub = new Object();
        sub.subID = uuid();
        let len = subBase.length;
        let push = subBase.push(sub);
        if (len < push) {
            console.log("New sub creatd with ID: " + sub.subID);
            return sub.subID;
        }
        else { return 0; }
    },

    //get sub takes subID, loops through subBase array, find element with subID, returns that subObject
    getSub: function (subID, subBase) {
        let status = -1;
        let len = subBase.length;
        for (let count = 0; count < len; count++) {
            if (subBase[count].subID === this.subID) {
                status = 0;
                return count;
            }
        }
        return status;
    },

    //finds sub in subBase array thru subID, then replace contents with supplied subObject properties 
    editSub: function (subObject, subBase) {
        let len = subBase.length;
        let status = -1;
        for (let count = 0; count < len; count++) {
            if (subBase[count].subID === this.subObject.subID) {
                subBase[count] = JSON.parse(JSON.stringify(this.subObject));
                status = 0;
                console.log("Subscription Updated!");
            }
        }
        return status;
    },

    //deletes sub
    deleteSub: function (subID, subBase) {

        let len = subBase.length
        let status = -1;
        for (let count = 0; count < len; count++) {
            if (subBase[count].subID === this.subID) {
                delete subBase[count];
                status = 0;
                console.log("Subscription Deleted!");
            }
        }
        return status;
    },

    test: function () {
        console.log("TEST SUCCESSFULL")
    }

};


console.log("subs.js loaded!");




function uuid() {
    let id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
    console.log("New unique ID created: " + id);
    return id;
};

//uncomment to execute uuid()
//uuid();


//individual sub Object
//var sub = new Object();
