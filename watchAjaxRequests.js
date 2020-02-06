// Note: these typedefs might have other properties

/**
 * @typedef HTMLDocument
 * @property { Object } target
 * @property { Object } location
 * @property { Object } href
 * @property { Object } origin
 * @property { Object } protocol
 * @property { Object } host
 * @property { Object } hostname
 * @property { Object } port
 * @property { Object } pathname
 * @property { Object } search
 * @property { Object } hash
 */

/**
 * @typedef Event
 * @property { String } type
 * @property { Number } timeStamp
 * @property { Boolean } jQuery<Number>
 * @property { Number } isTrigger
 * @property { HTMLDocument } delegateTarget
 * @property { HTMLDocument } currentTarget
 * @property { HTMLDocument } target
 */

/**
 * @typedef XHR
 * @property { Number } readyState
 * @property { String } responseText
 * @property { Object } responseJSON
 * @property { Number } status
 * @property { String } statusText
 
 * @typedef Options
 * @property { String[] } dataTypes
 * @property { String } url
 * @property { String } type
 * @property { String } contentType
 * @property { String } dataType
 * @property { Boolean } global
 * @property { Boolean } processData
 * @property { Boolean } async
 * @property { Boolean } cache
 * @property { Boolean } crossDomain
 * @property { Boolean } hasContent
 * @property { Boolean } isLocal
 * @property { Object } flatOptions
 * @property { Object } accepts
 * @property { Object } contents
 * @property { Object } responseFields
 * @property { Object } converters
 * @property { Object } headers
 */

/**
 * Intercepted network requests made with Ajax
 * For more information check: https://api.jquery.com/ajaxComplete/
 *
 * @param { Event  } event - contains the event object
 * @param { XHR  } xhr - contains the XMLHttpRequest object
 * @param { Options  } options - contains the options used in the AJAX request
 */

function doSomething(event, xhr, options) {
  console.log('>> Parameters: ', { event, xhr, options })
}

function watchAjaxRequests() {
  const documentJQueryElement = window.$(document)
  documentJQueryElement.off('ajaxComplete', doSomething).on('ajaxComplete', doSomething)
}

/**
 * OPTION 2: Without JQuery
 */

 /**
 * Intercepts a XHR HTTP Request and executes a function
 * @param { Function } XHR window.XMLHttpRequest
 * @param { Function } postCompleteFunction
 */
export function interceptRequest (XHR, postCompleteFunction) {
  'use strict'
  var open = XHR.prototype.open
  var send = XHR.prototype.send

  XHR.prototype.open = function (method, url, async, user, pass) {
    this._url = url
    open.call(this, method, url, async, user, pass)
  }

  XHR.prototype.send = function (data) {
    var self = this
    var oldOnReadyStateChange
    var url = this._url

    function onReadyStateChange () {
      if (self.readyState === 4 /* complete */) {
        /* This is where you can put code that you want to execute post-complete */
        /* URL is kept in this._url */
        postCompleteFunction(url)
      }

      if (oldOnReadyStateChange) {
        oldOnReadyStateChange()
      }
    }

    /* Set xhr.noIntercept to true to disable the interceptor for a particular call */
    if (!this.noIntercept) {
      if (this.addEventListener) {
        this.addEventListener('readystatechange', onReadyStateChange, false)
      } else {
        oldOnReadyStateChange = this.onreadystatechange
        this.onreadystatechange = onReadyStateChange
      }
    }

    send.call(this, data)
  }
}