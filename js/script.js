var cookbook = {
	bacon1: {
		sausage2: [
			{
				recipeName: "The Swanson Breakfast",
				ingredients: "Ingredients needed: bacon, sausage, eggs, pancakes.",
				picture: "img/meals/the-swanson-breakfast.jpg",
				quote: "Just give me all of the bacon and eggs you have.",
				quoteAudio: "audio/the-swanson-breakfast.mp3"
			},
			{
				recipeName: "Bacon-Wrapped Hot Dog",
				ingredients: "Ingredients needed: bacon, sausage, bun.",
				picture: "img/meals/bacon-wrapped-hot-dog.jpg",
				quote: null,
				quoteAudio: "audio/silence.mp3"
			}
		],  // End of "sausage2" array (and recipe objects contained within)
		shrimp2: [
			{
				recipeName: "Bacon-Wrapped Shrimp",
				ingredients: "Ingredients needed: bacon and shrimp (be sure to eat around the shrubbery).",
				picture: "img/meals/bacon-wrapped shrimp.jpg",
				quote: "It's my number 1 favorite food, wrapped around my number 3 favorite food.",
				quoteAudio: "audio/bacon-wrapped-shrimp.mp3"
			}
		],  // End of "shrimp2" array (and recipe objects contained within)
		turkeyLeg2: [
			{
				recipeName: "The Swanson",
				ingredients: "Ingredients needed: bacon, turkey leg.",
				picture: "img/meals/the-swanson-turkey-leg.jpg",
				quote: "They call it a Swanson.",
				quoteAudio: "audio/the-swanson-turkey-leg.mp3"
			}
		]  // End of "turkeyLeg2" array (and recipe objects contained within)
	}, // End of "bacon1" object
	groundBeef1: {
		bacon2: [
			{
				recipeName: "Bacon-Grilled Cheeseburger",
				ingredients: "Ingredients needed: ground beef, bacon, bun, cheese.",
				picture: "img/meals/bacon-cheeseburger.jpg",
				quote: null,
				quoteAudio: "audio/silence.mp3"
			},
			{
				recipeName: "Bacon-Wrapped Meatloaf",
				ingredients: "Ingredients needed: ground beef, bacon, eggs.",
				picture: "img/meals/bacon-wrapped-meatloaf.jpg",
				quote: null,
				quoteAudio: "audio/silence.mp3"
			}
		],  // End of "bacon2" array (and recipe objects contained within)
		tbSteak2: [
			{
				recipeName: "Meat Tornado Burrito",
				ingredients: "Ingredients needed: ground beef, steak, chorizo, pulled pork, cheese.",
				picture: "img/meals/meat-tornado-burrito.jpg",
				quote: "You had me at Meat Tornado.",
				quoteAudio: "audio/meat-tornado-burrito.mp3"
			}
		]  // End of "tbSteak2" array (and recipe objects contained within)
	}, // End of "groundBeef1" object
	phSteak1: {
		tbSteak2: [
			{
				recipeName: "Steak and Whiskey Pot Pie",
				ingredients: "Ingredients needed: porterhouse steak, t-bone steak, pie shell, Lagavulin whiskey.",
				picture: "img/meals/steak-and-whiskey-pot-pie.jpg",
				quote: null,
				quoteAudio: "audio/silence.mp3"
			},
			{
				recipeName: "Turf and Turf",
				ingredients: "Ingredients needed: porterhouse steak, t-bone steak.",
				picture: "img/meals/turf-and-turf.jpg",
				quote: "I call this Turf and Turf: it's a 16 ounce t-bone and a 24 ounce porterhouse.",
				quoteAudio: "audio/turf-and-turf.mp3"
			}
		] // End of "tbSteak2" array (and recipe objects contained within)
	} // End of "phSteak1" object
} // End of "cookbook" object
// Document-ready

