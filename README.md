#Place Search Website 

This Project Focuses on helping visitors finding their next holiday place by providing
a worldwide range of locations and relevant information about each place selected

I have written this project in HTML, CSS,Javascript and i have used bootstrap mainly for scalability (yet i have used some of their features to style my page).

# TECH USED

HTML
	- hmtl has been used to create markup
CSS
	- css has been used to style my content
Javascript 
	- i have used javascript to write pretty much all functionality of this project 
BOOTSTRAP
	- Bootstrap has been used for resposiveness and help style some elements 
Google Places API
	- Used to acces the map and retrieve relevant information for this project 
GIT / GITHUB /GITHUB-pages
	- used for version controll, code backup and deployment

#Validators
	- HTML 
		The Code Passes Trough (https://validator.w3.org/#validate_by_input) w3schools validator
		 with no errors 
	- CSS
		The code passes trough (https://jigsaw.w3.org/css-validator/validator) w3schools validator
		 With No Errors
	- JAVASCRIPT
		The Code passes trough (http://esprima.org/demo/validate.html) with no mistakes and/or errors
# UX

This Website is for anyone looking to gather information about places 

- as a visitor i would like a world map 
- as a visitor i would like to choose which location i want to see
- as a visitor i would like to select places relevant to my next holiday (accomodation, travel, touristic attractions, food , drink ,)
- as a visitor i wold like information about those places (address, website , rating , open times, telephone number )
- as a visitor i would like to have street view option
- as a visitor i would like to be able to controll the map (zoom,drag,select)


# Features

	- This is a simple one-page aplication with the following features

	/ World map 
	/ location(city,town,village) search functionality with autocomplete 
	/ ability to browse trough options and select the type of place user are looking for 
	/ custom markers for each place type
	/ on user selection(click marker or item from list) display relevant information about a specific place 
	/ map controlls (zoom,drag,select)
	/ 360* street view (where such option is available(some remote locations do not have this feature yet implemented))
	/ ability to open a certain place in google maps (click on place name in the infowindow)
	/ different map themes (Map , Satellite)
	/ full screen map option 


# Features Left To Implement
	/ None

# TESTING

- Extensive testing has been carried out at time of implementation for each new piece of functionality
- testing has been carried out on all major browsers and some mobile devices
- usability test have been carried out by friends and family 
- the website renders accordingly on all screen sizes down to 210px

#  Testing 
	/ place search functionality works as intended returning accurate place name predictions 
	/ place type functionality works as intended returning accurate results
	/ custom markers provide a clear visual differentiation between place types
	/ infowindow provides the user with accurate relevant information about a specific place (when such informaion is available)
	/ map controlls work as intended both on desktop and mobile (full screen map is required on mobile devices in order to receive a more accurate user experience)
	/ 360* View works as intended (mobile devices will provide a beter experience as the map will use device's auto-rotate feature)
	/ different map themes work as intended providing end-user different view options
1 Open index.html 
 search options and map will appear 
 
2 insert city 
2.1 if the user does not select a search type no results will be displayed , the user can still use other features like map controlls and 360* view and can select places provided by google maps (custom infowindow will not be displayed).

3 select search type 
3.1 if no city has been inserted a notification window will appear informing the user that a city must be inserted
3.2 if city has been provided this request will return markers for selected option within the viewport of the map and a list of found places (on mobile devices the list will not be visible)
3.3 if the user decides to browse the map in the vicinity of selected city the sistem will not update results (place type must be selected again)

4 results 
4.1 if no place has been found at the address a notification window will appear informing the user.
4.2 if the search will return results they will be placed on the map (a custom marker will pin-point location ) and a list of results will be displayed (desktop only )
4.3 when user clicks on location (either from list or map marker) an infowindow will be displayed presenting relevant information (this window can be closed by pressing (x) from top left corner)

5 map controlls 
5.1 the user has full controll over the map (drag, zoom , difeerent map types, street view, full screen)
all map controlls work as inteded!

# UI

 The design of this website has been made to provide users with a fun interactive and non-intrusive way to explore places around the world 
 Choosen Color-theme provides the user the ability to focus on the 3 main pieces of functionality (Map , Search Options and result list)
 
	
# Deployment

-This project's code has been handled by git and then hosted by github followed by deployment on github-pages


-The repository can be found on github at  (https://github.com/toderas/places-api)

-This project has been deployed trough github-pages and can be found at  (https://toderas.github.io/places-api/)
Api Key has been restricted to this link !!!!!!

##### Acknowledgements ####

	# IMPORTANT # Base code for this project has been imported from google official documentation which can be found at ("https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete-hotelsearch") 
and modified to suit this project's requirements 


	/ stackoverflow - for code related issues 
	/ w3schools for inspiration and code related issues 
	/ friends and family for usability tests 
	/ google api documentation for helpining me to understand how it works 
	/ Antonija Šimic (Mentor) for her continuous support and patience troughout this project!



