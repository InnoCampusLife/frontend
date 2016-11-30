<style lang="less" scoped>

	input, select, textarea {
		width: 100%;
	}

</style>

<template>
	<div>
		
		<!-- While loading -->
		<div>
			<p v-show="$loadingRouteData">Loading…</p>
		</div>
		
		<!-- When loaded -->
		<div v-show="!$loadingRouteData" class="card" card>
			<form id="ip_request">

				<h1>New Application</h1>

				<hr>
				
				<div  class="grid grid-middle">
					<div class="col">
						<label for="activity_category">
							<h2>Category</h2>
						</label>
					</div>
					<div class="col">
						<select id="activity_category" v-model="current.category_id" @change="category_changed">
							<option value="" selected>Select Category</option>
							<option value="">All</option>
							<option v-for="c in categories" value="{{ c.id }}">{{ c.title }}</option>
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

						<div class="grid grid-middle">
								<div class="col">
									<span>№</span>
								</div>
								<div class="col">
									<span>{{ i }}</span>
								</div>
							</div>
						
						<div class="grid grid-middle">
							<div class="col">
								<label for="username_{{ i }}">Username</label>
							</div>
							<div class="col">
								<input id="username_{{ i }}" data-index="{{ i }}" type="text" placeholder="username" 
										@input="username_changed" value="{{ i ? '' : user.account.username }}">
							</div>
						</div>
						
						<!-- Check is category is selected: v-show="!categorySelected" -->

							<div class="grid grid-middle">
								<div class="col">
									<label for="activity_{{ i }}">Activity</label>
								</div>
								<div class="col">
									<select id="activity_{{ i }}" class="activity" 
											v-model="current.users[i].activity_id" @change="activity_changed">
										<option value="" selected>Choose Activity</option>
										<option v-for="a in activities" value="{{ a.id }}">{{ a.title }}</option>
									</select>
								</div>
							</div>
							
							<div class="grid grid-middle" v-show="!showAmount(current.users[i].activity_id)">
								<div class="col">
									<label for="amount_{{ i }}">Quantity</label>
								</div>
								<div class="col">
									<input id="amount_{{ i }}" type="number" class="amount" value="1" 
											min="1" max="365" value="0" v-model="current.users[i].amount">
								</div>
							</div>

							<div class="grid grid-middle">
								<div class="col">
									<span>Innopoints</span>
								</div>
								<div class="col">
									<span>9000</span>
								</div>
							</div>

					</div>
					
				</div>

				<hr>

				<div>
					<label for="upload">
						<h2>Files</h2>
					</label>
					<input id="upload" type="file" @change="uploaded" multiple>
				</div> 

				<hr>

				<div>
					<label for="comment">
						<h2>Comment</h2>
					</label>
					<textarea id="comment" placeholder="Comment here..." v-model="current.comment"></textarea>
				</div>

				<hr>

				<pre v-if="!categorySelected">Select Category!</pre>
				<pre v-if="categorySelected && !activitySelected">Fill in the rest!</pre>
				<button v-if="activitySelected" type="button" @click="accept" id="accept">accept</button>
			</form>
		</div>

		<div card class="card">
			<h1>HTML Ipsum Presents</h1>

			<p><strong>Pellentesque habitant morbi tristique</strong> senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. <em>Aenean ultricies mi vitae est.</em> Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, <code>commodo vitae</code>, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. <a href="#">Donec non enim</a> in turpis pulvinar facilisis. Ut felis.</p>

			<h2>Header Level 2</h2>

			<ol>
				<li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
				<li>Aliquam tincidunt mauris eu risus.</li>
			</ol>

			<blockquote><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus magna. Cras in mi at felis aliquet congue. Ut a est eget ligula molestie gravida. Curabitur massa. Donec eleifend, libero at sagittis mollis, tellus est malesuada tellus, at luctus turpis elit sit amet quam. Vivamus pretium ornare est.</p></blockquote>

			<h3>Header Level 3</h3>

			<ul>
				<li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
				<li>Aliquam tincidunt mauris eu risus.</li>
			</ul>

			<pre><code>
			#header h1 a {
				display: block;
				width: 300px;
				height: 80px;
			}
			</code></pre>
		</div>

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