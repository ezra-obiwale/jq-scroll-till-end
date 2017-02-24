## Usage

```html
<body>
  <div id="load"></div>
</body

<!-- Load JQuery -->
<script src="/path/to/jquery.min.js"></script>
<!-- Load jq-scroll-till-end -->
<script src="/path/to/jq-scroll-till-end.min.js"></script>
<!-- Initialize -->
<script>
  $(function(){
    $('#load').scrollTillEnd({
      url: '/path/to/data',
      loadFirstPage: true,
      parse: function(data) {
        // do something with the data and return it
        return data;
      }
    });
  });
</script>
```

## Configuration

Key|Type|Default|Description
---|----|-------|-----------
always|function|`function`|Equivalent to JQuery's Ajax `always` configuration
beforeAjax|function|`function`|Called before each request is sent
data|object|`{}`|Data to send with the request
dataKey|string|`null`|Necessary only if dataType is `json` and the data is a subset of the response object. If the data is an array of the of data however, this should be ignored.
dataType|string|`html`|The type of response expected (html/json)
done|function|`function`|Called after the response is gotten. If `parse` is a function, it is called `parse()`. Parameters include `response`.
end|function|`function`|Called when there's all the content have been gotten from the server
fail|function|`function`|Called if the ajax call fails
loadFirstPage|boolean|`false`|Indicates whether the plugin should load the first page. By default, the plugin kicks on from page 2 onward.
method|string|`get`|The request method (get/post/...)
offset|integer|`200`|The offset from the bottom of the page when the loading kicks in
pageIndicator|string\|boolean|The string that indicates which page is being shown. Use placeholder `{page}` to show the page number in the string
pageKey|string|`page`|The request data key to hold the desired page number
parse|function|`false`|Called on each data in each response. Paramaters are `data` and `index`. The returned data is appended to the target element.
url|string|`location.href`|The url to fetch new contents from
watchSelf|boolean|`false`|Indicates whether to watch scrolling on target element and not on document

## HTML Data Object

This is useful if calling the plugin on multiple elements. With data objects, each element can have different configurations.

```html
<head>
  <style>
    .load{width:33%}
  </style>
</head>
<body>
  <div class="load" data-url="/path/data/1" data-load-first-page="true"></div>
  <div class="load" data-url="/path/data/2" data-parse="parseData">
    <div class="second-div">First Page Data</div>
  </div>
  <div class="load" data-url="/path/data/3" data-parse="" data-page-key="target_page">
    First Page Data
  </div>

  <!-- add JQuery and plugin script here -->
  <script>
    function parseData(data) {
      return $(data).wrap('<div class="second-div" />');
    }
    $(function(){
      $('.load').scrollTillEnd({
        watchSelf:true,
        parse: function(data){
          return data;
        }
      })
    });
  </script>
</body>
```
