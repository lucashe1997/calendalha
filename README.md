# Calendalha <img alt="@lucashe1997" class="avatar" src="https://avatars3.githubusercontent.com/u/13800300?s=40&amp;v=4" height="20" width="20">
Simple Really Customizable Calendar

<img src="https://github.com/lucashe1997/calendalha/blob/master/images/shot1.png?raw=true"/>

## Getting Started
### Prerequisites
This library requires <a href="https://jquery.com/">jquery<a/> and <a href="https://momentjs.com">moment.js</a>

### Installation
The installation is pretty strait forward just import the calendalha.js into your code and call the function calendalha passing your div id.
```html
<!-- This example includes a optional css file with the default style  -->
<link rel="stylesheet" href="/path/to/calendalha.css"/>

<!-- div where calendar will render -->
<div class="calendalha"></div>

<!-- Jquery and Moment.js are required -->
<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/moment@2.24.0/moment.min.js"></script>

<!-- Calendalha script -->
<script src="/path/to/calendalha.js"></script>
<script>
  $(document).ready(function(){
    calendalha('.calendalha')
  })
</script>
```


## Options

### textAlign (string)
Position of the days in the calendar {center,left,right}
 
***Example:***
```js
calendalha('.calendalha',{
  textAlign:'center'
})
```
### onDayClick (function)
Function called when user clicks in a day cell
 
***Example:***
```js
calendalha('.calendalha',{
  onDayClick:function(date){
    console.log(date);
  }
})
```

### onMonthChange (function)
Function called when user changes month
 
***Example:***
```js
calendalha('.calendalha',{
  onMonthChange:function(month,year){
    alert("Month:"+month+" Year: "+year)
  }
})
```

### locale (string)
Localizations of calendar based in moment locale, imports from project if already set
 
***Example:***
```js
calendalha('.calendalha',{
  locale:'pt-br'
})
```

### initDate (string)
Initial date of the calendar "YYYY-MM-DD"
 
***Example:***
```js
calendalha('.calendalha',{
  initDate:'2019-05-01'
})
```

### markedDates (array)
Marcked dates of the calendar (marked dates receive "marked" class)
 
***Example:***
```js
calendalha('.calendalha',{
  markedDates:["2019-05-23","2019-04-22",2017-12-08]
})
```

### initDayActive (boolean)
initDate receives active status (class "active")
 
***Example:***
```js
calendalha('.calendalha',{
  initDayActive:true
})
```

### renderCustomDay (function)
Function to create a custom html of the table cell
 
***Example:***
```js
calendalha('.calendalha',{
  renderCustomDay:function(item,date){
    console.log(date) // moment object with item date
    console.log(item)    // day number string
    return `<i>${item}</i>`
  }
})
```

### celVAlign (string)
Vertical aligment of the content inside the table cell
 
***Example:***
```js
calendalha('.calendalha',{
  celVAlign:'top'
})
```

### custLeftArrow (string)
Custom html to the left arrow
 
***Example:***
```js
calendalha('.calendalha',{
  custLeftArrow:'←'
})
```

### custRightArrow (string)
Custom html to the right arrow
 
***Example:***
```js
calendalha('.calendalha',{
  custRightArrow:'→'
})
```

### weekFormat (string)
Week day name display format, based in moment.js format
 
***Example:***
```js
calendalha('.calendalha',{
  weekFormat:'ddd'
})
```

### monthFormat (string)
Month name display format, based in moment.js format
 
***Example:***
```js
calendalha('.calendalha',{
  monthFormat:'MMM'
})
```


## Version
### v1.0 (03-06-2019)
* **Inicial** build


## License
This project is licensed under the <a href="https://opensource.org/licenses/MIT">MIT</a> License
