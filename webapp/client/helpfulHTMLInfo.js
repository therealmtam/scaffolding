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