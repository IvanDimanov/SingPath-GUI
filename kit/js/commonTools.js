// Print message in the window console
function log(message) {
  console.log(message);
}


// Remove empty spaces from the begining or endding of a string
String.prototype.trim = function() {
  return this.replace(/^\s+/, '').replace(/\s+$/, '');
}


// Remove new lines from a string
String.prototype.removeNewLines = function() {
  return this.replace(/\r/g, '').replace(/\n/g, '');
}


// Set the first letter to upper case and all rest to lower
String.prototype.capitalFirstLetter = function() {
  return this[0].toUpperCase() + this.substr(1).toLowerCase();
}


// Return the page from the window URL
function getHref() {
  href = window.location.href;
  return href.substr(href.lastIndexOf('/')+1);
}


// Return the first chars needed regarding the window protocol
function getFirstURLChars() {
  return window.location.href.indexOf('https:') ? 'http://www.' : 'https://ssl.';
}


/**
 * Add a script tag in the page header
 * 
 * @param attributes - JSON Object - Hold the script tag "src" and "onload" attributes
 */
function addScript(attributes) {
  var scriptTag, src;
  
  // Create a script tag
  scriptTag = document.createElement('script');
  
  // Load the script source
  scriptTag.setAttribute('src', attributes.src);
  
  // Set a on load function if needed
  if (attributes.onload) {
    // Set the on load function as IIFE
    scriptTag.setAttribute('onload', '(' + attributes.onload + '())');
  }
  
  // Add the script tag in the page head
  document.getElementsByTagName('head')[0].appendChild(scriptTag);
}


// Clamp number in range
function clamp(number, _lowLimit, _highLimit) {
  var lowLimit, highLimit;
  
  // Secure low and high limit numbers
  lowLimit  = Math.min(_lowLimit, _highLimit);
  highLimit = Math.max(_lowLimit, _highLimit);
  
  // Calculate  income number range
  number = number > highLimit ? highLimit : number;
  number = number < lowLimit  ? lowLimit  : number;
  
  // Return the in range number
  return number;
}


// Clamp the number to be always positive
function clampPositive(number) {
  return clamp(number, 0, Math.abs(number));
}


// Clamp the number to be always negative
function clampNegative(number) {
  return clamp(number, -Math.abs(number), 0);
}


// Clamp a string in a limit of characters
function clampString(string, maxLength) {
  var endString, finalString, slice;
  string    = string ? string : '';
  maxLength = Math.abs(maxLength);
  
  if (maxLength >= string.length || !maxLength) {
    return string;
  } else {
    finalString = '';
    endString = '...';
    
    slice = maxLength - endString.length;
    if (slice > 0) {
      finalString = string.slice(0, maxLength - endString.length);
      return finalString + endString;
    } else {
      return endString.slice(0, slice + endString.length);
    }
  }
}


// Check if the user is currently logged in
function getUserLoggedInStatus(player) {
  return player.player_id != "NA";
}


/**
 * Counts each element string length and when the sum of all gets the maxLength, return the clamp array
 *
 * @param  array        array that need to be clamped
 * @param  maxLength    maximum sum length that the clamped array elements won't exceed
 * @return clampedArray final array with sum elements string lenght not more than maxLength
 */
function clampArrayByStringLength(array, maxLength) {
  // Secure income variables
  if(Object.prototype.toString.call(array) != '[object Array]' || !(maxLength *= 1)) {
    return [];
  }
  
  // Cache
  var clampedArray = new Array();
  var arrayLength  = array.length;
  
  // Calc the maximum length left and clamp if needed
  for(var i=0; i < arrayLength; i++) {
    var element = array[i];
    
    if((maxLength -= element.length) >= 0) {
      clampedArray.push(element);
    } else {
      break;
    }
  }
  
  return clampedArray;
}


/**
 * Return a deep copy-by-value object
 * The loop is recursive
 * 
 * @param  obj      the original object tha will be copied
 * @return cloneObj the final copy-by-value object
 */
function clone(obj) {
  var cloneObj = {},
      tempObj  = '';
  
  // Chech if the income is an object or primitive value
  if (typeof(obj) == "object") {
    
    // Check if the obj is an Array or regular Object
    if (obj instanceof Array) {
      return obj.slice(0);
      
    } else {
      
      // Recursive loop through all object elements
      for (tempObj in obj) {
        cloneObj[tempObj] = clone(obj[tempObj]);
      }
      
      // Return the clone object
      return cloneObj;
    }
  
  } else {
    
    // Return the primitive value
    return obj;
  }
}



/**
 * Add a callback function to a HTML node element event.
 * Similar to jQuery.on() function
 * 
 * @param nodeElement     the HTML element that we are listening for an event
 * @param event           event name as a string, e.q. 'click', 'hover', 'load', etc.
 * @param callback        the function that we want to be exacuted for the specific node event
 * @param useCaptureOrder specify the event execution order. More info on http://www.quirksmode.org/js/events_order.html
 */
function addEvent(nodeElement, event, callback, useCaptureOrder) {
  // Bind the event listener for the specific browser function
  if (nodeElement.addEventListener) {
    // Event listener function for Webkit, Netscape, and IE engine > 8
    
    // Take the capture event order as a default order
    useCaptureOrder = typeof(useCaptureOrder) != "undefined" ? useCaptureOrder : true;
    
    // Bind the node element event with the respective callback function in the predefined event order
    nodeElement.addEventListener(event, callback, useCaptureOrder);
    
  } else if (nodeElement.attachEvent) {
    // This event listener function is used for IE <= 8
    // Bind the node element event with the callback function
    nodeElement.attachEvent('on' + event, callback);
    
  } else {
    // no event support
    alert('Your browser does not support event handlers!');
  }
}


/**
 * Calc all Object elements
 * Similar to Array.length
 * 
 * @return length the total number of elements in the object
 */
ObjectLength = function (obj) {
  var tempObj = null,
      length  = 0;
  
  // Sum all elements in the Object
  for (tempObj in obj) {
    // Don't count the counter itself
    if (tempObj != 'length') {
      length++;
    }
  }
  
  return length;
};
