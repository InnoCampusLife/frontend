<style lang="less" scoped>

	/*
	.card {
		background: hsla(0, 0, 100, 1);
		border-radius: 4px;
		padding: 1rem 2rem;
		text-align: left;
	}

	.card + .card {
		margin-top: 1rem;
	}
	*/

	/* Gotta fix this */
	.card {
		text-align: left;
	}

	#upload {
		display: none;
	}

	td {
		vertical-align: middle;
	}

	td button {
		min-width: 1em;
	}

	input[readonly] {
		color: hsla(0, 0%, 0%, 0.8);
		background: hsl(0, 0%, 100%);
		border-color: hsl(0, 0%, 100%);
	}

</style>

<template>
	<div class="container">
		
		<!-- While loading -->
		<div>
			<p v-show="$loadingRouteData">Loading…</p>
		</div>
		
		<!-- When loaded -->
		<div v-show="!$loadingRouteData" class="card">
			<form id="ip_request">

				<div class="card-block">
					<h1 class="card-title">New Application</h1>
					<!--<h6 class="card-subtitle text-muted">by {{ user.account.username }}</h6>-->
				</div>

				<div class="card-block">
					<div class="form-group row flex-items-sm-middle mb-0">
						<label class="col-sm col-form-label col-form-label-lg" for="activity_category">
							<h4>Category</h4>
						</label>
						<div class="col-sm">
							<select class="form-control form-control-lg" id="activity_category" v-model="current.category_id" @change="category_changed">
								<option value="blank" selected>Choose Category</option>
								<option value="">All</option>
								<option v-for="c in categories" value="{{ c.id }}">{{ c.title }}</option>
							</select>
						</div>
					</div>
				</div>

				<div class="card-block">

					<h4 class="mb-1">
						<template v-if="current.users.length > 1">Participants</template>
						<template v-else>Participant</template>
					</h4>

					<ul class="list-group">
						
						<li class="list-group-item py-1" v-for="u of current.users">

							<div class="clearfix mb-1" v-show="current.users.length > 1">
								<button type="button" class="close" aria-label="Close" @click="current_users_remove($index)" v-if="current.users.length > 1">
									<span aria-hidden="true">&times;</span>
								</button>

								<span class="text-muted" v-show="current.users.length > 1">{{ $index + 1 }}</span>
							</div>
							
							<div class="form-group row flex-items-sm-middle">
								<label class="col-sm col-form-label" for="username_{{ $index }}">Username</label>
								<div class="col-sm">
									<input class="form-control" id="username_{{ $index }}" data-index="{{ $index }}" type="text" placeholder="username" @input="username_changed" value="{{ $index || user.innopoints.data.isAdmin ? '' : user.account.username }}" v-model="u.username">
								</div>
							</div>

							<div class="form-group row flex-items-sm-middle">
								<label class="col-sm col-form-label" for="activity_{{ $index }}">Activity</label>
								<div class="col-sm">
									<select class="form-control" :disabled="!categorySelected || !u.username" id="activity_{{ $index }}" class="activity" v-model="u.activity_id" @change="activity_changed">
										<option value="" selected>Choose Activity</option>
										<option v-for="a in activities" value="{{ a.id }}">{{ a.title }}</option>
									</select>
								</div>
							</div>
							
							<div class="form-group row flex-items-sm-middle">
								<label class="col-sm col-form-label" for="amount_{{ $index }}">Quantity</label>
								<div class="col-sm">
									<input class="form-control" :disabled="!(!showAmount(u.activity_id) && activitySelected)" id="amount_{{ $index }}" type="number" class="amount" value="1" min="1" max="365" v-model="u.amount">
								</div>
							</div>

							<div class="form-group row flex-items-sm-middle mb-0">
								<label class="col-sm col-form-label">Innopoints</label>
									<div class="col-sm">
										<input class="form-control" type="number" value="0123456789" readonly>
									</div>
							</div>

						</li>
					</ul>

					<div class="clearfix mt-1">
						<button type="button" class="btn btn-success float-xs-left" @click="current_users_count_inc">&plus; Add</button>
						<button type="button" class="btn btn-danger float-xs-right" @click="current_users_count_clear" v-if="current.users.length > 1">&times; Clear</button>
					</div>
					
				</div>

				<div class="card-block">
					<label for="upload">
						<h4>Files</h4>
					</label>
					<div class="table-responsive">
						<table class="table  table-striped table-bordered" v-show="current.files.length">
							<thead>
								<tr>
									<th class="text-xs-center">#</th>
									<th class="text-xs-center">Name</th>
									<th class="text-xs-center">Type</th>
									<th class="text-xs-center">Size</th>
									<th class="text-xs-center">Remove</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="f in current.files">
									<th scope="row">{{ $index + 1 }}</td>
									<td>{{ f.name }}</td>
									<td>{{ f.type }}</td>
									<td class="text-xs-right">{{ f.size }} KB</td>
									<td class="text-xs-center py-0">
										<button type="button" class="close float-xs-none" aria-label="Remove File" @click="removeFile($index)">
											<span aria-hidden="true">&times;</span>
										</button>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="clearfix">
						<button type="button" class="btn btn-success float-xs-left" onClick="upload.click()">&plus; Add</button>
						<button type="button" class="btn btn-danger float-xs-right" @click="current.files = []" v-show="current.files.length">&times; Clear</button>
					</div>
					<input id="upload" type="file" @change="uploaded" multiple>
				</div> 

				<div class="card-block">
					<div class="form-group">
						<label for="comment">
							<h4>Comment</h4>
						</label>
						<textarea class="form-control" id="comment" placeholder="Write a comment" v-model="current.comment" rows="4"></textarea>
					</div>
				</div>

				<div class="card-block">
					<button class="btn btn-primary btn-lg btn-block" :disabled="!activitySelected" type="button" @click="send" id="send">Send</button>
					<p class="mt-1 mb-0 text-xs-center" v-show="!categorySelected">Select Category</p>
					<p class="mt-1 mb-0 text-xs-center" v-show="categorySelected && !activitySelected">Select Activities</p>
				</div>

			</form>
		</div>

	</div><!-- template wrap -->
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
					comment : '',
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
						activity_id: activity_id,
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

			showAmount(id) {
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