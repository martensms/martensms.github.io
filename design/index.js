
(function(global) {

	/*
	 * VIEW MANAGEMENT
	 */

	var _set_header = function(active) {

		var header = document.querySelector('header');
		if (header !== null) {
			header.className = (active === true ? 'active' : '');
		}

	};

	var _set_aside = function(active) {

		var aside = document.querySelector('aside');
		if (aside !== null) {
			aside.className = (active === true ? 'active' : '');
		}

	};

	var _set_main = function(active, reference) {

		var main = document.querySelector('main');
		if (main !== null) {
			main.className = (active === true ? 'active' : '');
		}


		var section = document.querySelector(reference);
		if (section !== null) {

			[].slice.call(section.parentNode.querySelectorAll('section')).forEach(function(other) {
				other.className = (other === section) ? 'active' : '';
			});

		}

	};

	var _set_view = function(reference) {

		var section = document.querySelector(reference.split('-')[0]);
		var article = document.querySelector(reference);

		if (section !== null && article !== null) {

			[].slice.call(section.querySelectorAll('article')).forEach(function(other) {
				other.className = (other === article) ? 'active' : '';
			});

		}

	};


	var menu = [].slice.call(document.querySelectorAll('menu li a'));
	if (menu.length > 0) {

		menu.forEach(function(link) {

			link.onclick = function() {

				var reference = '#' + this.href.split('#')[1];
				if (reference === '#home') {
					_set_header(false);
					_set_aside(false);
					_set_main(false, null);
				} else {
					_set_header(true);
					_set_aside(true);
					_set_main(true, reference);
				}

				menu.forEach(function(other) {
					other.className = (other === link) ? 'active' : '';
				});

				return false;

			};

		});

	}


	var sections = [].slice.call(document.querySelectorAll('main section'));
	if (sections.length > 0) {

		sections.forEach(function(section) {

			var submenu = [].slice.call(section.querySelectorAll('ul li a'));
			if (submenu.length > 0) {

				submenu.forEach(function(link) {

					link.onclick = function() {

						var reference = '#' + this.href.split('#')[1];
						if (reference.length > 1) {
							_set_view(reference);
						}

						submenu.forEach(function(other) {
							other.className = (other === link) ? 'active' : '';
						});

						return false;

					};

				});

			}

		});

	}


	var github = document.querySelector('#button-github');
	if (github !== null) {

		github.onclick = function() {
			window.open('https://github.com/martensms');
		};

	}


	var secret = document.querySelector('#button-secret');
	if (secret !== null) {

		secret.onclick = function() {
			modal.className = (modal.className === 'active') ? '' : 'active';
		};

	}


	window.addEventListener('load', function() {

		setTimeout(function() {
			window.scrollTo(0, 1);
		}, 100);

	}, false);


	var _fancy_code = '';

	window.addEventListener('keyup', function(event) {

		var modal = document.querySelector('#modal');
		if (modal.className === 'active') {

			var code = document.querySelector('#modal-code');
			var k    = '';
			var key  = null;

			switch (event.keyCode) {
				case 38: k = 'u'; key = 'up';      break;
				case 39: k = 'r'; key = 'right';   break;
				case 37: k = 'l'; key = 'left';    break;
				case 40: k = 'd'; key = 'down';    break;
			}


			if (code !== null && key !== null) {

				_fancy_code += k;

				code.innerHTML = _fancy_code.split('').map(function(v) {
					return '<span class="code-' + v + '"></span>';
				}).join('-');


				var l = _fancy_code.length;
				if (_fancy_code.substr(0, l) !== 'uuddlrlr'.substr(0, l)) {

					code.innerHTML = 'Access denied.';
					_fancy_code    = '';

					setTimeout(function() {
						modal.className = '';
					}, 1000);

				} else {

					if (_fancy_code.length === 8) {

						setTimeout(function() {
							location.href = './secret.html';
						}, 1000);

						code.innerHTML = 'Access granted';
						_fancy_code    = '';

					}

				}

			}

		}

	}, false);

})(this);

