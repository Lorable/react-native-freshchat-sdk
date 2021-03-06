const {NativeModules} = require('react-native');
const {RNFreshchatSdk} = NativeModules;
import {NativeEventEmitter} from 'react-native';
const emitter = new NativeEventEmitter(RNFreshchatSdk);
const _eventHandlers = {};
import {
    Platform
} from 'react-native';
let { version } = require('../package.json');

let rn_sdk_version_placeholder = "{{rn-version}}";
let platform_name_placeholder = "{{platform}}";
let platform_sdk_version_placeholder = "{{platform-version}}";
let android_platform_name = "android";
let ios_platform_name = "ios";
let sdk_version_placeholder = "rn-" + rn_sdk_version_placeholder + "-" + platform_name_placeholder + "-" + platform_sdk_version_placeholder;

let isAndroid = function() {
    return !isIos();
};

let isIos = function() {
    return Platform.OS === 'ios';
};

let registerForRestoreIdUpdates = function (register) {
    RNFreshchatSdk.registerForRestoreIdUpdates(register);
};

let registerForMessageCountUpdates = function (register) {
    RNFreshchatSdk.registerForMessageCountUpdates(register);
};

let registerUserInteractionListerner = function (register) {
    RNFreshchatSdk.registerUserInteractionListerner(register);
};

let registerForOpeningLink = function (register) {
    RNFreshchatSdk.registerForOpeningLink(register);
};

let registerForUserActions = function (register) {
    RNFreshchatSdk.registerForUserActions(register);
};

let registerNotificationClickListener = function (register) {
    RNFreshchatSdk.registerNotificationClickListener(register);
};

let enableNativeListenerForType = function (type, enable) {
    switch (type) {
        case RNFreshchatSdk.ACTION_UNREAD_MESSAGE_COUNT_CHANGED:
            registerForMessageCountUpdates(enable);
            break;
        case RNFreshchatSdk.ACTION_USER_RESTORE_ID_GENERATED:
            registerForRestoreIdUpdates(enable);
            break;
        case RNFreshchatSdk.ACTION_USER_INTERACTION:
            registerUserInteractionListerner(enable);
            break;
        case RNFreshchatSdk.ACTION_OPEN_LINKS:
            registerForOpeningLink(enable);
            break;
        case RNFreshchatSdk.ACTION_USER_ACTIONS:
            registerForUserActions(enable);
            break;
        case RNFreshchatSdk.FRESHCHAT_ACTION_NOTIFICATION_CLICK_LISTENER:
            registerNotificationClickListener(enable);
            break;
    }
};

let eventsList = function(key) {
    let events = {
        EVENT_EXTERNAL_LINK_CLICKED        : RNFreshchatSdk.ACTION_OPEN_LINKS,
        EVENT_UNREAD_MESSAGE_COUNT_CHANGED : RNFreshchatSdk.ACTION_UNREAD_MESSAGE_COUNT_CHANGED,
        EVENT_USER_RESTORE_ID_GENERATED    : RNFreshchatSdk.ACTION_USER_RESTORE_ID_GENERATED,
        EVENT_USER_INTERACTED              : RNFreshchatSdk.ACTION_USER_INTERACTION,
        FRESHCHAT_EVENTS                   : RNFreshchatSdk.ACTION_USER_ACTIONS,
        FRESHCHAT_NOTIFICATION_CLICKED     : RNFreshchatSdk.FRESHCHAT_ACTION_NOTIFICATION_CLICK_LISTENER
    };
    return events[key];
};

