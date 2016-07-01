
// Создаём инстанс приложения

var app = new Marionette.Application();

app.addRegions({
	mainRegion: "#content" // Указываем куда будет рендериться приложение
});


// ----------------------------------------

// Описание используемых моделей данных и функцй для работы с ними
// Ниже пример того, как можно расширять класс стандартной модели Backbone.
// Это именно новый класс, а не объект, и соответственно нам нужно будет
//  создавать инстансы этого класса для работы с моделью.

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
			authorize($('#username').val(), $('#password').val(),
				function success (result) {
					$('#wrapper').find('.tooltip').removeClass('show');

					$.cookie('usertoken', result.token);
					location.reload();
				},
				function error (error) {
					console.log(error);
					$('#wrapper').find('.tooltip').attr('title', !error ? "Unknown error" : error);
					$('#wrapper').find('.tooltip').addClass('show');
				}
			);
		},

		'click #reg_button': function(e) {
			e.preventDefault();
			e.stopPropagation();
			e.stopImmediatePropagation();
			// Например, при нажатии на кнопку регистрации
			createAccount(
				$('#username').val(),
				$('#password').val(),
				function success (message) {
					console.log(message);
					$('#wrapper').find('.tooltip').removeClass('show');
					$('.form-edit:has("#username")').removeClass("has-error");

					$.cookie('usertoken', message.result.token);
					location.reload();
				},
				function error (message) {
					console.log(message.responseJSON.error);
					$('#wrapper').find('.tooltip').attr('title', !message.responseJSON.error ? "Unknown error" : message.responseJSON.error);
					$('#wrapper').find('.tooltip').addClass('show');
					$('.form-edit:has("#username")').addClass("has-error");
				}
			);
		}
	}
});

LogoutFormModel = Backbone.Model.extend({
	//
});

LogoutFormView = Marionette.ItemView.extend({
	initialize: function(model) {
		// Это конструктор вьюшки
		// Принимаем инстанс модели, к которой будет привязана вьюшка
		this.model = model;
	},
	// Имя html-шаблона, с которым связывается вьюшка
	template: '#login_success',
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