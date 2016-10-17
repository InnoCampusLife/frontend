<template>
	<form id="ip_request">
		<h2>Request innopoints</h2>

		<hr/>

		<div v-if="user.account.isStudent" style="width: 100%;">
			<div  style="float: left;width: 46%">
				<label for="self">
					<input type="radio" name="request type" id="self" value="personal" v-model="current.type"/>
					Personal
				</label>
			</div>
			<div  style="float: right;width: 46%">
				<label for="group">
					<input type="radio" name="request type" id="group" value="group" v-model="current.type"/>
					Group
				</label>
			</div>
		<br>
		</div>


		<br>

		<pre v-show="$loadingRouteData">Loading...</pre>
		<div v-show="!$loadingRouteData" style="width: 100%;">

			Activivty's category
			<select id="activity_category" style="width: 100%;" v-model="current.category_id" @change="category_changed">
				<option value="blank" selected>Choose Category...</option>
				<option value="">All</option>
				<option v-for="category in categories" value="{{category.id}}">{{ category.title }}</option>
			</select>

		</div>

		<br>

		<div>
			<div v-show="!current.isPersonal">
				<button type="button" @click="current_users_count_inc">+</button>
				<button type="button" @click="current_users_count_dec" v-show="current.users_count > 1">-</button>
				<br>
				<br>
			</div>

			<div v-for="i of current.users_count" :style="!current.isPersonal ? 'border: 1px solid; padding: 8px; margin: 4px;' : ''">
				<legend v-show="!current.isPersonal">
					<input data-index="{{i}}" type="text" placeholder="username" @input="username_changed" value="{{* i ? '' : user.account.username}}">
				</legend>
				<br>
				<div v-show="categorySelected">
					<div style="width: 100%;">
						Activity
						<select class="activity" style="width: 100%;" v-model="current.users[i].activity_id" @change="activity_changed">
							<option value="0" selected>Choose Activity...</option>
							<option v-for="activity in activities" value="{{activity.id}}">{{ activity.title }}</option>
						</select>
					</div>
					<br>
					<div v-show="showAmount(current.users[i].activity_id)" style="width: 100%;">
						<label>
							Time spent/quantity:
							<input block type="number" class="amount" min="1" max="365" value="0" v-model="current.users[i].amount">
						</label>
					</div>

				</div>
			</div>
			<br>
		</div>

		<div style="width: 100%;">
			<label>
				Attached files:
				<input block type="file" id="upload" @change="uploaded" id="upload" multiple>
			</label>
		</div>
		<br/>
		<textarea style="max-width: 100%; min-width: 100%; transition: height 0s" id="comment" placeholder="Comment here..." v-model="current.comment"></textarea>
		<br>

		<pre v-if="!categorySelected">Select Category!</pre>
		<pre v-if="categorySelected && !activitySelected">Select Activity!</pre>
		<button v-if="activitySelected" block type="button" @click="accept" id="accept">accept</button>
	</form>
</template>

<script>
	module.exports =  {
		data  : function () {
			var init_type = this.$router.app.user.account.isStudent ? "personal" : "group";
			console.log(this.$router.app.user.account.isStudent);
			return {
				user : this.$router.app.user,
				categories : [],
				activities : [],
				activitySelected : false,
				categorySelected : false,
				current : {
					application : {},
					type : init_type,
					get isPersonal () { return this.type == "personal"; },
					category_id : 0,
					users_count : 1,
					users : [
						{
							user_id: this.$router.app.user.account.id,
							activity_id : 0,
							amount : 1
						}
					],
					comment : ''
				},
			}
		},
		methods : {
			current_users_count_inc : function () {
				if (!this.current.users[this.current.users_count])
					this.current.users[this.current.users_count] = {
						user_id: '',
						activity_id : 0,
						amount : 0
					};
				this.current.users_count++;
			},
			current_users_count_dec : function () {
				if (this.current.users[this.current.users_count - 1])
					this.current.users[this.current.users_count - 1] = {
						user_id: '',
						activity_id : 0,
						amount : 0
					};
				this.current.users_count--;
			},
			username_changed  : function (e) {
				var users = this.current.users;
				console.log(e.target.dataset.index);
				this.user.account.getBio(
					{ username: e.target.value },
					function(result) {
						users[e.target.dataset.index].user_id = result.id;
					},
					function(error) {
						console.log("wrong username!");
						//TODO
					}
				);
			},
			category_changed  : function (e) {
				this.categorySelected = this.activitySelected = false;

				if (e.target.value != 'blank') {
					if (e.target.value)
						this.user
						.innopoints.api
						.getActivitiesInCategory(this.current.category_id, 0, 1000, this.setActivities);
					else
						this.user
						.innopoints.api
						.getActivities(0, 1000, this.setActivities);
				}
			},
			activity_changed  : function (e) {
				let counter = 0;

				for (let _user of this.current.users)
					counter += _user.activity_id ? 1 : 0;

				this.activitySelected = counter == this.current.users_count;
			},
			setActivities  : function (result) {
				this.activities = result;
				this.categorySelected = true;
			},
			uploaded  : function (e) {
				console.log(e.target.files);
			},
			accept  : function (e) {
				accept.textContent = "accepting...";
				this.current.application.type = this.current.type;

				//TODO - catch bugs and exceptions
				this.current.application.work = [];


				for (let cur_user of this.current.users) {
					let activity_id = this.findById(this.activities, cur_user.activity_id).id,
						amount = parseInt(cur_user.amount) || null;

					this.current.application.work.push({
						activity_id,
						amount,
						actor: cur_user.user_id
					});
				}

				console.log(this.current.application);

				this.current.application.comment = this.current.comment;
				this.current.application.files = upload.files;

				if (this.user.account.isStudent)
					this.user.innopoints.api.user.application.create(
						this.current.application,
						this.acceptSuccess,
						this.error
					);
				else if (this.user.account.isModerator)
					this.user.innopoints.api.admin.application.create(
						this.current.application,
						this.acceptSuccess,
						this.error
					);
			},
			acceptSuccess : function (result) {
				accept.textContent = "accepted ✓";
			},
			error : function (error) {
				alert('Unsuccessful: ' + error);
				accept.textContent = "accept";
			},

			showAmount  : function (id) {
				let temp = this.findById(this.activities, id);
				return temp && temp.type != 'permanent';
			},
			findById : function (array, id) {
				return array.find(x => x.id == id);
			}
		},
		route : {
			data  : function (transition) {
		        console.log('calling get for innopoints');
		        this.$router.app.user.account.update();
				this.$router.app.user.innopoints.api.getCategories(0,10000, //TODO - fix categories amount
					function (result) {
						transition.next({
							categories : result
						});
					}
				);
			}
		}
	}
</script>