
// Создаём инстанс приложения

var app = new Marionette.Application();

var token;

app.addRegions({
	mainRegion: "#wrapper",
	headerRegion: "#main_header"
});



LoginFormModel = Backbone.Model.extend({
	// Поля модели, доступные по умолчанию(в т.ч. если в конструктор модели не будут
	//	переданы какие-то из параметров, )
	defaults: {
		
		// Здесь могут быть и любые другие поля если необходимо
	}
});

// Подробнее про модели здесь: http://backbonejs.org/#Model
// ----------------------------------------------------


function formSuccess (result) {
	$('#wrapper').find('.tooltip').removeClass('show');
	$.cookie('usertoken', result.token);

	$('#content').addClass('hidden');
	$('body').addClass('trans');
	$('body').addClass('logged-in');

	setTimeout(function () {
		app.mainRegion.empty();
		app.mainRegion.show(new DashboardView(new DashboardModel()));
		//app.headerRegion.show(new HeaderView(new HeaderModel()));
	}, 200);

}

function callback (user_info) {

	$('#content').removeClass('hidden');

	token = $.cookie('usertoken');


	if (user_info.lastName)
		$('#name').append(user_info.lastName);
	if(user_info.firstName) 
		$('#name').append(' ' + user_info.firstName);
	if(user_info.patronymic)
		$('#name').append(' ' + user_info.patronymic);

	if (user_info.tgId)
		$('#nickname').append(user_info.tgId);
	else
		$("#nickname").append(user_info.username);

	$('#role').append(user_info.role);

	//if (user_info.role == 'student')
		//$('#content').append('<button class="rounded blue btn">Rule your INNOPOINTS</button>');

	if (user_info.role == 'moderator')
		listAccounts(token,
			function (result) {
				var table_header = '<div class="tbl-header"><table cellpadding="0" cellspacing="0" border="0"><thead><tr><th>#</th><th>Username</th><th>Name</th><th>Role</th></tr></thead></table></div>';

				var table_start = '<div class="tbl-content"><table cellpadding="0" cellspacing="0" border="0"><thead>';
				var table_end   = '</thead></table></div>';

				var table = table_header + table_start;

				result.forEach( 
					function(element, index) {
						table = table + '<tr><td>' + index + '</td><td>' + element.username + '</td><td>' + element.firstName + '</td><td><select data="'+element.id+'"><option ' + (element.role == 'ghost' ? 'selected' : '') + ' value="0">ghost</option><option ' + (element.role == 'student' ? 'selected' : '') + ' value="1">student</option></select></td></tr>';
					}
				);

				var table = table + table_end;

				$('#content').append(table);
				
				$('select[data]').change(function () {
					var id = this.getAttribute("data");
					console.log(this.value);
					var role = this.value == '0' ? 'ghost' : 'student';
					updateRole(token, id, role);
					listAccounts(token);
				});
			}
		);

	
	$('.header-two-bars').addClass('show');
}

function formError (error) {
	$('#wrapper').find('.tooltip').attr('title', !error ? "Unknown error" : error);
	$('#wrapper').find('.tooltip').addClass('show');
}


// Вьюшки. Здесь описывается работа с визуальными составляющими, т.е.
//  биндинги к html-коду, подключение реакций на ивенты и так далее

LoginFormView = Marionette.ItemView.extend({
	initialize: function(model) {
		// Это конструктор вьюшки
		// Принимаем инстанс модели, к которой будет привязана вьюшка
		this.model = model;
	},

	// Имя html-шаблона, с которым связывается вьюшка
	getTemplate: function () {
		if (!$.cookie('usertoken'))
			return '#login_form_template';
		else
			return '#dashboard_template';
	},

	// События, на которые будет реагировать вьюшка
	events: {
		'click #login_button': function(e) {
			e.preventDefault();
			e.stopPropagation();
			e.stopImmediatePropagation();
			// Например, при нажатии на кнопку логин
			authorize($('#username').val(),	$('#password').val(), formSuccess, formError);
		},

		'click #reg_button': function(e) {
			e.preventDefault();
			e.stopPropagation();
			e.stopImmediatePropagation();
			// Например, при нажатии на кнопку регистрации
			createAccount($('#username').val(),	$('#password').val(), 
				formSuccess, 
				function (error) {
					formError(error);
					$('.form-edit:has("#username")').addClass('has-error');
				}
			);
		}
	}
});

HeaderModel = Backbone.Model.extend({
	//
});

HeaderView = Marionette.ItemView.extend({
	initialize: function (model) {
		this.model = model;
	},

	template: '#header_template',

	events: {
		'click #logout_button': function () {
			$('.header-two-bars').removeClass('show');
			$('body').removeClass('logged-in');

			$('#content').addClass('hidden');

			setTimeout(function () {
				$.removeCookie('usertoken');

				app.mainRegion.empty();
				app.mainRegion.show(new LoginFormView(new LoginFormModel()));
				app.headerRegion.empty();

				setTimeout(function() {$('body').removeClass('trans');}, 500);

				$('#content').removeClass('hidden');
			}, 500);

		}
	}
});

DashboardModel = Backbone.Model.extend({
	//
});

DashboardView = Marionette.ItemView.extend({
	initialize: function(model) {
		// Это конструктор вьюшки
		// Принимаем инстанс модели, к которой будет привязана вьюшка
		this.model = model;

		token = $.cookie('usertoken');
		if (token) {
			app.headerRegion.show(new HeaderView(new HeaderModel()));
			$('body').addClass('trans');
			$('body').addClass('logged-in');
			getAccount(token, callback);
		}
		else {
			app.mainRegion.empty();
			app.mainRegion.show(new LoginFormView(new LoginFormModel()));
			app.headerRegion.empty();
		}
	},
	// Имя html-шаблона, с которым связывается вьюшка
	template: '#dashboard_template',
	// События, на которые будет реагировать вьюшка
	events: {
		'change select': function () {
			 /* body... */ 
		}
	}
});

// Подробнее про вьюшки здесь: http://marionettejs.com/docs/v2.4.7/marionette.itemview.html
// Про ивенты: http://marionettejs.com/docs/v2.4.7/marionette.view.html#binding-to-view-events
// -------------------------------------------------------------------

// Подготовка приложения к запуску:

app.addInitializer(function(options) {
	// Создаём инстанс модели, который привяжем ко вьюхе
	var loginFormModel = new LoginFormModel();
	// Создаём инстанс вьюхи, который будет отображаться; передаём туда модель
	var loginFormView = new LoginFormView(loginFormModel);


	// Создаём инстанс модели, который привяжем ко вьюхе
	var dashboardModel = new LoginFormModel();
	// Создаём инстанс вьюхи, который будет отображаться; передаём туда модель
	var dashboardView = new DashboardView(dashboardModel);

	var headerView = new HeaderView(new HeaderModel);

	// Рендерим нашу вьюху в один из регионов приложения, определённый нами в самом начале

	app.mainRegion.show(loginFormView);
});


// Start history when our application is ready
app.on('start', function() {
  	Backbone.history.start();
});



// Load some initial data, and then start our application
$(document).ready(function(){
	app.start();
});

function ajax (type, url, data, successCallback, errorCallback) {

	$.ajax(
		{
			type: type,
			url: url,
			data: JSON.stringify(data),
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			response: "json",
			success: function (message) {
				console.log(message);

				if (successCallback)
					successCallback(message.result);
			},
			error: function (message) {
				console.log(message.responseJSON.error);

				if (errorCallback)
				 errorCallback(message.responseJSON.error);
			}
		}
	);
}