module.exports = {

    EVENT_EXTERNAL_LINK_CLICKED        : eventsList('EVENT_EXTERNAL_LINK_CLICKED'),
    EVENT_UNREAD_MESSAGE_COUNT_CHANGED : eventsList('EVENT_UNREAD_MESSAGE_COUNT_CHANGED'),
    EVENT_USER_RESTORE_ID_GENERATED    : eventsList('EVENT_USER_RESTORE_ID_GENERATED'),
    EVENT_USER_INTERACTED              : eventsList('EVENT_USER_INTERACTED'),
    FRESHCHAT_EVENTS                   : eventsList('FRESHCHAT_EVENTS'),
    FRESHCHAT_NOTIFICATION_CLICKED     : eventsList('FRESHCHAT_NOTIFICATION_CLICKED'),

    init: function(freshchatConfig) {
        RNFreshchatSdk.init(freshchatConfig);
    },

    showFAQs: function(faqOptions) {
        if(faqOptions) {
            RNFreshchatSdk.showFAQsWithOptions(faqOptions);
        } else {
            RNFreshchatSdk.showFAQs();
        }
    },

    showConversations: function(conversationOptions) {
        if(conversationOptions) {
            RNFreshchatSdk.showConversationsWithOptions(conversationOptions);
        } else {
            RNFreshchatSdk.showConversations();
        }
    },

    resetUser: function() {
        RNFreshchatSdk.resetUser();
    },

    getUnreadCountAsync: function (callback, tags) {
        try {
            if (tags) {
                RNFreshchatSdk.getUnreadCountAsyncForTags(callback, tags);
            } else {
                RNFreshchatSdk.getUnreadCountAsync(callback);
            }
        }
        catch (err) {
            console.log(err)
        }
    },

    setUser: function(user, errorCallback) {
        RNFreshchatSdk.setUser(user, errorCallback);
    },

    setUserWithIdToken: function(jwt, errorCallback) {
        if (isAndroid()) {
            RNFreshchatSdk.setUserWithIdToken(jwt, errorCallback);
        } else {
            RNFreshchatSdk.setUserWithIdToken(jwt);
        }
    },

    getUser: function(callback) {
        RNFreshchatSdk.getUser(callback);
    },

    getSDKVersionCode: function (callback) {
        RNFreshchatSdk.getSDKVersionCode((native_sdk_version) => {
            var platformName = "";
            if (isAndroid()) {
                platformName = android_platform_name;
            } else {
                platformName = ios_platform_name;
            }

            var reactNativeVersion = sdk_version_placeholder;
            reactNativeVersion = reactNativeVersion.replace(rn_sdk_version_placeholder, version);
            reactNativeVersion = reactNativeVersion.replace(platform_name_placeholder, platformName);
            reactNativeVersion = reactNativeVersion.replace(platform_sdk_version_placeholder, native_sdk_version);

            callback(reactNativeVersion);
        });
    },

    setUserProperties: function(userProperties, errorCallback) {
        RNFreshchatSdk.setUserProperties(userProperties, errorCallback);
    },

    sendMessage: function(freshchatMessage) {
        RNFreshchatSdk.sendMessage(freshchatMessage);
    },

    identifyUser: function(externalId, restoreId, errorCallback) {
        RNFreshchatSdk.identifyUser(externalId, restoreId, errorCallback);
    },

    restoreUserWithIdToken: function(jwt, errorCallback) {
        if (isAndroid()) {
            RNFreshchatSdk.restoreUser(jwt, errorCallback);
        } else {
            RNFreshchatSdk.restoreUser(jwt);
        }
    },

    getUserIdTokenStatus: function(callback) {
        RNFreshchatSdk.getUserIdTokenStatus(callback);
    },

    getFreshchatUserId: function(callback) {
        RNFreshchatSdk.getFreshchatUserId(callback);
    },

    /**
     * Function to dismiss Freshchat SDK screens
     *
     * @since 0.4.5
     */
    dismissFreshchatViews: function () {
        RNFreshchatSdk.dismissFreshchatViews();
    },

    setNotificationConfig: function(freshchatNotificationConfig) {
        RNFreshchatSdk.setNotificationConfig(freshchatNotificationConfig);
    },

    setPushRegistrationToken: function (token) {
        RNFreshchatSdk.setPushRegistrationToken(token);
    },

    isFreshchatNotification: function (payload, callback) {
        RNFreshchatSdk.isFreshchatNotification(payload, callback);
    },

    handlePushNotification: function (payload) {
        RNFreshchatSdk.handlePushNotification(payload);
    },

    openFreshchatDeeplink: function (link) {
        RNFreshchatSdk.openFreshchatDeeplink(link);
    },

    addEventListener: function (type, handler) {
        let listener = emitter.addListener(type, handler);

        let shouldStartNativeListener = false;
        if (!_eventHandlers[type]) {
            _eventHandlers[type] = new Map();
            shouldStartNativeListener = true;
        }

        _eventHandlers[type].set(handler, listener);
        if (shouldStartNativeListener) {
            enableNativeListenerForType(type, true);
        }
    },

    // removeEventListener: function (type, handler) {
    //     if (!_eventHandlers[type].has(handler)) {
    //         return;
    //     }
    //     _eventHandlers[type].get(handler).remove();
    //     _eventHandlers[type].delete(handler);
    //
    //     if (_eventHandlers[type].size === 0) {
    //         _eventHandlers[type] = undefined;
    //         enableNativeListenerForType(type, false);
    //     }
    // },

    removeEventListeners: function (type) {
        if (!_eventHandlers[type]) {
            return;
        }

        var eventSubscriptionsMap = _eventHandlers[type];
        if (eventSubscriptionsMap) {
            eventSubscriptionsMap.forEach((subscription) => {
                if (subscription) {
                    subscription.remove();
                }
            });
        }
        _eventHandlers[type] = undefined;
        enableNativeListenerForType(type, false);
    },

    transformPushNotificationIOSPayloadToNativePayload: function (reactPayload) {
        const nativePayload = reactPayload._data;

        nativePayload.aps = {};
        nativePayload.aps.alert = reactPayload._alert;
        nativePayload.aps.badge = reactPayload._badgeCount;
        // nativePayload.aps.mutable-content = 1;
        nativePayload.aps.sound = "default";

        return nativePayload;
    },

    // isAppActiveWhenReceivingNotification: function (nativePayload) {
    //     if (nativePayload.isActive !== undefined) {
    //         return nativePayload.isActive;
    //     } else {
    //         return false;
    //     }
    // },
}
