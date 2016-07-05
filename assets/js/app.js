
// Создаём инстанс приложения

var app = new Marionette.Application();

app.addRegions({
	mainRegion: "#wrapper" // Указываем куда будет рендериться приложение
});



LoginFormModel = Backbone.Model.extend({
	// Поля модели, доступные по умолчанию(в т.ч. если в конструктор модели не будут
	//	переданы какие-то из параметров, )
	defaults: {
		username: '',
		password: ''
		// Здесь могут быть и любые другие поля если необходимо
	}
});

// Подробнее про модели здесь: http://backbonejs.org/#Model
// ----------------------------------------------------


function formSuccess (result) {
	$('#wrapper').find('.tooltip').removeClass('show');

	$.cookie('usertoken', result.token);
	location.reload();
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
	template: '#login_form_template',



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

function callback (user_info) {

		$('#content').css('max-width', '700px');
		$('#content').css('min-width', '400px');

		var token = $.cookie('usertoken');

		$("#username-field").append(user_info.username);

		if (user_info.lastName)
			$('#name').append(user_info.lastName);
		if(user_info.firstName) 
			$('#name').append(' ' + user_info.firstName);
		if(user_info.patronymic)
			$('#name').append(' ' + user_info.patronymic);

		if (user_info.tgId)
			$('#tgId').append(user_info.tgId);

		$('#role').append(user_info.role);

		if (user_info.role == 'student')
			$('#content').append('<button class="rounded blue btn">Rule your INNOPOINTS</button>');


		listAccounts(token,
			function (result) {
				result.forEach( 
					function(element, index) {
						$('#content').append('<p id="user-' + index + '">User #' + index + ': ' + element.username + ' . His role is ' + element.role + ';');
						$('#content').append(' Change to <select data="'+element.id+'"><option ' + (element.role == 'ghost' ? 'selected' : '') + ' value="0">ghost</option><option ' + (element.role == 'student' ? 'selected' : '') + ' value="1">student</option></select></p><br/>');
					}
				);
				$('select').change(function () {
					var id = this.getAttribute("data");
					var role = $('this').val() == 0 ? 'ghost' : 'student';
					updateRole(token, id, role);
					listAccounts(token);
				});
			}
		);
}


LogoutFormModel = Backbone.Model.extend({
	//
});

LogoutFormView = Marionette.ItemView.extend({
	initialize: function(model) {
		// Это конструктор вьюшки
		// Принимаем инстанс модели, к которой будет привязана вьюшка
		this.model = model;

		var token = $.cookie('usertoken');
		getAccount(token, callback);
	},
	// Имя html-шаблона, с которым связывается вьюшка
	template: '#personal_page_template',
	// События, на которые будет реагировать вьюшка
	events: {
		'click #logout_button': function (argument) {
			$.removeCookie('usertoken');
			location.reload();
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
	var logoutFormModel = new LogoutFormModel();
	// Создаём инстанс вьюхи, который будет отображаться; передаём туда модель
	var logoutFormView = new LogoutFormView(logoutFormModel);

	// Рендерим нашу вьюху в один из регионов приложения, определённый нами в самом начале

	if (!$.cookie('usertoken'))
		app.mainRegion.show(loginFormView);
	else 
		/*TODO Redirect to personal page by user's token.*/
		app.mainRegion.show(logoutFormView);
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