var core = {
	
	init : function() {
		
		self = this;
		
		if (Modernizr.touch) {
			$("#search").addClass("ipad");
		}
		
		$(".dd").click(function(e) {
			
			e.stopPropagation();
			
			var $this = $(this);
			
			$(".submenu").each(function() {
				var $submenu = $(this);
				$submenu.hide();
				if(!$submenu.parent().hasClass("selected")) {
					$submenu.parent().removeClass("active");
				}
			});
			
			var $submenu = $this.find("ul:first").parent();
			
			if ($this.parents(".primary").length == 0) {
				$("#toggle-primary").removeClass("active");
				$(".primary").removeClass("active");

				if ($this.hasClass("active")) {
					$this.removeClass("active");
					$submenu.hide();

					return;
				}

			}
			
			$this.addClass("active");
			$submenu.show();
			
		});
		
		$(document).on("click", "#toggle-primary, .primary", function(e) {
			
			e.stopPropagation();

			$(".dd").removeClass("active");
			$(".submenu").hide();
			$(this).toggleClass("active");
			$(".primary").toggleClass("active");
			
		});
		
		$(document).on("click", function(e) {
			var $this = $(this);
			
			$this.find(".submenu").each(function() {
				var $submenu = $(this);
				if($submenu.find("ul li.active").length == 0) {
					$submenu.parent().removeClass("active");
				}
			});
			
			$(".submenu").hide();
		});
		
		$(".contentitem:not(:has(section))").each(function() {
			$(this).addClass("no-sections");
		});
		
	}
}

$(document).ready(function() {
	core.init();
});