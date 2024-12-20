// Toggle class menu
document.addEventListener('DOMContentLoaded', function () {
	document.querySelector('.menu')?.addEventListener('click', function () {
		this.classList.toggle('active');
		const menus = [
			'.ss-menu1',
			'.ss-menu2',
			'.ss-menu3',
			'.ss-menu4',
			'.ss-menu5'
		];
		menus.forEach(menu => {
			document.querySelector(menu)?.classList.toggle('visible' + menu[8], this.classList.contains('active'));
		});
	});
	
	document.querySelectorAll('.ss-menu').forEach(ssMenu => {
		ssMenu.addEventListener('click', function () {
			document.querySelector('.menu')?.classList.remove('active');
			document.querySelectorAll('[class*="ss-menu"]').forEach(el => {
				el.classList.remove('visible' + el.className.match(/\d+/)[0]);
			});
		});
	});
	
	window.addEventListener('scroll', function () {
		if (document.querySelector('.menu')?.classList.contains('active')) {
			document.querySelector('.menu').classList.remove('active');
			document.querySelectorAll('[class*="ss-menu"]').forEach(el => {
				el.classList.remove('visible' + el.className.match(/\d+/)[0]);
			});
		}
	});
});

// Parallax effect
document.addEventListener('DOMContentLoaded', function () {
	if (!window.location.pathname.includes('mentions')) {
		document.querySelectorAll('.rellax').forEach(el => {
			el.style.transform = 'translateX(-50%)';
		});
		new Rellax('.rellax');
	}
});

// Lazy loading function
document.addEventListener('DOMContentLoaded', function () {
	if (!window.location.pathname.includes('mentions')) {
		if (typeof lazyload === 'function') {
			lazyload();
		} else {
			console.warn('Lazyload is undefined !');
		}
	}
});


// Email script
window.addEventListener('load', function () {
	const divMail = document.getElementById('insertMail');
	if (divMail) {
		const name = 'contact';
		const domain = 'yourbandname.com';
		const newAhref = document.createElement('a');
		newAhref.href = `mailto:${name}@${domain}`;
		newAhref.textContent = `${name}@${domain}`;
		divMail.appendChild(newAhref);
	}
});

// Manage video
document.querySelector('video')?.addEventListener('click', function (event) {
	event.preventDefault();
	document.getElementById('tucoVideo')?.play();
});

// Manage form validations
document.addEventListener('DOMContentLoaded', function () {
	const validateField = (selector, validationFn, message) => {
		const field = document.querySelector(selector);
		const helpField = document.querySelector(`#help${selector.substring(1)}`);
		field?.addEventListener('blur', function () {
			if (!validationFn(field.value)) {
				helpField.textContent = message;
				helpField.style.display = 'block';
			} else {
				helpField.style.display = 'none';
			}
		});
	};
	
	validateField('#name', val => val.length < 50, '50 characters max');
	validateField('#telephone', val => /^[0][1-7][0-9]{8}$/.test(val.replace(/ /g, '')), 'Incorrect phone number');
	validateField('#mail', val => /^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,6}$/.test(val), 'Incorrect email address');
	validateField('#checkRobot', val => val === '7', 'Incorrect result of the operation');
	validateField('#message', val => val.length < 3000, 'Your message must not exceed 3000 characters');
});

// Contact form
document.querySelector('.contactForm')?.addEventListener('submit', function (e) {
	e.preventDefault();
	const data = {
		name: document.querySelector('#name').value,
		telephone: document.querySelector('#telephone').value,
		mail: document.querySelector('#mail').value,
		message: document.querySelector('#message').value,
		newsletter: document.querySelector('input[name="newsletter"]:checked')?.value,
		checkRobot: document.querySelector('#checkRobot').value
	};
	
	if (data.checkRobot === '7') {
		fetch('../datas/sendFormContact.php', {
			method: 'POST',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			body: new URLSearchParams(data)
		})
			.then(response => response.text())
			.then(html => {
				document.querySelector('form').style.display = 'none';
				const messageForm = document.querySelector('#message-container');
				messageForm.style.cssText = `
                padding: 10px;
                margin: 160px auto;
                color: white;
                font-size: 1rem;
                text-align: center;
            `;
				messageForm.innerHTML = html;
			});
	} else {
		alert('Incorrect anti robot check result !');
	}
});

// Handle animations on scroll
window.addEventListener('scroll', function () {
	const sizePage = window.innerHeight;
	const trigger = 100;
	
	document.querySelectorAll('.animatableY, .animatableX, .animatableOpacity').forEach(el => {
		if (el.getBoundingClientRect().top + trigger <= sizePage) {
			el.classList.add('showed');
		}
	});
});

// Scroll Up Button
document.addEventListener('DOMContentLoaded', function () {
	const upArrow = document.getElementById('upArrow');
	
	if (upArrow) {
		let lastScrollTop = 0;
		
		window.addEventListener('scroll', function () {
			const currentScroll = window.scrollY;
			
			if (currentScroll > 600 && currentScroll < lastScrollTop) {
				upArrow.style.display = 'block';
			} else {
				upArrow.style.display = 'none';
			}
			
			lastScrollTop = currentScroll;
		});
		
		upArrow.addEventListener('click', function () {
			window.scrollTo({top: 0, behavior: 'smooth'});
		});
	}
});

// Social icons
document.addEventListener('DOMContentLoaded', function () {
	// Locations
	const cards = document.querySelectorAll('.card');
	cards.forEach(card => {
		card.addEventListener('click', function () {
			window.location.href = 'https://www.instagram.com/';
		});
	});
	
	// Location socials
	const facebookLinks = document.querySelectorAll('.facebook');
	facebookLinks.forEach(facebook => {
		facebook.addEventListener('click', function (event) {
			event.preventDefault();
			window.location.href = 'https://facebook.com/';
		});
	});
	
	const instagramLinks = document.querySelectorAll('.instagram');
	instagramLinks.forEach(instagram => {
		instagram.addEventListener('click', function (event) {
			event.preventDefault();
			window.location.href = 'https://www.instagram.com/';
		});
	});
});
