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

<template lang="jade">

	.container
		// While loading
		p(v-show='$loadingRouteData') Loading&mldr;
		// When loaded
		.card(v-show='!$loadingRouteData')
			validator(name='IPsAppValid')
				form(novalidate)#ip_request
					.card-block
						h1.card-title New Application
						// <h6 class="card-subtitle text-muted">by {{ user.account.username }}</h6>
					.card-block
						.form-group.row.flex-items-sm-middle.mb-0
							label.form-control-label.col-sm.col-form-label.col-form-label-lg(for='activity_category')
								h4 Category
							.col-sm
								select#activity_category.form-control.form-control-lg(v-model='current.category_id', @change='category_changed')
									option(value='blank', selected='') Choose Category
									option(value='') All
									option(v-for='c in categories', value='{{ c.id }}') {{ c.title }}
					.card-block
						h4.mb-1
							template(v-if='current.users.length > 1') Participants
							template(v-else='') Participant
						ul.list-group
							li.list-group-item.py-1(v-for='u of current.users')
								.clearfix.mb-1(v-show='current.users.length > 1')
									button.close(type='button', aria-label='Close', @click='current_users_remove($index)', v-if='current.users.length > 1')
										span(aria-hidden='true') &times;
									span.text-muted(v-show='current.users.length > 1') {{ $index + 1 }}
								.form-group.row.flex-items-sm-middle(
									v-bind:class="{ 'has-danger': $IPsAppValid.username.errors !== undefined }"
								)
									label.form-control-label.col-sm.col-form-label(for='username_{{ $index }}') Username
										span(v-show='$IPsAppValid.username.dirty')
											span(v-if="$IPsAppValid.username.minlength")  is too short
											span(v-if="$IPsAppValid.username.maxlength")  is too long
									.col-sm
										input(
											class="form-control",
											id="username_{{ $index }}",
											data-index="{{ $index }}",
											type="text",
											placeholder="username",
											@input="username_changed",
											value="{{ $index || user.innopoints.data.isAdmin ? '': user.account.username }}",
											v-validate:username="{ minlength: 1, maxlength: 30 }",
										)
								.form-group.row.flex-items-sm-middle
									label.form-control-label.col-sm.col-form-label(for='activity_{{ $index }}') Activity
									.col-sm
										select(class="form-control", :disabled="!categorySelected || !u.username", id="activity_{{ $index }}", class="activity", v-model="u.activity_id", @change="activity_changed")
											option(value='', selected='') Choose Activity
											option(v-for='a in activities', value='{{ a.id }}') {{ a.title }}
								.form-group.row.flex-items-sm-middle
									label.form-control-label.col-sm.col-form-label(for='amount_{{ $index }}') Hours
									.col-sm
										input.form-control(:disabled='!(!showAmount(u.activity_id) && activitySelected)', id='amount_{{ $index }}', type='number', value='1', min='1', max='1000', v-model='u.amount')
								.form-group.row.flex-items-sm-middle.mb-0
									label.form-control-label.col-sm.col-form-label Innopoints
									.col-sm
										input.form-control(type='number', value='0123456789', readonly='')
						.clearfix.mt-1
							button.btn.btn-success.float-xs-left(type='button', @click='current_users_count_inc') &plus; Add a Participant
							button.btn.btn-danger.float-xs-right(type='button', @click='current_users_count_clear', v-if='current.users.length > 1') &times; Clear
					.card-block
						label(for='upload')
							h4 Files
						.table-responsive
							table.table.table-striped.table-bordered(v-show='current.files.length')
								thead
									tr
										th.text-xs-center #
										th.text-xs-center Name
										th.text-xs-center Type
										th.text-xs-center Size
										th.text-xs-center Remove
								tbody
									tr(v-for='f in current.files')
										th(scope='row') {{ $index + 1 }}
										td {{ f.name }}
										td {{ f.type }}
										td.text-xs-right {{ f.size }} KB
										td.text-xs-center.py-0
											button.close.float-xs-none(type='button', aria-label='Remove File', @click='removeFile($index)')
												span(aria-hidden='true') &times;
						.clearfix
							button.btn.btn-success.float-xs-left(type='button', onclick='upload.click()') &plus; Add Files
							button.btn.btn-danger.float-xs-right(type='button', @click='current.files = []', v-show='current.files.length') &times; Clear
						input#upload(type='file', @change='uploaded', multiple='')
					.card-block
						.form-group.mb-0
							label.form-control-label(for='comment')
								h4 Comment
							textarea#comment.form-control(placeholder='Write a comment', v-model='current.comment', rows='6')
					.card-block
						button#send.btn.btn-primary.btn-lg.btn-block(:disabled='!activitySelected', type='submit', @click='send') Send
						p.mt-1.mb-0.text-xs-center(v-show='!categorySelected') Select Category
						p.mt-1.mb-0.text-xs-center(v-show='categorySelected && !activitySelected') Select Activities

</template>

<script>

	export default {

		data() {
			var user = this.$root.user
			return {
				user,
				categories: [],
				activities: [],
				activitySelected: false,
				categorySelected: false,
				current: {
					application: {},
					get isPersonal() { 
						return this.users.length == 1 && this.users[0].user_id == user.account.id && !user.account.isModerator 
					},
					category_id: 0,
					users: [
						{
							user_id: user.account.id,
							activity_id: '',
							amount: 1
						}
					],
					files: [],
					comment: '',
				},
			}
		},

		methods: {
			
			current_users_count_inc() {
				this.current.users.push({
					user_id: null,
					activity_id: '',
					amount: 1
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
				const users = this.current.users;
				this.user.account.getBio({ 
						username: e.target.value 
					},
					(result) => {
						users[e.target.dataset.index].user_id = result.id;
					},
					(error) => {
						console.log("Incorrect Username");
						// TODO
					}
				)
			},

			validateUsername(e) {
				const users = this.current.users;
				this.user.account.getBio({ 
						username: e.target.value 
					},
					(result) => {
						users[e.target.dataset.index].user_id = result.id;
					},
					(error) => {
						console.log("Incorrect Username");
						// TODO
					}
				)
			},
			
			category_changed(e) {
				this.categorySelected = this.activitySelected = false;
				let self = this
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
				this.current.application.type = this.current.isPersonal ? "personal": "group";
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
			},

			// getAllUsers() {
			// 	if (this.usernames.length > 0) return
			// 	let api = this.$root.user
			// 	api.account.list(result => {
			// 		transition.next({
			// 			usernames: result.map(user => user.username)
			// 		})
			// 	})
			// 	console.log(usernames)
			// }
		},

		route: {
			data(transition) {
		    console.log('Сalling GET for Innopoints');
		    let user = this.$router.app.user;
		    this.$router.app.user.account.update(result => {
					user.innopoints.api.getCategories({
						successCallback: result => {
							transition.next({
								categories: result,
							})
						}
					})
				})
			}
		}
	}
</script>