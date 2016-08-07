<template>
	<form id="ip_request">
		<h2 style="padding: 0">Request innopoints</h2>

		<hr/>

		<div  style="width: 100%;">
			<div  style="float: left;width: 46%">
				<label for="self">
					<input type="radio" name="request type" id="self" value="personal" v-model="current.type" checked/>
					Personal
				</label>
			</div>
			<div  style="float: right;width: 46%">
				<label for="group">
					<input type="radio" name="request type" id="group" value="group" v-model="current.type"/>
					Group
				</label>
			</div>
		</div>


		<br>
		<br>

		<pre v-show="$loadingRouteData">Loading...</pre>
		<div v-show="!$loadingRouteData" style="width: 100%;">

			Activivty's category
			<select id="activity_category" style="width: 100%;" v-model="current.category_id" @change="categoryChanged">
				<option value="blank" selected>Choose Category...</option>
				<option value="">All</option>
				<option v-for="category in categories" value="{{category._id}}">{{ category.title }}</option>
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

			<div v-for="i in (current.isPersonal ? 1 : current.users_count)" :style="!current.isPersonal ? 'border: 1px solid; padding: 8px; margin: 4px;' : ''">
				<legend v-show="!current.isPersonal">
					<input type="text" placeholder="username" v-model="current.users[i].username" required readonly="{{ i == 0 }}">
				</legend>
				<br>
				<div v-show="categorySelected">

					<div style="width: 100%;">
						Activity
						<select class="activity" style="width: 100%;" v-model="current.users[i].activity_id" @change="activityChanged">
							<option value="0" selected>Choose Activity...</option>
							<option v-for="activity in activities" value="{{activity._id}}">{{ activity.title }}</option>
						</select>
					</div>
					<br>
					<div v-show="showAmount(current.users[i].activity_id)" style="width: 100%;">
						<label>
							Time spent/quantity: 
							<input block type="number" class="amount" min="0" max="365" value="0" v-model="current.users[i].amount">
						</label>
					</div>

				</div>
			</div>
			<br>
		</div>

		<div style="width: 100%;">
			<label>
				Attached files: 
				<input block type="file" id="upload" @change="uploaded" v-el:upload multiple>
			</label>
		</div>
		<br/>
		<textarea style="max-width: 100%; min-width: 100%; transition: height 0s" id="comment" placeholder="Comment here..." v-model="current.comment"></textarea>
		<br>

		<pre v-if="!categorySelected">Select Category!</pre>
		<pre v-if="categorySelected && !activitySelected">Select Activity!</pre>
		<button v-if="activitySelected" block type="button" @click="accept" v-el:accept>accept</button>
		<br>
		<button v-if="ableToSend" block type="button" @click="send" v-el:send>send</button>
	</form>
</template>

<script>
	import api from './../../scripts/api.js'
	import user from './../../scripts/user.js'

	export default {
		data () {
			return {
				user : user,
				categories : [],
				activities : [],
				activitySelected : false,
				categorySelected : false,
				ableToSend : false,
				current : {
					application : {},
					type : "personal",
					get isPersonal () { return this.type == "personal"; },
					category_id : 0,
					users_count : 1,
					users : [
						{
							username : user.username,
							activity_id : 0,
							amount : 0
						}
					],
					comment : null
				},
			}
		},
		methods : {
			current_users_count_inc() {
				if (!this.current.users[this.current.users_count])
					this.current.users[this.current.users_count] = {
						username : '',
						activity_id : 0,
						amount : 0
					};
				this.current.users_count++;
			},
			current_users_count_dec() {
				this.current.users_count--;
			},
			categoryChanged (e) {
				this.categorySelected = this.activitySelected = false;

				if (e.target.value != 'blank') {
					if (e.target.value)
						api
						.innopoints
						.getActivitiesInCategory(this.current.category_id, 0, 100, this.setActivities);
					else
						api
						.innopoints
						.getActivities(0, 100, this.setActivities);
				}
			},
			activityChanged (e) {
				let counter = 0;

				for (let _user of this.current.users)
					counter += _user.activity_id ? 1 : 0;

				this.activitySelected = counter == this.current.users_count;
			},
			setActivities (result) {
				this.activities = result;
				this.categorySelected = true;
			},
			uploaded (e) {
				console.log(e.target.files);
			},
			accept (e) {
				this.$els.accept.textContent = "accepting...";
				this.current.application.type = this.current.type;

				//TODO - catch bugs and exceptions

				if (this.current.isPersonal) {
					let	activity = this.findById(this.activities, this.current.users[0].activity_id),
						amount = parseInt(this.current.users[0].amount),
						total_price = activity.type == 'permanent' ? activity.price : amount * activity.price;

					this.current.application.personal = {
						work : {
							activity,
							amount,
							total_price
						}
					};
				} else {
					this.current.application.group = {
						work : []
					};


					for (let cur_user of this.current.users) {
						let activity = this.findById(this.activities, cur_user.activity_id),
							amount = parseInt(cur_user.amount),
							total_price = activity.type == 'permanent' ? activity.price : amount * activity.price;

						this.current.application.group.work.push({
							activity,
							amount,
							total_price
						});
					}
				}

				this.current.application.comment = this.current.comment;
				this.current.application.files = this.$els.upload.files;

				api.innopoints.createApplication(
					this.user.token,
					this.current.application,
					this.acceptSuccess,
					this.acceptError
				);
			},
			acceptSuccess(result) {
				this.$els.accept.textContent = "accepted ✓";
				this.ableToSend = true;
			},
			acceptError(error) {
				alert('Unsuccessful!');
				this.$els.send.textContent = "send";
				this.$els.accept.textContent = "accept";
			},

			send (e) {
				this.$els.send.textContent = "sending...";
				api.innopoints.sendApplication(
					this.current.application._id,
					this.user.token,
					this.sendSuccess,
					this.sendError
				);
			},
			sendSuccess (result) {
				this.$els.send.textContent = "sent ✓";
				
				this.ableToSend = false;
				this.current.application = {};
				this.current.category_id = 0;
				this.current.users_count = 1;
				this.current.users = {
					user_0 : {
						username : user.username,
						activity_id : 0,
						amount : 0
					}
				};
				this.$els.upload.value = '';
			},
			sendError (error) {
				alert('Unsuccessful!');
				this.$els.send.textContent = "send";
				this.$els.accept.textContent = "accept";
			},

			showAmount (id) {
				let temp = this.findById(this.activities, id);
				return temp && temp.type != 'permanent';
			},
			findById (array, id) {
				return array.find(x => x._id == id);
			}
		},
		route : {
			data (transition) {
				api.innopoints.getAccount(
					user.token,
					function (result) {
						api.innopoints.getCategories(0,100,
							function (result) {
								transition.next({
									categories : result
								});
							}
						);
					}, function (error) {
						transition.redirect('/account/innopoints/create');
					}
				);
			}
		}
	}
</script>