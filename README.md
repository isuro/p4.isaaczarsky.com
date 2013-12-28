Scrapper
========

Description
---

[Wikipedia] informs us that scrapbooking hobbyists refer to themselves as Scrappers.

Scrapper is a good bit more complicated than anything I've ever built before. The idea was initially to make a Instapaper/Readability/Pocket clone, but with just a bit of Twitter in it. Basically, it's a semi-social bookmarking service. A user makes an account, and can immediately start saving links and following other people. It's quite intentionally designed to be very bare-bones, although there are certainly more features that could and/or should be added. Scrapper's big thing is that it tries very hard to figure out what type of content a URL represents, and it tries to display that content usefully. This is where it diverges from other link saving services: it's not just for articles. Scrapper can parse images, audio files, video files, and PDFs, in addition to HTML pages. Media is displayed using HTML5-based players, all of which have Flash fallbacks.

In order to figure out precisely what type of content it's being presented with, Scrapper uses a combination of HEAD requests and good old-fashioned extension parsing. Broad typing is performed by parsing the Content-Type entry in a header, with file extensions providing greater specificity. For articles, Scrapper provides a simple reading view, with hand-made JavaScript controls to modify size, margins, spacing, color, and font. With the exception of the post view, all of Scrapper's styling is vanilla [Bootstrap], as visual identity hasn't been the focus of the exercise thus far for me. The underlying account system was copied over from my [P2], but not without extensive modification for posts being files rather than just text strings.

I also spent a great deal of time learning the technology that I put into this. My GitHub history may seem rather compressed, but that's because the design and prototyping phase went on for quite a while. I taught myself AJAX and learned a great deal about how websites can talk to each other, both between two servers between a server and a client.

Feature List
---
* Bookmarking service
* Ability to follow other users
* Data type detection
	* HEAD requests and parsing
* Custom content views
	* Videos
	* Audio
	* Images
	* Articles
	* YouTube or Vimeo links
* Extensive custom scripts
	* Text manipulation
	* DOM manipulation and injection
	* JSON parsing
* Readability integration via API
	* GET requests
	* Accessed and parsed via PHP and jQuery (using JSONp)
	* API calls use Readability dev account
* Ability to add a new post from any screen via modal (imported from P2, with modification)
	* HTTP status code response parsing


JavaScript Usage
---
Every time a post view is loaded, JavaScript is in charge of figuring out how to display it best. There's a bevy of scripts, starting with a master 'switch' statement, through which the logic flows. JS also controls the interactive buttons in the toolbar in post views. There is one other script, imported from P2, which prevents a post from being submitted if its length is 0. I wrote every one of these scripts from scratch myself.

The only scripts I didn't write personally are the ones for the audio and video players, [Video.js] and [audio.js], and the Bootstrap and jQuery UI scripts that enable things like modal popovers.

Additional Info
---
There shouldn't be much of anything else you need to know.
As a quick reminder, the things that Scrapper knows how to parse:
* HTML pages, especially articles
* Images
* Video files (most types, anyway)
* Audio files
* PDFs
* YouTube or Vimeo links

The [Solarized] color scheme is by Ethan Schoonover.

[Wikipedia]:http://en.wikipedia.org/wiki/Scrapbooking#United_States
[Bootstrap]:http://getbootstrap.com
[P2]:http://p2.isaaczarsky.com
[Video.js]:http://videojs.com
[audio.js]:http://kolber.github.io/audiojs/
[Solarized]:http://ethanschoonover.com/solarized