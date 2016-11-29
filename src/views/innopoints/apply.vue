<style lang="less" scoped>
	.flex-container {
		display: flex;
		flex-wrap: wrap;
	}

	#heading_activity_category {
		flex-grow: 1;
	}

	#wrap_select_activity_category {
		flex-grow: 1;
	}

	#activity_category {
		display: block;
		width: 100%;
	}
</style>

<template>
	<div card class="card">
		<form id="ip_request">
			<h1>New Application by {{ user.account.username }}</h1>

			<hr>

			<pre v-show="!$loadingRouteData">Loading…</pre>
			
			<div v-show="!!$loadingRouteData" id="wrap_activity_category" class="flex-container">
				<div id="heading_activity_category">
					<label for="activity_category">Category</label>
				</div>
				<div id="wrap_select_activity_category">
					<select id="activity_category" v-model="current.category_id" @change="category_changed">
						<option value="" selected>Select Category</option>
						<option value="">All</option>
						<option v-for="category in categories" value="{{category.id}}">{{ category.title }}</option>
					</select>
				</div>
			</div>

			<hr>

			<div>
				<h2>Participants</h2>
				<!-- <button type="button" @click="current_users_count_inc">+</button> -->
				<!-- <button type="button" @click="current_users_count_dec" 
						v-show="current.users.length > 1">-</button> -->
				<div v-for="i of current.users.length">
					<!-- <p>{{i}} : {{current.users.length}}</p> -->

					<div>
						<span>#</span>
						<span>{{ i + 1 }}</span>
					</div>
					
					<div>
						<label for="username">Username</label>
							<input id="username" data-index="{{ i }}" type="text" placeholder="username" @input="username_changed" value="{{ i ? '' : user.account.username }}">
					</div>
					
					<!-- Check is category is selected: v-show="!categorySelected" -->

						<div>
							<label for="activity">Activity</label>
							<select id="activity" class="activity" v-model="current.users[i].activity_id" @change="activity_changed">
								<option value="" selected>Choose Activity...</option>
								<option v-for="activity in activities" value="{{activity.id}}">{{ activity.title }}</option>
							</select>
						</div>
						
						<div v-show="!showAmount(current.users[i].activity_id)">
							<label>
								Time spent/quantity:
								<input type="number" class="amount" min="1" max="365" value="0" v-model="current.users[i].amount">
							</label>
						</div>

				</div>
				
			</div>

			<hr>

			<div>
				<label>
					Attached files:
					<input block type="file" id="upload" @change="uploaded" id="upload" multiple>
				</label>
			</div> 
			<textarea style="max-width: 100%; min-width: 100%; transition: height 0s" id="comment" placeholder="Comment here..." v-model="current.comment"></textarea>

			<pre v-if="!categorySelected">Select Category!</pre>
			<pre v-if="categorySelected && !activitySelected">Fill in the rest!</pre>
			<button v-if="activitySelected" block type="button" @click="accept" id="accept">accept</button>
		</form>
	</div>
</template>

<script>
	module.exports =  {
		data : function () {
			var user = this.$root.user
			return {
				user : user,
				categories : [],
				activities : [],
				activitySelected : false,
				categorySelected : false,
				current : {
					application : {},
					get isPersonal () { return this.users.length == 1 && this.users[0].user_id == user.account.id && !user.account.isModerator; },
					category_id : 0,
					users : [
						{
							user_id: user.account.id,
							activity_id : '',
							amount : 1
						}
					],
					comment : ''
				},
			}
		},
		methods : {
			current_users_count_inc : function () {
				this.current.users.push({
					user_id: null,
					activity_id : '',
					amount : 1
				});
				this.activity_changed();
			},
			current_users_count_dec : function () {
				this.current.users.pop();
				this.activity_changed();
			},
			username_changed  : function (e) {
				var users = this.current.users;
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
				this.user.innopoints.api.getActivities({
					cat_id: this.current.category_id,
					successCallback: this.setActivities
				});
			},
			activity_changed  : function (e) {
				var counter = 0;
				this.current.users.forEach(function(_user) {
					if (_user.activity_id !== '') counter++;
				});
				this.activitySelected = (counter == this.current.users.length);
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
				this.current.application.type = this.current.isPersonal ? "personal" : "group";
				//TODO - catch bugs and exceptions
				this.current.application.work = [];

				var that = this;

				this.current.users.some(cur_user => {
					var activity_id = that.activities.find(x => x.id == cur_user.activity_id).id,
						amount = parseInt(cur_user.amount) || null;

					that.current.application.work.push({
						activity_id:activity_id,
						amount:amount,
						actor: cur_user.user_id
					});

					if (that.current.isPersonal) return true;
				});

				this.current.application.comment = this.current.comment;
				this.current.application.files = upload.files;
				
				this.user.innopoints.api.user.application.create(
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
				var temp = this.activities.find(x => x.id == id);
				return temp && temp.type != 'permanent';
			}
		},
		route : {
			data  : function (transition) {
		        console.log('calling get for innopoints');
		        var user = this.$router.app.user;
		        this.$router.app.user.account.update(result => {
					user.innopoints.api.getCategories({
						successCallback: result => {
							transition.next({
								categories : result
							});
						}
					});
				});
			}
		}
	}
</script>