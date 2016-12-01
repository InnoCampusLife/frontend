<style lang="less" scoped>

	input, select, textarea {
		width: 100%;
	}

	.card {
		background: hsla(0, 0, 100, 1);
		border-radius: 4px;
		padding: 1rem 2rem;
		text-align: left; /* should not be here */
	}

	.card + .card {
		margin-top: 1rem;
	}

	#upload {
		display: none;
	}

</style>

<template>
	<div>
		
		<!-- While loading -->
		<div>
			<p v-show="$loadingRouteData">Loading…</p>
		</div>
		
		<!-- When loaded -->
		<div v-show="!$loadingRouteData" class="card">
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
							<option value="blank" selected>Choose Category</option>
							<option value="">All</option>
							<option v-for="c in categories" value="{{ c.id }}">{{ c.title }}</option>
						</select>
					</div>
				</div>

				<hr>

				<div>
					<h2>Participants</h2>

					<div v-for="u of current.users">

						<div class="grid grid-middle">
								<div class="col">
									<span>№</span>
								</div>
								<div class="col">
									<span>{{ $index + 1 }}</span>
								</div>
							</div>
						
						<div class="grid grid-middle">
							<div class="col">
								<label for="username_{{ $index }}">Username</label>
							</div>
							<div class="col">
								<input id="username_{{ $index }}" data-index="{{ $index }}" type="text" placeholder="username" @input="username_changed" value="{{ $index || user.innopoints.data.isAdmin ? '' : user.account.username }}" v-model="u.username">
							</div>
						</div>
						
						<!-- Check is category is selected: v-show="!categorySelected" -->

							<div class="grid grid-middle">
								<div class="col">
									<label for="activity_{{ $index }}">Activity</label>
								</div>
								<div class="col">
									<select v-if="categorySelected && u.username.length" id="activity_{{ $index }}" class="activity" v-model="u.activity_id" @change="activity_changed">
										<option value="" selected>Choose Activity</option>
										<option v-for="a in activities" value="{{ a.id }}">{{ a.title }}</option>
									</select>
									<select v-else disabled id="activity_{{ $index }}" class="activity" v-model="u.activity_id" @change="activity_changed">
										<option value="" selected>Choose Activity</option>
										<option v-for="a in activities" value="{{ a.id }}">{{ a.title }}</option>
									</select>
								</div>
							</div>
							
							<div class="grid grid-middle">
								<div class="col">
									<label for="amount_{{ $index }}">Quantity</label>
								</div>
								<div class="col">
									<input v-if="!showAmount(u.activity_id) && activitySelected" id="amount_{{ $index }}" type="number" class="amount" value="1" min="1" max="365" v-model="u.amount">
									<input v-else disabled id="amount_{{ $index }}" type="number" class="amount" value="1" min="1" max="1" v-model="u.amount">
								</div>
							</div>

							<div class="grid grid-middle">
								<div class="col">
									<span>Innopoints</span>
								</div>
								<div class="col">
									<span>0123456789</span>
								</div>
							</div>

							<span class="pe-7s-close" @click="current_users_remove($index)" v-if="current.users.length > 1"></span>

							<hr style="width: 50%; margin: 1rem auto;">

					</div>

					<span class="pe-7s-plus" @click="current_users_count_inc"></span>
					<span class="pe-7s-close-circle" @click="current_users_count_clear" v-if="current.users.length > 1"></span>
					
				</div>

				<hr>

				<div>
					<label for="upload">
						<h2>Files</h2>
					</label>
					<div class="grid" v-for="f in current.files">
						<div class="col">{{ $index + 1 }}</div>
						<div class="col">{{ f.name }}</div>
						<div class="col">{{ f.type }}</div>
						<div class="col">{{ f.size }} KB</div>
						<div class="col">
							<span class="pe-7s-close" @click="removeFile($index)"></span>
						</div>
					</div>
					<span class="pe-7s-plus" onClick="upload.click()"></span>
					<span v-show="current.files.length" class="pe-7s-close-circle" @click="current.files = []"></span>
					<input id="upload" type="file" @change="uploaded" multiple>
				</div> 

				<hr>

				<div>
					<label for="comment">
						<h2>Comment</h2>
					</label>
					<textarea id="comment" placeholder="Write a comment" v-model="current.comment"></textarea>
				</div>

				<hr>

				<pre v-if="!categorySelected">Select Category!</pre>
				<pre v-if="categorySelected && !activitySelected">Fill in the rest!</pre>
				<button v-if="activitySelected" type="button" @click="send" id="send">Send</button>
			</form>
		</div>

		<div class="card">
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
		data() {
			var user = this.$root.user
			return {
				user,
				categories : [],
				activities : [],
				activitySelected : false,
				categorySelected : false,
				current : {
					application : {},
					get isPersonal() { 
						return this.users.length == 1 && this.users[0].user_id == user.account.id && !user.account.isModerator 
					},
					category_id : 0,
					users : [
						{
							user_id: user.account.id,
							activity_id : '',
							amount : 1
						}
					],
					files: [],
					comment : ''
				},
			}
		},
		methods : {
			
			current_users_count_inc() {
				this.current.users.push({
					user_id: null,
					activity_id : '',
					amount : 1
				});
				this.activity_changed();
			},
			
			current_users_count_clear() {
				this.current.users.splice(1, this.current.users.length - 1);
				this.activity_changed();
			},

			current_users_remove(index) {
				this.current.users.splice(index, 1)
				this.activity_changed()
				console.log(this.current.users)
			},
			
			username_changed(e) {
				let users = this.current.users;
				this.user.account.getBio({ 
						username: e.target.value 
					},
					(result) => {
						users[e.target.dataset.index].user_id = result.id;
					},
					(error) => {
						console.log("Incorrect Username");
						//TODO
					}
				)
			},
			
			category_changed(e) {
				this.categorySelected = this.activitySelected = false;
				const self = this
				this.user.innopoints.api.getActivities({
					cat_id: self.current.category_id,
					successCallback: self.setActivities
				})
			},
			
			activity_changed(e) {
				let counter = 0;
				this.current.users.forEach((_user) => {
					if (_user.activity_id !== '') counter++;
				});
				this.activitySelected = (counter == this.current.users.length);
			},
			
			setActivities(result) {
				this.activities = result;
				this.categorySelected = true;
			},
			
			uploaded(e) {
				this.current.files = Object.keys(e.target.files).map(key => e.target.files[key])
			},

			removeFile(index) {
				this.current.files.splice(index, 1)
			},
			
			send(e) {
				send.textContent = "Sending...";
				this.current.application.type = this.current.isPersonal ? "personal" : "group";
				// TODO - catch bugs and exceptions
				this.current.application.work = [];

				var that = this;

				this.current.users.some(cur_user => {
					var activity_id = that.activities.find(x => x.id == cur_user.activity_id).id,
						amount = parseInt(cur_user.amount) || null;

					that.current.application.work.push({
						activity_id:activity_id,
						amount: amount,
						actor: cur_user.user_id
					});

					if (that.current.isPersonal) return true;
				});

				this.current.application.comment = this.current.comment;
				this.current.application.files = this.current.files;
				
				this.user.innopoints.api.user.application.create(
					this.current.application,
					this.sendSuccess,
					this.error
				);
			},

			sendSuccess(result) {
				send.textContent = "Sent";
			},

			error(error) {
				alert('Unsuccessful: ' + error);
				send.textContent = "Failed to Send";
			},

			showAmount  : function (id) {
				var temp = this.activities.find(x => x.id == id);
				return temp && temp.type != 'permanent';
			}
		},

		route : {
			data(transition) {
		    console.log('calling get for innopoints');
		    var user = this.$router.app.user;
		    this.$router.app.user.account.update(result => {
					user.innopoints.api.getCategories({
						successCallback: result => {
							transition.next({
								categories : result,
							})
						}
					})
				})
			}
		}
	}
</script>