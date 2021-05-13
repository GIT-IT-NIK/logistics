// Track & trace functions

var myActionflag = false;

function submitenter(trackinghome, e) {
	var keycode;
	if (window.event)
		keycode = window.event.keyCode;
	else if (e)
		keycode = e.which;
	else return true;

	if (keycode == 13) {
		fShowID(trackinghome);
		return false;
	} else {
		return true;
	}
}

var shipmentInfoURL = "";

function fShipmentInfo() {
	var environment = (window.location.href).substring(7, 11);
	if ("rdev" == environment) {
		shipmentInfoURL = "http://www-int.apllogistics.com/wps/portal/apll/locations?1dmy&current=true&urile=wcm:path:/assets/images/files/APLL/Applications/Shipment+Visibility&TITLE=Shipment%20Visibility";
	}

	if ("rint" == environment) {
		shipmentInfoURL = "http://www-int.apllogistics.com/wps/portal/apll/locations?1dmy&current=true&urile=wcm:path:/assets/images/files/APLL/Applications/Shipment+Visibility&TITLE=Shipment%20Visibility";
	}
}

function fShowID(trackinghome) {

	var trackinghome = document.getElementById("trackinghome").value;

	if (trackinghome == "") {
		alert("Please select Tracking type");
		document.getElementById("trackinghome").focus();
		return false;
	}
	var shipmentTrackID = document.getElementById("hometrackinput").value;
	if (shipmentTrackID == "") {
		myActionflag = true;
	}

	if (trackinghome == "HAWB") {
		if (myActionflag) {
			myActionflag = false;
			alert("Tracking by HAWB number is only available for Track");
			frm.refNo.value = shipmentTrackID;
			frm.refNo.focus();
			return false;
		}
	}

	if (shipmentTrackID == null || shipmentTrackID == "") {
		alert("Please Enter shipmentTrackID ");
		document.getElementById("hometrackinput").focus();
		return false;
	}
	if (trackinghome == "HAWB") {
		if (shipmentTrackID.length > 50) {
			myActionflag = false;
			alert("Invalid Shipment reference length. Please search again using a reference in the following format: SHASHA1001088 and max 50 character length")
			frm.refNo.value = shipmentTrackID;
			frm.refNo.focus();
			return false;
		} else if (!TNT_Validate_HAWB(shipmentTrackID)) {
			myActionflag = false;
			alert("The shipment reference is not recognized. Please search again using a reference in the following format: SHASHA1001088")
			frm.refNo.value = shipmentTrackID;
			frm.refNo.focus();
			return false;
		}
	} else {
		if (!TNT_Validate(shipmentTrackID)) {

			alert("The shipment reference is not recognized. Please search again using a reference in the following format: SIN716274");
			document.getElementById("hometrackinput").focus();
			return false;
		} else if (shipmentTrackID.length != 9 && shipmentTrackID.length != 11) {
			alert("The shipment reference is not recognized. Please search again using a reference in the following format: SIN716274");
			document.getElementById("hometrackinput").focus();
			return false;
		}
	}

	function TNT_Validate(refNo) {
		/*var c = refNo.charAt(0);
		if(!TNT_IsAlphaChar(c)){
			return false;
		}*/

		var ccode = refNo.substring(0, 3);
		if (!TNT_IsAlphaNumeric(ccode)) {
			return false;
		}

		var number = refNo.substring(3, refNo.length);
		if (!TNT_IsInteger(number)) {
			return false;
		}
		return true;
	}

	function TNT_Validate_HAWB(refNo) {
		var c = refNo.charAt(0);
		if (!TNT_IsAlphaChar(c)) {
			return true;
		}

		var ccode = refNo.substring(0, 3);
		if (!TNT_IsAlphaNumeric(ccode)) {
			return true;
		}

		//var number = refNo.substring(3,refNo.length);
		//if(!TNT_IsInteger(number)){
		//return false;
		//}
		return true;
	}

	function TNT_IsInteger(s) {
		var i;
		for (i = 0; i < s.length; i++) {
			// Check that current character is number.
			var c = s.charAt(i);
			if (((c < "0") || (c > "9")))
				return false;
		}
		// All characters are numbers.
		return true;
	}

	function TNT_IsAlphaChar(ch) {
		if (/[^a-zA-Z]/gi.test(ch)) {
			return false;
		}
		// All characters are alphabets.
		return true;
	}

	function TNT_IsAlphaNumeric(ch) {
		if (/[^0-9|a-zA-Z]/gi.test(ch)) {
			return false;
		}
		// All characters are alphabets.
		return true;
	}

	window.open('http://www.seechange.com/wps/portal/shipmenttracking/!ut/p/c5/04_SB8K8xLLM9MSSzPy8xBz9CP0os3gjC2cLC98gV09zYyM3A88g4wBLAzM_AwszA6B8JE55A3dzYnQb4ACOBgR0h4Nci992kDwe8_088nNT9SP1o8xx2uNroF-QGxphkGUSCAAhp5WC/dl3/d3/L0lJSklKSkpDZ3BSQS9JUGpBQUF5QUJFUWlTbTV1cGchIS80Qm40dFdBdHIwUkprZ2xFSUEhIS82XzI4Qzg4TVJFSTczMkYwSVIzUDkwNk4wODYwLzdfMjhDODhNUkVJNzMyRjBJUjNQOTA2TjA4TTAvc3BmX0FjdGlvbk5hbWUvc3BmX3N0cnV0c0FjdGlvbjolMHBvcnRsZXQlMGJhc2ljLmRv?refNoType=' + trackinghome + '&refNo=' + shipmentTrackID, 'formresult', 'scrollbars=yes,menubar=no,height=600,width=800,resizable=yes,toolbar=no,status=yes');
}
;(function ($) {

	$("#hometrackinput").on('keyup', function (e) {
		if (e.keyCode == 13) {
			$('#shipmentTrackingID button').click();
		}
	});

	// Fit slide video background to video holder
	function resizeVideo() {

		//var $video = $('.video');
		var $trailer = $('.videoHolder');

		$trailer.find('.video').each(function () {
			if ($trailer.width() / 16 > $trailer.height() / 9) {
				$(this).css({'width': '100%', 'height': 'auto'});
			} else {
				$(this).css({'width': 'auto', 'height': '100%'});
			}
		});
		$trailer.find('.responsive-embed').each(function () {
			if ($trailer.width() / 16 > $trailer.height() / 9) {
				$(this).css({'width': '100%', 'height': 'auto'});
			} else {
				$(this).css({'width': $trailer.height() * 16 / 9, 'height': '100%'});
			}
		});
	}

	// Sticky Footer
	var bumpIt = function () {
				$('body').css('padding-bottom', $('.footer').outerHeight(true));
				$('.footer').addClass('sticky-footer');
			},
			didResize = false;

	$(window).resize(function () {
		didResize = true;
	});
	setInterval(function () {
		if (didResize) {
			didResize = false;
			bumpIt();
		}
	}, 250);

	//sticky header

	const $stickyHeader = $('.stickyHeader');

	function stickyHeader(stickyHeader) {
		var headerHeight = stickyHeader.outerHeight(true);
		if (window.pageYOffset >= headerHeight) {
			$(stickyHeader).addClass('sticky');
		} else {
			$(stickyHeader).removeClass('sticky');
		}
	}

	// check if in viewport
	$.fn.isInViewport = function () {
		var halfviewportHeight = ($(window).height()) / 2;
		var elementTop = $(this).offset().top;
		var elementTopWithOffset = $(this).offset().top;
		var elementBottom = elementTop + $(this).outerHeight();

		var viewportTop = $(window).scrollTop();
		var viewportBottom = viewportTop + $(window).height();

		return elementBottom > viewportTop && elementTopWithOffset < viewportBottom;
	};

	//parallax
	var parallaxContent = function () {
		if ($(window).width() > 1024) {
			$('.parallax').each(function (el) {
				if ($(this).isInViewport()) {
					var scrolled = $(window).scrollTop() - ($(this).offset().top - ($(window).outerHeight() / 2));
					if ($(this).hasClass('hero-icon-wrapper')) {
						$(this).css({
							'transform': 'translateY(' + (1 - (scrolled * 0.045)) + 'px)'
						});
					} else if ($(this).hasClass('market-parallax-wrapper')) {
						$(this).css({
							'transform': 'translateY(' + (1 - (scrolled * 0.1)) + 'px)'
						});
					} else if ($(this).hasClass('about-parallax-img')) {
						$(this).css({
							'transform': 'translate( -50%, calc( -50% + ' + (1 - (scrolled * 0.08)) + 'px ) ) translateZ(0)'
						});
					} else {
						$(this).css({
							'transform': 'translateY(' + (1 - (scrolled * 0.1)) + 'px)'
						});
					}
				}
			});
		}
	};

	var styledSelect = function () {
		$('body select').each(function () {
			var $this = $(this), numberOfOptions = $this.children('option').length;

			$this.addClass('hide');
			$this.wrap('<div class="select"></div>');
			$this.after('<div class="select-styled"></div>');

			var $styledSelect = $this.next('div.select-styled');
			$styledSelect.text($this.children('option:selected').text()).addClass('active');

			var $list = $('<ul />', {
				'class': 'select-options'
			}).insertAfter($styledSelect);

			for (var i = 0; i < numberOfOptions; i++) {
				$('<li />', {
					text: $this.children('option').eq(i).text(),
					value: $this.children('option').eq(i).val()
				}).appendTo($list);
			}

			var $listItems = $list.children('option');

			$styledSelect.click(function (e) {
				e.stopPropagation();
				$('div.select-styled.active').not(this).each(function () {
					$(this).removeClass('active').next('ul.select-options').hide();
				});
				$(this).toggleClass('active').next('ul.select-options').toggle();
			});

			var defaultSelect = $this.detach();
			defaultSelect.insertBefore($styledSelect.closest('.select'));

			// $listItems.click( function ( e ) {
			// 	e.stopPropagation();
			// 	$styledSelect.text( $( this ).text() ).removeClass( 'active' );
			// 	$this.val( $( this ).attr( 'rel' ) ).change();
			// 	$list.hide();
			// 	//console.log($this.val());
			// } );

			$list.on('click', 'li', function (e) {
				e.stopPropagation();
				$styledSelect.text($(this).text()).removeClass('active');
				// let selectVal = $styledSelect.siblings('select').find( 'option:contains("'+$( this ).text()+'")' );
				// $styledSelect.siblings('select').children('option').prop('selected', false).end().find( 'option:contains("'+$( this ).text()+'")' ).prop('selected', true);
				$styledSelect.closest('.select').siblings('select').find('option:contains("' + $(this).text() + '")').prop('selected', true).change();
				// console.log(selectVal);
				$list.hide();
				//console.log($this.val());
			});

			$(document).click(function () {
				$styledSelect.removeClass('active');
				$list.hide();
			});

		});
	};

	//functions for global map on solution page template

	function setGlobeMarkers($globeMarker) {

		let windowWidth = window.innerWidth;

		if ($globeMarker.length === 0 || typeof $globeMarker === 'undefined' || windowWidth <= 1024) {
			return;
		}

		let numLeftMarkersPosition = [];
		let numRightMarkersPosition = [];

		$globeMarker.each(function () {
			let $this = $(this);
			$this.data('y-position');
			if ($this.hasClass('marker-right')) {
				numRightMarkersPosition.push($this.data('y-position'));
			} else {
				numLeftMarkersPosition.push($this.data('y-position'));
			}
		});
		// numLeftMarkersPosition = numLeftMarkersPosition.sort(sortNumber);
		// numRightMarkersPosition = numRightMarkersPosition.sort(sortNumber);
		setHeightForMarkers(sortMarkersArray(numLeftMarkersPosition));
		setHeightForMarkers(sortMarkersArray(numRightMarkersPosition));
	}

	//sort array from lower to higher
	function sortMarkersArray(arrayToSort) {
		return arrayToSort.sort(sortNumber);
	}

	function sortNumber(a, b) {
		return a - b;
	}

	function setHeightForMarkers(sortedArray) {

		if (typeof sortedArray === 'undefined') {
			return;
		}
		var markersOffset = 0;
		var windowWidth = window.innerWidth;

		sortedArray.forEach(function (el, i) {

			if (i === 0) {
				// markersOffset = numLeftMarkersPosition[i];
				let $prevMarkerElem = $('[data-y-position="' + el + '"]');
				let $prevMarkerParent = $prevMarkerElem.parent();
				// find offset relative to parent block
				let markerOffset = $prevMarkerElem.offset().top - $prevMarkerParent.offset().top;
				//find height of info window block
				let infoWindowHeight = $prevMarkerElem.find('.globe-info-window').outerHeight();
				//set height for global offset var
				markersOffset += markerOffset + infoWindowHeight;

			} else {

				let $currentElem = $('[data-y-position="' + el + '"]');
				let $prevMarkerParent = $currentElem.parent();
				// find offset relative to parent block
				let currentMarkerOffset = $currentElem.offset().top - $prevMarkerParent.offset().top;

				if (markersOffset > currentMarkerOffset) {
					//find offset height
					let offsetForCurrentElem = markersOffset - currentMarkerOffset;
					//set pixelPerfect coefficient offset
					let pixelPerfectCoef = windowWidth > 1400 ? 90 : 35;
					//set offset for current elem
					$currentElem.css('height', offsetForCurrentElem + pixelPerfectCoef);
					//find height of info window block
					let infoWindowHeight = $currentElem.find('.globe-info-window').outerHeight();
					//set height for global offset var
					markersOffset += infoWindowHeight;
				} else {
					//find height of info window block
					let infoWindowHeight = $currentElem.find('.globe-info-window').outerHeight();
					//set height for global offset var
					markersOffset = currentMarkerOffset + infoWindowHeight;
				}
			}
		});
	}

	var setPlaceholderSize = function () {
		let $this = $('.search-icon-placeholder');
		let $objectToCopy = $this.find('.search-form-submit');
		let height = $objectToCopy.outerHeight();
		let width = $objectToCopy.innerWidth();
		$this.css({'height': height, 'width': width});
	};

	//Slider on Mobiles and Tablets
	var slickInitialized = false;

	function responsiveSlider($sliderName, sliderParams) {
		let windowWidth = window.innerWidth;
		if (sliderParams == null) {
			sliderParams = {
				arrows: false,
				dots: true,
				fade: true,
				infinite: false,
				autoplay: true,
				initialSlide: 0,
				speed: 0,
				// centerMode : true,
				slidesToShow: 1,
				slidesToScroll: 1,
				slide: '.slide-item' // Cause trouble with responsive settings
			};
		}
		if (windowWidth <= 640 && !slickInitialized) {
			// let setFirstSlide = false;
			$sliderName
					.on('init reInit', function (event, slick, currentSlide, nextSlide) {
						var i = slick.slideCount ? Math.floor(slick.slideCount / 2) : 0;
						if (slick.slideCount > 2) {
							slick.slickGoTo(i);
						}
						slick.slickSetOption('speed', 500);
					})
					// .on( 'setPosition', function( event, slick ){
					// 	slick.$slides.css( 'height', slick.$slideTrack.height()+'px' );
					// } )
					.slick(sliderParams);
			slickInitialized = true;
		} else if (windowWidth > 640 && slickInitialized) {
			$sliderName.slick('unslick');
			slickInitialized = false;
		}
	}

	// why choose section slider on home page
	var $whyChooseMobileSlider = $('.why-choose-slider-small');
	// case study landing section
	var $caseStudySlider = $('.case-study-landing-slider');

	function stopBodyScrolling(bool) {

		let $this = $('body');
		if (bool === true) {
			$this.addClass('stop-body-scrolling');
		} else {
			$this.removeClass('stop-body-scrolling');
		}
	}

	// check hash and scroll to anchor
	var anchor = function (e) {

		$(function () {
			if (location.hash.length) {

				var target = $('[data-name="' + location.hash.substr(1) + '"]');

				window.scrollTo(0, 0);         // execute it straight away
				setTimeout(function () {
					window.scrollTo(0, 0);     // run it a bit later also for browser compatibility
				}, 1);
				if (!target.length) {
					target = $(location.hash);
				}

				if (target.length) {

					var top = target.offset().top;
					var stickyHeaderoffset = $('.header').outerHeight();

					$('html, body').stop().animate({
						scrollTop: top - stickyHeaderoffset
					}, 1000);

					// $('html,body').animate({
					//     scrollTop: target.offset().top
					// }, 1000);
				}
			}
		});

	};

	function scrollToAnchor(linkAnchor) {

		var $linkAnchor = $(linkAnchor);
		var stickyHeaderoffset = $('.header').outerHeight();

		var id = $linkAnchor.attr('href');
		var $elemScrollTo = $(id);

		if ($elemScrollTo.length) {

			var top = $elemScrollTo.offset().top;
			$('body,html').animate({scrollTop: top - stickyHeaderoffset}, 600);

		} else {
			if (typeof id !== 'undefined') {
				var idWithoutAnchor = id.replace("(.*?)#", "");

				var $elemScrollTo = $('[data-name="' + idWithoutAnchor + '"]');
				if ($elemScrollTo.length) {
					let top = $elemScrollTo.offset().top;
					if ($elemScrollTo.length) {
						$('body,html').animate({scrollTop: top - stickyHeaderoffset}, 600);
					}
				}
			}
		}
	}

	var $menuIcon = $('.menu-icon');

	function closeMenu() {
		stopBodyScrolling(false);
		$('body').removeClass('menu-open');
		$menuIcon.removeClass('is-active');
	}

	$(window).bind('pageshow', function (event) {
		if (event.originalEvent.persisted) {
			// window.location.reload()
			closeMenu();
			window.scrollTo(0, 0);         // execute it straight away
			setTimeout(function () {
				window.scrollTo(0, 0);     // run it a bit later also for browser compatibility
			}, 1);
		}

	});

	function masonryGridUpdate($grid, params) {
		if (!$grid.length) {
			return;
		}
		setTimeout(function () {
			// $grid.masonry( 'reloadItems' );
			$grid.masonry(params);
		}, 300);

	}

	var $locationsGrid = $('.locations-grid');
	var locationsGridParams = {
		// set itemSelector so .grid-sizer is not used in layout
		itemSelector: '.marker-info-window',
		// use element for option
		columnWidth: '.marker-info-window',
		isFitWidth: true,
		gutter: 20,
		horizontalOrder: true,
		transitionDuration: '0.2s',
		percentPosition: true
	};

	// Send command to iframe youtube player
	function postMessageToPlayer(player, command) {
		if (player == null || command == null) return;
		player.contentWindow.postMessage(JSON.stringify(command), "*");
	}

	//Save Cookie on close button
	function setCookie(cookieName, cookieValue, nDays) {
		var today = new Date();
		var expire = new Date();

		if (!nDays)
			nDays = 1;

		expire.setTime(today.getTime() + 3600000 * 24 * nDays);
		document.cookie = cookieName + "=" + encodeURI(cookieValue) + ";expires=" + expire.toGMTString() + "; path=/";
	}

	// Scripts which runs after DOM load

	$(document).ready(function () {

		$('body').on('click', ".js-disclaimer-btn", function (e) {

			e.preventDefault();

			var $self = $(this);
			var cookieCompliance = $self.attr('data-cookie');

			$('.disclaimer').fadeOut('slow');

			setCookie('cookie_compliance', cookieCompliance, 1);

		});

		//Scroll to Top button

		$('.scroll-to-top').click(function () {
			$('html, body').animate({scrollTop: 0}, 1000);
			$(this).blur();
		});


		// case study landing slider
		if ($caseStudySlider.length) {
			responsiveSlider($caseStudySlider);
		}

		// why choose section on home page mobile slider
		if ($whyChooseMobileSlider.length) {
			responsiveSlider($whyChooseMobileSlider);
		}

		$('header').on('click', '.menu-icon', function () {
			let $this = $(this);
			if (!$this.hasClass('is-active')) {
				stopBodyScrolling(true);
				$('body').addClass('menu-open');
				$this.addClass('is-active');
			} else {
				closeMenu();
			}
		});

		// set size for search placeholder container
		setPlaceholderSize();

		$('.searchForm').on('click', '.searchAnimateBtn', function (e) {

			let $this = $(this);
			let $form = $this.parent();
			let $popUp = $form.siblings('.search-pop-up');
			let windowWidth = window.innerWidth;

			if (!$popUp.hasClass('pop-up--visible')) {

				e.preventDefault();
				$this.blur();

				let topOffset = $this.offset().top + $this.outerHeight() / 2 - $(window).scrollTop();
				let leftOffset = $this.offset().left + $this.innerWidth() / 2;

				$form.attr({
					'data-width': $form.width(),
					'data-left-position': leftOffset,
					'data-top-position': topOffset
				});

				$form.css({
					position: 'fixed',
					'left': leftOffset,
					'top': topOffset,
				});

				$form.animate({
					'width': windowWidth > 1300 ? '1260' : windowWidth * 0.7,
					'left': '50%',
					'top': '50%',
					// 'transform' : 'translate( -50%, -50% )'
				}, 600, 'linear', function () {
					$popUp.addClass('pop-up--visible');
					$form.find('input[type=\"search\"]').focus();
				});

			}

		});

		$('.searchFormPopUp').on('click', ".pop-up-close", function () {

			let $searchForm = $('.searchForm');
			let leftPosition = $searchForm.attr('data-left-position');
			let topPosition = $searchForm.attr('data-top-position');
			let width = $searchForm.attr('data-width');

			$searchForm.animate({
				'width': width,
				'left': leftPosition,
				'top': topPosition
			}, 600, 'swing', function () {
				$(this).css({
					'position': '',
					'left': '',
					'top': ''
				});
			});
		});

		//masonry Columns for locations Archive page
		if ($locationsGrid.length) {
			$locationsGrid.masonry(locationsGridParams);
		}

		styledSelect();

		//load more works on home page
		let $loadMorePosts = $('#loadmore-posts');

		if ($loadMorePosts.length) {
			$loadMorePosts.on('click', function () {
				let $this = $(this);
				if ($this.hasClass('is-loading')) return;

				$this.addClass('is-loading');
				$this.text('Loading...');
				//vars
				let work_posts = $('.posts-container').attr('data-posts');
				let max_pages = $this.data('max-pages');
				let current_page = parseInt($this.attr('data-current-page'));
				let data = {
					'action': 'loadmore_posts',
					'query': work_posts,
					'page': current_page,
					'nonce': myajax.nonce
				};
				$.ajax({
					url: myajax.url,
					data: data,
					type: 'POST',
					success: function (data) {
						if (data) {

							$this.text('load more');

							$('.posts-loop > .columns:last-child').after(data);

							let after_ajax_pages = current_page + 1;
							$this.attr('data-current-page', after_ajax_pages);

							if (after_ajax_pages == max_pages) $this.parent().remove();

						} else {
							$this.parent().remove();
						}
					}
				}).always(function () {
					$this.removeClass('is-loading');
				});
			});
		}
		//anchor's
		// var $anchors = 'a[href^="#"]';
		//
		// $( 'body' ).on( "click", $anchors, function( event ){
		//
		// 	event.preventDefault();
		//
		// 	var $this = $( this );
		//
		// 	scrollToAnchor( $this );
		//
		// 	$this.blur();
		//
		// } );

		// $( 'body' ).on( "click", 'a', function( e ){
		//
		// 	var $this = $( this );
		// 	var href = $this.attr( 'href' );
		//
		// 	if( href.indexOf( window.location.href ) > -1 ){
		// 		/* do not run AJAX function */
		// 		console.log( href.indexOf( window.location.href ) );
		// 	}else{
		//
		// 	}
		//
		// });

		$('body').on('click', 'a', function (event) {

			var $this = $(this);

			if (this.pathname == window.location.pathname &&
					this.protocol == window.location.protocol &&
					this.host == window.location.host) {

				event.preventDefault();

				let stickyHeaderoffset = $('.header').outerHeight();

				let id = $this.attr('href');
				let hash = id.substring(id.indexOf("#") + 1);
				let $elemScrollTo = $('#' + hash);

				if ($elemScrollTo.length) {

					let top = $elemScrollTo.offset().top;
					$('body,html').animate({scrollTop: top - stickyHeaderoffset}, 600);

				} else {

					let idWithoutAnchor = hash.replace("#", "");

					let $elemScrollTo = $('[data-name="' + idWithoutAnchor + '"]');

					if ($elemScrollTo.length) {
						let top = $elemScrollTo.offset().top;
						if ($elemScrollTo.length) {
							$('body,html').animate({scrollTop: top - stickyHeaderoffset}, 600);
						}
					}

				}

			} else {

			}

		});


		//Get video from media library
		$('.video-item').on('click', '.video-button', function () {
			$(this).siblings('.video-link').click();
		}).on('click', '.video-link', function (e) {
			e.preventDefault();
			if (this.hasAttribute("href")) {
				var $this = jQuery(this);
				var video_link = $this.attr("href");
				var video_type = $this.attr("data-video-type");
				jQuery.ajax({
					type: "post",
					url: myajax.url,
					data: {
						action: 'get_video_by_link',
						video_link: video_link,
						video_type: video_type,
						nonce: myajax.nonce
					},
					success: function (response) {

						if (response.length) {
							$this.removeAttr('href');
							$this.siblings('.video-button').remove();
							$this.find('.video-banner').remove();
							$this.append(response);
							// $this.find('.video-media')[0].play();
							var $video = $this.find('.video-media');
							if (video_type === 'external') {
								setTimeout(function () {
									postMessageToPlayer($video[0], {
										"event": "command",
										"func": "playVideo"
									});
								}, 1000);
							} else if (video_type === 'media-library') {
								$video[0].play();
							}
						} else {
							alert("Your video couldn't open, please check later");
						}

					}
				});
			}
		});

		//sticky header
		stickyHeader($stickyHeader);

		//pop-up functions
		var $trackTracePopUp = $('.track-trace-pop-up');
		var $searchPopUp = $('.search-pop-up');
		// close pop-up
		$('html, body').on('click', ".pop-up-close", function () {

			let $self = $(this);

			$self.parent().removeClass('pop-up--visible');
			stopBodyScrolling(false);

		});

		$('.track-trace-button').on('click', function () {

			$trackTracePopUp.toggleClass('pop-up--visible');
			stopBodyScrolling(true);
			$('body').removeClass('menu-open');
			$('.menu-icon').removeClass('is-active');

		});

		$('.search-icon-wrapper .search-icon').on('click', function () {

			$searchPopUp.toggleClass('pop-up--visible');
			stopBodyScrolling(true);
			$('body').removeClass('menu-open');
			$('.menu-icon').removeClass('is-active');

		});


		$(document).on("click touch touchend", function (e) {
			if ($(e.target).is(".track-trace-button") === false && $trackTracePopUp.length) {
				if (!$(e.target).closest('#track-trace').length) {
					if ($trackTracePopUp.is(":visible")) {
						$trackTracePopUp.removeClass('pop-up--visible');
						//stopBodyScrolling( false );
						//$( 'html, body' ).removeClass( 'menu-open' );
					}
				}
			}
			var maintenancePopUp = $('.js-maintenance-pop-up');
			if (maintenancePopUp.length) {
				if (!$(e.target).closest('.js-maintenance-pop-up').length) {
					if (maintenancePopUp.is(":visible")) {
						maintenancePopUp.removeClass('pop-up--visible');
					}
				}
			}
		});

		//Remove placeholder on click
		$('input, textarea').each(function () {
			$(this).data('holder', $(this).attr('placeholder'));

			$(this).focusin(function () {
				$(this).attr('placeholder', '');
			});

			$(this).focusout(function () {
				$(this).attr('placeholder', $(this).data('holder'));
			});
		});

		//Make elements equal height
		$('.matchHeight').matchHeight();

		$('.solution-matchHeight .solution-title').matchHeight();

		$('.solution-matchHeight').matchHeight({
			byRow: false
		});

		$('.benefit-matchHeight .benefit-inner').matchHeight();

		$('.benefit-matchHeight .benefit-title').matchHeight();

		$('.benefit-matchHeight').matchHeight();

		$('.post-matchHeight').matchHeight();

		// $( '.advantage-matchHeight' ).matchHeight({
		// 	byRow: false
		// });

		$('.management-item-matchHeight').matchHeight({
			byRow: false
		});


		// Add fancybox to images
		$('.gallery-item a').attr('rel', 'gallery').attr('data-fancybox', 'gallery');
		$('a[rel*="album"], .gallery-item a, .fancybox, a[href$="jpg"], a[href$="png"], a[href$="gif"]').fancybox({
			minHeight: 0,
			helpers: {
				overlay: {
					locked: false
				}
			}
		});

		// Sticky footer
		$('.footer').find('img').one('load', function () {
			bumpIt();
		}).each(function () {
			if (this.complete) {
				$(this).load();
			}
		});

		// Slick sliders goes here
		// Solution slider on home page
		$('.home-solutions-slider').slick({
			slidesToScroll: 1,
			arrows: false,
			autoplay: false,
			dots: false,
			pauseOnHover: false,
			pauseOnFocus: false,
			infinite: false,
			variableWidth: true,
			swipe: false,
			responsive: [
				{
					breakpoint: 1500,
					settings: {
						swipe: true,
						arrows: true,
						infinite: false
					}
				}
			]
			// You can unslick at a given breakpoint now by adding:
			// settings: "unslick"
			// instead of a settings object

		}).on('init', function (event, slick) {
			$.fn.matchHeight._update('.solution-matchHeight .solution-title');
			$.fn.matchHeight._update('.solution-matchHeight');
		});

		// Home News slider
		$('.home-news-slider').slick({
			slidesToScroll: 1,
			arrows: true,
			autoplay: false,
			dots: false,
			pauseOnHover: false,
			pauseOnFocus: false,
			infinite: true,
			variableWidth: true
		}).on('init', function (event, slick) {

		});

		// Management slider on about page template
		$('.management-slider').slick({
			slidesToScroll: 1,
			arrows: true,
			autoplay: false,
			dots: false,
			pauseOnHover: false,
			pauseOnFocus: false,
			infinite: true,
			variableWidth: true,
			responsive: [
				{
					breakpoint: 640,
					settings: {
						slidesToShow: 1,
						variableWidth: false
					}
				}
			]
		}).on('init', function (event, slick) {
			// if( window.innerWidth >= 641 ){
			setTimeout(function () {
				$.fn.matchHeight._update('.management-item-matchHeight');
			}, 500);
			// }
		});

		// Awards sliders on about page template
		$('.awards-year-slider').slick({
			slidesToScroll: 1,
			asNavFor: '.awards-content-slider',
			dots: false,
			variableWidth: true,
			focusOnSelect: true,
			infinite: false,
		});

		$('.awards-content-slider').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			fade: true,
			swipe: false,
			infinite: false,
			asNavFor: '.awards-year-slider',
		});

		//remove active class from all thumbnail slides
		$('.awards-year-slider .slick-slide').removeClass('slick-active');

		//set active class to first thumbnail slides
		$('.awards-year-slider .slick-slide').eq(0).addClass('slick-active');

		// On before slide change match active thumbnail to current slide
		$('.awards-content-slider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
			var mySlideNumber = nextSlide;
			$('.awards-year-slider .slick-slide').removeClass('slick-active');
			$('.awards-year-slider .slick-slide').eq(mySlideNumber).addClass('slick-active');
		});

		//UPDATED

		// $('.slider').on('afterChange', function(event, slick, currentSlide){
		// 	$('.content').hide();
		// 	$('.content[data-id=' + (currentSlide + 1) + ']').show();
		// });

		var $gravityForm = $('.gform_wrapper');
		if ($gravityForm.length) {
			jQuery(document).bind('gform_post_render', function () {

				// Custom select
				//styledSelect();

			});
		}

		/**
		 * Scroll to Gravity Form confirmation message after form submit
		 */
		$(document).bind('gform_confirmation_loaded', function (event, formId) {
			var $target = $('#gform_confirmation_wrapper_' + formId);

			if ($target.length) {
				$('html, body').animate({
					scrollTop: $target.offset().top - 25
				}, 500);

				return false;
			}
		});

		resizeVideo();


	});


	// Scripts which runs after all elements load

	$(window).on('load', function () {

		let $globeMarker = $('.globe-marker-square');
		setGlobeMarkers($globeMarker);

		//jQuery code goes here
		if ($('.preloader').length) {
			$('.preloader').addClass('preloader--hidden');
		}

		if ($('body').hasClass('page-template-template-about')) {
			AOS.init({
				offset: -200,
			});
		} else {
			AOS.init();
		}


		// check hash and scroll to anchor
		anchor();


	});

	// Scripts which runs at window resize

	$(window).resize(function () {

		masonryGridUpdate($locationsGrid, locationsGridParams);

		// case study landing slider
		if ($caseStudySlider.length) {
			responsiveSlider($caseStudySlider);
		}
		// why choose section on home page mobile slider
		if ($whyChooseMobileSlider) {
			responsiveSlider($whyChooseMobileSlider);
		}

		let $globeMarker = $('.globe-marker-square');
		setGlobeMarkers($globeMarker);

		//jQuery code goes here

		resizeVideo();

	});

	$(window).on('orientationchange', function (event) {
		// fix bug on change mobile  masonry grid turn down
		masonryGridUpdate($locationsGrid, locationsGridParams);

		bumpIt();
	});

	// Scripts which runs at window scroll

	$(window).on('scroll', function () {

		//sticky header
		stickyHeader($stickyHeader);

		//float parallax items
		requestAnimationFrame(parallaxContent);

	});

}(jQuery));
