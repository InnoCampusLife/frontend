
// Создаём инстанс приложения

var app = new Marionette.Application();

app.addRegions({
	mainRegion: "#formView" // Указываем куда будет рендериться приложение
});


function createAccount(_username, _password) {
	var request = $.ajax(
		{
			type: "POST",
			url: "/api/v1/accounts/",
			data: JSON.stringify({ username: _username, password: _password }),
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			response: "json",
			success: function (message) {
				console.log(message);
			},
			error: function (message) {
				console.log(message);
			}
		}
	);
}


function authorize(_username, _password) {
	var request = $.ajax(
		{
			type: "POST",
			url: "/api/v1/accounts/auth",
			data: JSON.stringify({ username: _username, password: _password }),
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			response: "json",
			success: function (message) {
				console.log(message);
			},
			error: function (message) {
				console.log(message);
			}
		}
	);
}

function getAccount (token) {
	var request = $.ajax(
		{
			type: "GET",
			url: "/api/v1/accounts/" + token,
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			response: "json",
			success: function (message) {
				console.log(message);
			},
			error: function (message) {
				console.log(message);
			}
		}
	);
}

function listAccounts (moder_token) {
	var request = $.ajax(
		{
			type: "GET",
			url: "/api/v1/accounts/" + moder_token + "/listAccounts",
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			response: "json",
			success: function (message) {
				console.log(message);
			},
			error: function (message) {
				console.log(message);
			}
		}
	);
}

function updateRole (moder_token, account_id, new_role) {
	var request = $.ajax(
		{
			type: "PUT",
			url: "/api/v1/accounts/" + moder_token + "/updateRole",
			data: JSON.stringify({ accountId: account_id, newRole: new_role }),
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			response: "json",
			success: function (message) {
				console.log(message);
			},
			error: function (message) {
				console.log(message);
			}
		}
	);
}

function accountExists (token) {
	var request = $.ajax(
		{
			type: "GET",
			url: "/api/v1/accounts/" + token + "/exists",
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			response: "json",
			success: function (message) {
				console.log(message);
			},
			error: function (message) {
				console.log(message);
			}
		}
	);
}

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
			authorize($('#username').val(), $('#password').val());
		},

		'click #reg_button': function(e) {
			e.preventDefault();
			e.stopPropagation();
			e.stopImmediatePropagation();
			// Например, при нажатии на кнопку регистрации
			createAccount($('#username').val(), $('#password').val());
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