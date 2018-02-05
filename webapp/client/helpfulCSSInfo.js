/*eslint-disable */
// HELPFUL CSS INFO:
//-----------------------------------------------
// General Notes:

  1)

//-----------------------------------------------
// CSS Selectors:

  1) Specificity points:
    The type selector has the lowest specificity weight and holds a point value of 0-0-1.
    The class selector has a medium specificity weight and holds a point value of 0-1-0.
    Lastly, the ID selector has a high specificity weight and holds a point value of 1-0-0. As

    id > class > type (lowest)

  2) Combining Selectors:

    Selects <p> child elements in elements with class hotdog
      .hotdog p {
        background: brown;
      }

    (Note: Spaces between selectors matters)
    (ex: p.mustard {} => means paragraph elements with class mustard)
    (ex: p .mustard {} => means elements within paragraphs that have class mustard)

    Best practice is to:
      a) select classes
      b) select ids
      c) select class+element
      d) select id+element
    to limit the scope of targeting

  3) Layering with classes as a way to limit scope:

    Elements within HTML can have more than one class attribute value so long as each value is space separated. With that, we can place certain styles on all elements of one sort while placing other styles only on specific elements of that sort.

    <a class="btn btn-danger">...</a>
    <a class="btn btn-success">...</a>

    .btn {
      font-size: 16px;
    }
    .btn-danger {
      background: red;
    }
    .btn-success {
      background: green;
    }

  4) separate selectors by comma to target different catagories of items:
    table#t01, #tagA, #tagB {}

    doing: table#01 tagA {} will combine the selectors into 1.


//-----------------------------------------------
// Common CSS property value types:

  Colors:
    Hex, RBG, ...

  Length:
    percentage = 10%
    pixel = 10px
    em => font-size: 10px; width: 10em; (em is a multiplier for the specified font-size => font-size x em = actual size)
//-----------------------------------------------
// Box Model:

  1) Display puts a div inline, on its own line, or doesn't display
    display: <block, inline-block, none>

  2) Box Model:
    div {
      width: 400px; //total width of the inner most box
      height: 100px;  //total width of the inner most box
      padding: 20px; //defines the buffer around the contents
      border: 6px solid #949599; //defines where the box's border is from the padding
      margin: 20px; //defines area around the box
    }

    height and/or width > padding > border > margin (farthest out)

    width and height, padding, and margin are all transparent and just specify length.

    border-radius is used to provide curvature. The value specified

  3) Ways of specifying values:
    a) width: <top> <right> <bottom> <left>;  //clockwise
    b) margin-top: #; margin-bottom: #;
    c) width: <top & bottom> <left & right>
    d) border: 10px solid black;

  4) use of 'auto' property to scale a property based on the content

    width: 0 auto;

//-----------------------------------------------
// Useful CSS properties:

    text-align: <center, left, right>

    //DON'T USE FLOATS TO ALIGN:
    //float right/left aligns elements, clear ensures elements don't overlap.
    //use float: left; for all inline elements so they will all float properly inline
    float:  <left, right>; clear: both;



//-----------------------------------------------
// CSS Grid:

  Use grids to layout content on a page.
  They are like table elements but can be used to
  layout content on a page into columns and rows.



#garden {
  display: grid;
  grid-template-columns: 20% 20% 20% 20% 20%;
  grid-template-rows: 20% 20% 20% 20% 20%;
}

#element {
  grid-column-start: < 3; span 3; -1>; grid-column-end: < 4; span 4; -1>
  grid-row-start: < 3; span 3; -1>; grid-row-end: < 4; span 4; -1>


}

