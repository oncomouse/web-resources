function toggleFilterDisplay(old_selector, new_selector) {
	$(old_selector).removeClass('active');
	$(new_selector).addClass('active');
	$('#current-filter').html($(new_selector).html());
}

$(document).ready(function() {
	$('html').toggleClass('no-js js');
	// Create the master Isotope container variable:
	var $container = $('#resources');
	
	// Build a list of filters:
	var filters = [];
	$('.resource').each(function() {
		var $this = $(this);
		filters = _.union(_.without($this.attr('class').split(/ /), 'resource'), filters);
	});
	
	// Generate links to control isotope's filtering code:
	_.each(filters, function(element, index, list) {
		var element_title = _.startCase(element);
		if(!_.contains(filter_config['do-not-pluralize'],element)) {
			element_title = _.pluralize(element_title);
		}
		if(_.contains(filter_config['to-uppercase'], element)) {
			element_title = element.toUpperCase();
		}
		$('#filters').append($('<a href="#' + element + '" class="list-group-item" data-filter=".' + element + '">'+ element_title + '</a>'));
	});
	
	// Set up filter behavior:
	$('#filters .list-group-item').on( 'click', function() {
		var filterValue = $(this).attr('data-filter');
		toggleFilterDisplay('.list-group .active', this);
		$container.isotope({ filter: filterValue });

	});
	
	var initial_filter = ((window.location.hash == '') ? '' : window.location.hash.replace('#','.'));
	if(initial_filter != '') {
		toggleFilterDisplay('.list-group .active', '#filters .list-group-item[data-filter*="'+initial_filter+'"]');
	}
	$.when(
		$container.isotope({
			itemSelector: '.resource',
			layoutMode: 'vertical',
			getSortData: {
				name: '.title'
			},
			sortBy: 'name',
			filter: initial_filter
		})
	).then(function() {
		//$('.resource, #sidebar').animate({'opacity': 1.0}, 100);
		$('body').addClass('isotoped');
	});
});