#assignment05

Introduction
This repo is a learning exercise in setting up a full MEAN stack application for 
a fictional clothing store called Attire


1. Prerequisites
	This application requires Node Package Manager
	Node can be installed from https://nodejs.org/en/
	Install Node before continuing

	This application requires Gulp to be installed globally
	Gulp can be installed using node package manager. At a command prompt type:
	npm install gulp -g


2. Downloading the Source Code
	Clone this repository to a local folder called attire
	This can be done from GitHub using the Clone to Desktop option or from the command prompt type
	
	git clone https://githib.com/ah903/assignment05.git attire


3. Installing Dependencies
	Open a command prompt and change to the newly created attire folder
	At the command prompt type:
	
	npm install

	This will install all dependent files

4. Building the Source Code
	Open a command prompt and change to the newly created attire folder
	At the command prompt type:
	
	gulp devbuild

5. Running the application
	At the command prompt type
	NODE_ENV=DEV node ./bin/www

	The server should echo back current configuration and begin waiting for connections

6. Browsing to the application
	Open a web browser
	Navigate to localhost:3000
	The application will open

7. A note on browser sync
	The application may also be launched in a live reload mode where changes to the source
	files are reflected in the browser without manual intervention

	To use Browser Syncronisation instead of step 6 at the command prompt type
	gulp synchronise

	The browser will launch in reload mode
	A toast is displayed in the top right of the screen indicating browser synch is active
	The same page is served by thorugh the synchronisation proxy configured to serve from 
	port 7000
	


