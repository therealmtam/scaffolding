// HELPFUL HTML INFO:
//-----------------------------------------------
// General Notes:

  1) Place CSS style sheets in the HEAD tag because:

  It is recommended because when you have the CSS declared before <body> starts,
  your styles has actually loaded already. So very quickly users see something
  appear on their screen (e.g. background colors). If not, users see blank screen
  for some time before the CSS reaches the user.

  Also, if you leave the the styles somewhere in the <body>, the browser has to
  re-render the page (new and old when loading) when the styles declared has
  been parsed.

//-----------------------------------------------
// FORM DATA:

Forms are able to send POST or GET Requests.

On the server - side, posted data requires
bodyParser.urlencoded() middleware to extract
the information.

  < form action = "/testpost" method = "post" >
  First name:
<input type="text" name="fname">
  <br> Last name:
      <input type="text" name="lname">
      <br>
        <input type="submit" value="Submit">
  </form>

  Forms are useful for testing GET and POST routes
  on the server without having to use JQuery.

//-----------------------------------------------
// TABLE ELEMENTS:

<table id="t01" style="width:100%">
  <caption>Monthly savings</caption>  //the title
  <tr>                                //the first row contains th = headers
    <th>Firstname</th>
    <th colspan='2'>Lastname</th>   //spans 2 columns
  </tr>
  <tr>
    <td>Jill</td>
    <td>Smith</td>
    <td>50</td>
  </tr>
  <tr>
    <td>Eve</td>
    <td>Jackson</td>
    <td>94</td>
  </tr>
</table>

  //Use specific targeting for elements such as tables to make it limited in scope.
  //Note that you can't use class="01" but you can use class"t01"

table#t01, table#t01th, table#t01 td {
    border: 1px solid black;
    border-collapse: collapse;  //collapses the borders of each element's box model to show 1 line
}


//-----------------------------------------------
// HTML BROWSER PROCESS:

https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/#The_order_of_processing_scripts_and_style_sheets
http://frontendbabel.info/articles/webpage-rendering-101/

The HTML Parser parses the HTML from top to bottom after it is received.

<link>s that are in the <head> are downloaded in parallel as the HTML parser
keeps on parsing the document.

Css does not block the parser, because it doesn't impact the DOM tree. It impacts the Render Tree.
However, the CSSOM needs to be formed before any script can execute. Therefore, it is good that
by specification, <link>s are placed in the <head> tag where they are downloaded and parsed early on in the html document.

<script>s are downloaded and executed serially, so it blocks the html parser
until the script has downloaded and fully executed. That is unless either async or defer is used:

  <script src="demo_async.js" async></script>
  <script src="demo_defer.js" defer></script>

Async => the browser will async dl and execute the script
Defer => will asycn dl then wait until the entire document is parsed before executing (which is similar to
placing the script before the closing </body> tag)

Note: <script async or defer>s without a src (i.e., does not require fetching), will act as synchronous script
and will be html parser blocking.

Mozilla and Chrome browsers will, in parallel as the script is executing, go find other subresources to be downloaded and download them. If it downloads a css document,
the browser will block the script from continuing to execute until the css stylesheet is loaded and parsed into the CSSOM, then it will continue executing the script.

This also goes for say a link to a css stylesheet takes long to load and a script tag in the head is faster
to load, then even though the html parser continues parsing while the css document is loaded and parsed, the
parser will stop at the </script> (i.e., the moment before it executes the script or downloads the script)
and wait until the stylesheet is parsed into the CSSOM.

//BEST PRACTICE
//-----------------------------
Therefore, it is best practice to place <script>s before the closing </body> tag regardless of async or defer
in order to prevent blocking of the html parser AND to allow the stylesheets to be fully loaded and parsed.
//-----------------------------

As the DOM and CSSOM are being created, and scripts are executing, the Render Tree is SIMULTANEOUSLY being
formed. The Render tree takes into account the CSSOM.

After the entire html document has been parsed (http://gent.ilcore.com/2011/05/how-web-page-loads.html),
 THEN all DEFERRED scripts will be executed (waiting for their source and all pending stylesheets to download). The completion of all Deferred scripts executing triggers the DOMContentLoaded event to be fired.

 The DOMContentLoaded event is otherwise fired when the initial HTML document has been completely loaded and parsed, without waiting for stylesheets, images, and subframes to finish loading. If there are deferred scripts,
 then the script will run synchronously after the html has been parsed and

 NEXT, the parser will wait for any pending ASYNC scripts to finish loading and executing. Finally, once all subresources have finished downloading, the window's load event will be fired and parsing is complete.

 The window's load event is only fired after the DOM and all dependent resources and assets have loaded.

Following the final formation of the Render Tree is the Layout step where the browser determines exactly
where on the page the items need to be placed.

Then following Layout is Painting the browser (display of the Layout onto the browser)

//Good practice for non-blocking scripts and placement of styles sheets:
//-----------------------------
Putting <link>s in the head is part of the specification. Besides that, placing at the top allows the page to render progressively which improves the user experience. The problem with putting stylesheets near the bottom of the document is that it prohibits progressive rendering in many browsers, including Internet Explorer. Some browsers block rendering to avoid having to repaint elements of the page if their styles change. The user is stuck viewing a blank white page. It prevents the flash of unstyled contents.

<script>s block HTML parsing while they are being downloaded and executed. Downloading the scripts at the bottom will allow the HTML to be parsed and displayed to the user first.

An exception for positioning of <script>s at the bottom is when your script contains document.write(), but these days it's not a good practice to use document.write(). Also, placing <script>s at the bottom means that the browser cannot start downloading the scripts until the entire document is parsed. One possible workaround is to put <script> in the <head> and use the defer attribute.
//-----------------------------

//-----------------------------
What is progressive rendering?
//-----------------------------

Progressive rendering is the name given to techniques used to improve the performance of a webpage (in particular, improve perceived load time) to render content for display as quickly as possible.

It used to be much more prevalent in the days before broadband internet but it is still used in modern development as mobile data connections are becoming increasingly popular (and unreliable)!

Examples of such techniques:

Lazy loading of images - Images on the page are not loaded all at once. JavaScript will be used to load an image when the user scrolls into the part of the page that displays the image.
Prioritizing visible content (or above-the-fold rendering) - Include only the minimum CSS/content/scripts necessary for the amount of page that would be rendered in the users browser first to display as quickly as possible, you can then use deferred scripts or listen for the DOMContentLoaded/load event to load in other resources and content.
Async HTML fragments - Flushing parts of the HTML to the browser as the page is constructed on the back end. More details on the technique can be found here.

//-----------------------------
What does a DOCTYPE do?
//-----------------------------
DOCTYPE is an abbreviation for “document type”. It is a declaration used in HTML to distinguish between standards mode and quirks mode. Its presence tells the browser to render the web page in standards mode.

Moral of the story - just add <!DOCTYPE html> at the start of your page.