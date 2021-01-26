let grid = document.querySelector('.grid');
if (grid) {

	$('.grid').masonry({
		// options
		itemSelector: '.grid-item',
		gutter: 10,
		originCenter: true,
	});
}

let menu = document.querySelector('.burger');
if (menu) {
	menu.addEventListener('click', function(e) {
		e.preventDefault();
		let categorias = document.querySelector('div.portafolio-container div.categorias');
		if (categorias) {
			categorias.style.zIndex = "3";
		}
		document.querySelector('nav').classList.add('active');
	})
}



let close = document.querySelector('nav .close');
if (close) {
	close.addEventListener('click', function(e) {
		e.preventDefault();
		let categorias = document.querySelector('div.portafolio-container div.categorias');
		if (categorias) {
			categorias.style.zIndex = "5";
		}
		document.querySelector('nav').classList.remove('active');
		document.querySelector('.contacto').style.display = "none";
	})
}


let close_contacto = document.querySelector('.contacto .close');
if (close_contacto) {
	close_contacto.addEventListener('click', function(e) {
		e.preventDefault();
		document.querySelector('.contacto').style.display = "none";
	})
}


let contacto = document.querySelector('.seccion-contacto .container button');
if (contacto) {
	contacto.addEventListener('click', function(e) {
		e.preventDefault();
		document.querySelector('.contacto').style.display = "block";
	})
}


//pop de research
pop_research = document.querySelector('.pop-research');
if (pop_research) {
	pop_research.addEventListener('click', function(e) {
		e.preventDefault();
		document.querySelector('.research-modal').style.display = "block";
	})
}

let close_research = document.querySelector('.research-modal .close');
if (close_research) {
	close_research.addEventListener('click', function(e) {
		e.preventDefault();
		document.querySelector('.research-modal').style.display = "none";
	})
}




//hover galeria
let large = document.querySelectorAll('.large, .short');
if (large) {
	for (var i = 0; i <= large.length - 1; i++) {
		large[i].addEventListener('mouseout', function(e) {
			img = e.target.getAttribute('data-init');
			e.target.setAttribute('src', img);
		});
	}

	for (var j = 0; j <= large.length - 1; j++) {
		large[j].addEventListener('mouseover', function(e) {
			img = e.target.getAttribute('data-finish');
			e.target.setAttribute('src', img);
		});
	}
}



//CLICK A CADA PROYECTO EN PORTAFOLIO
let largeClick = document.querySelectorAll('.large, .short figure');
if (largeClick) {
	for (var i = 0; i <= largeClick.length - 1; i++) {
		largeClick[i].addEventListener('click', function(e) {
			let url = e.target.getAttribute('data-url');
			if (url != null) {
				window.location.href = url;
			}
		});
	}
}




//EFECTO DE ALICK AL MENU
itemMenu = document.querySelectorAll('header nav a');
if (itemMenu) {
	for (var i = 0; i <= itemMenu.length - 1; i++) {
		itemMenu[i].addEventListener('click', function(e) {
			$('nav').removeClass();
		});
	}
}



//Efecto de Filtrado
categorias = document.querySelectorAll('.categorias a');
if (categorias) {
	for (var i = 0; i <= categorias.length - 1; i++) {
		categorias[i].addEventListener('click', function(e) {
			e.preventDefault();
			let cat = e.target.getAttribute('data-cat');

			if (cat != 'todas') {
				console.log(cat);
				$('.filtro').css('display', 'block');
				$('.large.'+cat+' .filtro, .short figure.'+cat+' .filtro').css('display', 'none');
				return false;
			}

			$('.filtro').css('display', 'none');

		});
	}
}



//MEDIA QUERY
var mediaqueryList = window.matchMedia("(min-width: 767px)");
if(mediaqueryList.matches) {
    EfectoScrollColores();
}
else {
	$('header > div > a > figure > img').attr('src', 'assets/img/logo.png')
}



//BOTON PORTAFOLIO HOME
let portafolio = document.querySelector('.seccion-portafolio button');
if (portafolio) {
	portafolio.addEventListener('click', function() {
		window.location.href = 'portafolio.html';
	})
}


//CONTACTO VALIDACION
let btncontacto = document.querySelector(".send-form");
if (btncontacto) {
	btncontacto.addEventListener('click', function(e) {
		e.preventDefault();

		let name = document.querySelector('#form-contacto input[name="name"]'),
			lastname = document.querySelector('#form-contacto input[name="last_name"]'),
			email = document.querySelector('#form-contacto input[name="email"]'),
			phone = document.querySelector('#form-contacto input[name="phone"]'),
			message = document.querySelector('#form-contacto textarea[name="message"]'),
			bandera = 0;


		if (name.value == '') {
			name.style.borderColor = 'red';
			bandera = 1;
		}

		if (lastname.value == '') {
			lastname.style.borderColor = 'red';
			bandera = 1;
		}

		if (email.value == '') {
			email.style.borderColor = 'red';
			bandera = 1;
		}

		if ( !validarEmail(email.value) ) {
			email.style.borderColor = 'red';
			bandera = 1;
		}

		if ( phone.value == '' ) {
			phone.style.borderColor = 'red';
			bandera = 1;
		}

		if ( isNaN(phone.value) ) {
			phone.style.borderColor = 'red';
			bandera = 1;
		}

		if (message.value == '') {
			message.style.borderColor = 'red';
			bandera = 1;
		}

		if (bandera == 1) {
			return false;
		}


		e.target.disabled = true;

		const data = new FormData(document.getElementById('form-contacto'));
        let opciones = {
            method: "POST",
            credentials: "same-origin",
            body: data,
        };

        fetch("inc/envio.php", opciones)
            .then(response => response.json())
            .then(res => {
            	if (res.message == 'ok') {
            		swal("Se envio el Mensaje con exito", "success");
            		e.target.removeAttribute('disabled');
            		document.getElementById("form-contacto").reset();
            	}
            	else if (res.message == 'error_parameters') {
            		swal("Los datos mandados no son validos o faltan datos", "error");
            		e.target.removeAttribute('disabled');
            	}
            	else if (res.message == 'error_send') {
            		swal("Ocurrio un problema al enviar el mensaje, intentelo más tarde", "error");
            		e.target.removeAttribute('disabled');
            	}
            	else {
            		swal("Ocurrio un problema al enviar el mensaje, intentelo más tarde", "error");
            		e.target.removeAttribute('disabled');
            	}
            })


	});
}



