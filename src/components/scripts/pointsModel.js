var item = {
    name: null,
    category: {
    	title : null
    },
    description: null,
    quantity: 0,
    price: 0
};

var activity = {
    id: 0,
    title: null,
    type: null,
    category: {
    	id : 0,
    	title : null
    },
    price: 0
};

var order = {
    accountId: null,
    items: [],
    get total_price () {
    	let price = 0;
    	for (let item of this.items) price += item.price;
    	return price;
    }
};

var work = {
	group : {
	    userId: 1, // if of user in uis system
	    activity: activity,
	    amount: null, // null for permanent
	    total_price: 0
	},
	personal : {
	    activity: activity,
	    amount: null, // null for permanent activity
	    total_price: 0
	}
};

var file = {
    head: null,
    filename: null,
    type: null,
    tempfile: null
};

var application = {
    id: null,
    authorId: null,
    type: null, // personal/group
    personal: {
        work: work.personal
    },
    group: {
        work: [
            //instances of work.group
        ]
    },
    files: [
    	//instances of file
    ],
    commentary: null,
    status: null, // in_process/rejected/approved/rework
    creation_date: null
};

module.exports = {
	application,
	file,
	work,
	order,
	activity,
	item
};
module.exports.application = application;
module.exports.file = file;
module.exports.work = work;
module.exports.order = order;
module.exports.activity = activity;
module.exports.item = item;