$(function() {
	// Declare key variables
	var userChoice1 = "";
	var userChoice2 = "";
	var meatQualifier = "";
	var recipeOptions = "";
	var suggestedRecipe = "";

	// When the user clicks #start-btn ("I'm Hungry")...
	$("#start-btn").on("click", function() {
		
		// Get current width of viewport
		var intViewportWidth = window.innerWidth;
		// If less than 1080px, slide-right small Ron Swanson
		if(intViewportWidth <= 1080) {
			$(".ron-swanson figure").css("right", "-100%");
		}

		// Fade and hide quote
		$(this).fadeTo(200, 0, function() {
			$(this).hide();
		});
		// Fade and hide #start-btn
		$(".page-quote, .quote-source").fadeTo(200, 0, function() {
			$(".page-quote, .quote-source").hide();
			// Show #step1 (first set of options)
			$("#step1").show();
			$("#step1").fadeTo(200, 1);
		});
	});

	// The carrot is an invalid option (i.e. it is not a part of the dataset)
	// When the user clicks on it...
	$("#carrot1").on("click", function() {
		// Play the "there's been a mistake" audio file
		$("#vegetable-quote").get(0).play();
		// Clear the "checked" state of #carrot1
		this.checked = false;
		// Clear "checked" states on the first and second sets of options, and remove colour
		$("input[name=option1]").attr("checked", false);
		$("input[name=option2]").attr("checked", false);
		$("#step1Options label").removeClass("user-selected");
		$("#step2Options label").removeClass("user-selected");
		// Reset both userChoice1 and userChoice2 variables to empty strings
		userChoice1 = "";
		userChoice2 = "";
		// If #step2 and #step3 are showing, re-hide them
		$("#step2").hide();
		$("#step3").hide();
	});

	// When the user chooses a valid first meat option...
	$("input[name=option1]").on("click", function() {
		// Update userChoice1 to store the value of the user's answer
		userChoice1 = $("input[name=option1]:checked").val();


		$("#step1Options label").removeClass("user-selected");
		$("label[for=" + userChoice1 + "]").addClass("user-selected");


		// Update meatQualifier by passing the userChoice1 value into the cookbook
		meatQualifier = cookbook[userChoice1];
		// If the user changes their first choice of meat option...
		// Hide all labels within #step2Options
		$("#step2Options label").hide();
		$("#step2Options label").removeClass("user-selected");
		// Clear userChoice2 variable and uncheck it
		$("input[name=option2]:checked").attr("checked", false);
		userChoice2 = "";

		// If the user has selected a valid first meat option...
		if ($("input[name=option1]:checked")) {
			// Use meatQualifier to determine valid secondary meat options
			for (meat in meatQualifier) {
				// var valid2ndOptions = meatQualifier[meat];
				// Display the individual meat items that are found
				$("label[for="+meat+"]").css("display", "inline-block");
			};
		};
		
		// Show #step2 (second group of meat options)
		$("#step2").show();
		$("#step2").fadeTo(200, 1);
	});

	// When the user chooses a second meat option...
	$("input[name=option2").on("click", function() {
		// Update userChoice2 to store the value of the user's answer
		userChoice2 = $("input[name=option2]:checked").val();


		$("#step2Options label").removeClass("user-selected");
		$("label[for=" + userChoice2 + "]").addClass("user-selected");


		// Show #step3 (div containing form submit button)
		// Show #step1 (first set of options)
		$("#step3").show();
		$("#step3").fadeTo(200, 1);
	});

	// When the user submits the form by clicking #cook-btn ("Start The Grill")...
	$("#cook-btn").on("click", function(event) {
		// Prevent the default form submit behaviour (page reload)
		event.preventDefault();
		// Update recipeOptions by passing both userChoice1 and userChoice 2 values into the cookbook
		var recipeOptions = cookbook[userChoice1][userChoice2];
		// Generate a random number
		var randomNumber = Math.floor(Math.random() * recipeOptions.length);
		// Use the random number to randomly select an object from recipeOptions
		var suggestedRecipe = recipeOptions[randomNumber];
		// Hide the previous #step1 #step2 #step3 sections
		$("#step1, #step2, #step3").hide();
		// $("#step2").hide();
		// $("#step3").hide();
		// Show #recipeSection
		$("#recipeSection").show();
		$("#recipeSection").fadeTo(500, 1);
		// Update #recipeSection with the content from suggestedRecipe
		$("#recipeSection h2").html(suggestedRecipe.recipeName);
		$("#recipeSection blockquote").html(suggestedRecipe.quote);
		$("#recipeSection p").html(suggestedRecipe.ingredients);
		$("#recipeSection img").attr("src", suggestedRecipe.picture);
		$("#recipeSection audio").attr("src", suggestedRecipe.quoteAudio);
		$("#recipeSection audio").get(0).play();
	});

	// When the user clicks #reset-btn ("I'm Still Hungry")...
	$("#reset-btn").on("click", function() {
		// Clear the user's previous selections
		$("input[name=option1]").attr("checked", false);
		$("input[name=option2]").attr("checked", false);
		$("#step1Options label").removeClass("user-selected");
		$("#step2Options label").removeClass("user-selected");
		$("#recipeSection img").attr("src", "");
		// Reset the important variables to empty strings
		userChoice1 = "";
		userChoice2 = "";
		recipeOptions = "";
		suggestedRecipe = "";
		// Hide #recipeSection
		$("#recipeSection").hide();
		// Show #step1
		$("#step1").show()
	});
});