//LOTTIE ANIMATION

logo = document.querySelector("#bm");
if (logo) {
	var controller = new ScrollMagic.Controller();
	var animation = lottie.loadAnimation({
		container: document.getElementById('bm'),
		renderer: 'svg',
		loop: false,
		autoplay: false,
		path: 'assets/img/logo.json'
	});

	// Setup Timeline
  	var tl = new TimelineMax();
  	tl.to({frame:0}, 1, {
    	frame: animation.totalFrames-1,
    	onUpdate:function() {
      		animation.goToAndStop((Math.round(this.progress() * 100)), true)
    	},
    	ease: Linear.easeNone
  	})


	// Attach to scroll
	var lottieScene = new ScrollMagic.Scene({
	    	duration: '100%',
	        offset: 1
		})
    	.setPin("#header-scroll")
    	.setTween(tl)
    	.addTo(controller);
}


function validarEmail(email) {
	var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email) ? true : false;
}


function EfectoScrollColores() {
	//Efecto scroll
	let secLogo = document.querySelector('.section-logo');
	if (secLogo) {
		let section1 = document.querySelector('.section-logo').offsetTop;
	  	let section2 = document.querySelector('.seccion-info').offsetTop;
	  	let section3 = document.querySelector('.seccion-portafolio').offsetTop;
	  	let section4 = document.querySelector('.seccion-research').offsetTop - 100;
	  	let section5 = document.querySelector('.seccion-contacto').offsetTop - 100;
	  	$(".submenu ul li a").css('background', 'none');


		if (window.scrollY < section2) {
			if (!$('#main').hasClass('negro')) {
				$('#main').removeClass();
				$('#main').addClass('negro');
			}

			$(".submenu a[href='#section_logo']").css('background', '#fff');

	 	}

		if (window.scrollY >= section2 && window.scrollY < section3) {

			if (!$('#main').hasClass('azul_marino')) {
				$('#main').removeClass();
				$('#main').addClass('azul_marino');
			}

			$(".submenu a[href='#section_info']").css('background', '#fff');
			$("header > div > a > figure > img").attr('src', 'assets/img/logo.png');


		}

		if (window.scrollY >= section3 && window.scrollY < section4) {

			if (!$('#main').hasClass('azul')) {
				$('#main').removeClass();
				$('#main').addClass('azul');
			}

			$(".submenu a[href='#seccion_portafolio']").css('background', '#fff');

		}


		if (window.scrollY >= section4 && window.scrollY < section5) {

			if (!$('#main').hasClass('verde_agua')) {
				$('#main').removeClass();
				$('#main').addClass('verde_agua');
			}

			$(".submenu a[href='#seccion_research']").css('background', '#fff');

		}

		if (window.scrollY >= section5) {

			if (!$('#main').hasClass('verde_claro')) {
				$('#main').removeClass();
				$('#main').addClass('verde_claro');
			}


			$(".submenu a[href='#seccion_contacto']").css('background', '#fff');
		}


		window.onscroll = function (e) {

		  	let section1 = document.querySelector('.section-logo').offsetTop;
		  	let section2 = document.querySelector('.seccion-info').offsetTop;
		  	let section3 = document.querySelector('.seccion-portafolio').offsetTop;
		  	let section4 = document.querySelector('.seccion-research').offsetTop - 100;
		  	let section5 = document.querySelector('.seccion-contacto').offsetTop - 100;
		  	$(".submenu ul li a").css('background', 'none');


			if (window.scrollY < section2) {
				if (!$('#main').hasClass('negro')) {
					$('#main').removeClass();
					$('#main').addClass('negro');
				}

				$(".submenu a[href='#section_logo']").css('background', '#fff');
				$("header > div > a > figure > img").attr('src', 'assets/img/logo-blanco.png');

		 	}

			if (window.scrollY >= section2 && window.scrollY < section3) {

				if (!$('#main').hasClass('azul_marino')) {
					$('#main').removeClass();
					$('#main').addClass('azul_marino');
				}

				$(".submenu a[href='#section_info']").css('background', '#fff');
				$("header > div > a > figure > img").attr('src', 'assets/img/logo-blanco.png');



			}

			if (window.scrollY >= section3 && window.scrollY < section4) {

				if (!$('#main').hasClass('azul')) {
					$('#main').removeClass();
					$('#main').addClass('azul');
				}

				$(".submenu a[href='#seccion_portafolio']").css('background', '#fff');
				$("header > div > a > figure > img").attr('src', 'assets/img/logo.png');

			}


			if (window.scrollY >= section4 && window.scrollY < section5) {

				if (!$('#main').hasClass('verde_agua')) {
					$('#main').removeClass();
					$('#main').addClass('verde_agua');
				}

				$(".submenu a[href='#seccion_research']").css('background', '#fff');

			}

			if (window.scrollY >= section5) {

				if (!$('#main').hasClass('verde_claro')) {
					$('#main').removeClass();
					$('#main').addClass('verde_claro');
				}


				$(".submenu a[href='#seccion_contacto']").css('background', '#fff');
			}
		}
	}
}



