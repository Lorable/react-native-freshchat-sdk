# Freshchat React Native SDK

## 0.5.8 (2019-3-7)

### Enhancement
* Improvements in logic to load new messages for conversations

## 0.5.7 (2019-2-15)

### Enhancement
* Added API to dismiss Freshchat screens in Android
* Upgrade Freshchat Android SDK version to 2.4.0
* Upgrade Freshchat iOS SDK version to 2.4.1

## 0.5.6 (2019-1-10)

### Enhancement
* Upgrade Freshchat Android SDK version to 2.2.0
* Upgrade Freshchat iOS SDK version to 2.2.0

### Bug Fixes
* Trigger unread count count callback only once

### Breaking Change

* If you have modified strings.xml to hide response expectation messages, it will continue to work in all cases except when away. You can set `responseExpectationEnabled` flag in FreshchatConfig as `false` to completely hide response expectations.

## 0.5.5 (2018-12-29)

### Enhancement
* Upgrade Freshchat Android SDK version to 2.1.0
* Upgrade Freshchat iOS SDK version to 2.1.0

## 0.5.4 (2018-12-13)

### Breaking Changes
* Application state has to be send as part of notification payload in iOS. Please refer documentation for more details. This is needed to determine whether to open conversations or show in-app notifications.

### Bug Fixes
* Trigger Notification interception broadcast when app is in background Android Oreo and above.

### Enhancement
* Added transformPushNotificationIOSPayloadToNativePayload API

## 0.5.3 (2018-12-04)

### Breaking Changes
* Event name changed from `Freshchat.FRESHCHAT_IOS_NOTIFICATION_CLICKED` to `Freshchat.FRESHCHAT_NOTIFICATION_CLICKED`
* `FreshchatNotificationConfig.activityToLaunchOnClick` is removed. Added `FreshchatNotificationConfig.overrideNotificationClickListener` which accepts a boolean value.

### Enhancement
* Unified approach to listen to notification click in Android and iOS

### Bug Fixes
* Ability to hide agent response time (iOS fix)
* Ability to launch Freshchat SDK screens within same task (Android fix)

## 0.5.2 (2018-11-29)

### Enhancement
* Exposed event to handle external links
* Exposed event to handle ios notification click
* Exposed ways to intercept notifications in Android

## 0.5.1 (2018-11-21)

### Bug fixes
* Ignore Null Objects while sending to native iOS SDK

## 0.5.0 (2018-11-15)

### Breaking Change
* Added error callback for setUser, setUserProperties and identifyUser API.

### Enhancement
* Securely identify and restore users using Id Tokens (JWT)

## 0.4.5 (2018-10-30)

### Enhancement
* Expose APIs dismiss Freshchat views in iOS

### Bug fixes
* Remove event listener crash fix

## 0.4.4 (2018-10-14)

### Enhancement
* Expose APIs to support custom localizable string file in iOS
* Updated Freshchat iOS SDK version to 1.5.5
* Updated Freshchat Android SDK version to 1.5.3

### Bug fixes
* Open SDK screens in the same task of running application instead of creating new task.

## 0.4.3 (2018-10-06)

### Enhancement
* Updated Freshchat iOS SDK version to 1.5.4

## 0.4.2 (2018-10-01)

### Enhancement
* Updated Freshchat iOS SDK version to 1.5.3
* Expose APIs to support custom theme file in iOS
* Expose event to listen to user interaction

## 0.4.1 (2018-09-24)

### Enhancement
* Updated Freshchat Android SDK version to 1.5.2

## 0.4.0 (2018-08-07)

### Enhancement
* Expose APIs to handle SDK push notifications

### Breaking Change
* Native module name is changed to `RNFreshchatSdkPackage` from `FreshchatSDKPackage`

## 0.3.1 (2018-06-15)

### Bug fixes
* Run native module instance in Main thread
* Fixed broken constant `FreshchatNotificationConfig.NotificationPriority.PRIORITY_HIGH`

## 0.3.0 (2018-06-14)

### Enhancement
* Enable capabilities to listen to change in unread message count and restore id generated event
* Allow FAQs and Channels to be filtered by tags

## 0.2.0 (2018-05-10)

* Initial alpha release of the Freshchat React Native SDK