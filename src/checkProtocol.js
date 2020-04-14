const DEFAULT_CUSTOM_PROTOCOL_FAIL_CALLBACK_TIMEOUT = 1000;

const registerEvent = (target, eventType, cb) => {
  if (target.addEventListener) {
    target.addEventListener(eventType, cb);
    return {
      remove: function() {
        target.removeEventListener(eventType, cb);
      }
    };
  } else {
    target.attachEvent(eventType, cb);
    return {
      remove: function() {
        target.detachEvent(eventType, cb);
      }
    };
  }
};

const openUriWithTimeoutHack = (uri, failCb, successCb) => {
  const timeout = setTimeout(function() {
    failCb();
    handler.remove();
  }, DEFAULT_CUSTOM_PROTOCOL_FAIL_CALLBACK_TIMEOUT);

  //handle page running in an iframe (blur must be registered with top level window)
  let target = window;
  while (target.parent && target != target.parent) {
    target = target.parent;
  }

  const onBlur = () => {
    clearTimeout(timeout);
    handler.remove();
    successCb();
  };

  const handler = registerEvent(target, "blur", onBlur);

  window.location = uri;
};

export const protocolCheck = (uri, failCb, successCb) => {
  const failCallback = () => {
    failCb && failCb();
  };

  const successCallback = () => {
    successCb && successCb();
  };

  const openUri = () => {
    openUriWithTimeoutHack(uri, failCallback, successCallback);
  };

  if (document.hasFocus()) {
    openUri();
  } else {
    let focusHandler = registerEvent(window, "focus", () => {
      focusHandler.remove();
      openUri();
    });
  }
};