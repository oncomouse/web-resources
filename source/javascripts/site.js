var do_not_pluralize = [
	'typography',
	'css'
]
$(document).ready(function() {
	// Create the master Isotope container variable:
	var $container = $('#resources');
	
	// Load underscore.string into _:
	_.mixin(s.exports());
	
	// Build a list of filters:
	var filters = [];
	$('.resource').each(function() {
		var $this = $(this);
		filters = _.union(_.without($this.attr('class').split(/ /), 'resource'), filters);
	});
	
	// Generate links to control isotope's filtering code:
	_.each(filters, function(element, index, list) {
		var element_title = _.titleize(_.humanize(element));
		if(!_.contains(do_not_pluralize,element)) {
			element_title = _.pluralize(element_title);
		}
		$('#filters').append($('<a href="#' + element + '" class="list-group-item" data-filter=".' + element + '">'+ element_title + '</a>'));
	});
	
	// Set up filter behavior:
	$('#filters .list-group-item').on( 'click', function() {
		var filterValue = $(this).attr('data-filter');
		$('.list-group .active').toggleClass('active');
		$(this).toggleClass('active');
		$('#current-filter').html($('.list-group .active').html());
		$container.isotope({ filter: filterValue });

	});
	
	var initial_filter = ((window.location.hash == '') ? '' : window.location.hash.replace('#','.'));
	if(initial_filter != '') {
		$('.list-group .active').toggleClass('active');
		$('#filters .list-group-item[data-filter*="'+initial_filter+'"]').toggleClass('active');
		$('#current-filter').html($('.list-group .active').html());
	}
	
	$container.isotope({
		itemSelector: '.resource',
		layoutMode: 'vertical',
		getSortData: {
			name: '.title'
		},
		filter: initial_filter
	});
});