# README.md

## Integration Steps

1. Extract `react-native-freshchat-sdk` and place it inside `node_module` folder in your project
2. Add `"react-native-freshchat-sdk": "^0.5.8"` under `dependencies` in project `package.json`
3. Run `react-native link` on you project root directory

### iOS setup steps

1. Navigate inside `ios` folder in your project
2. Add an entry for FreshchatSDK as shown below in `Podfile`
    ```
    target 'ProjectName' do
    
        pod 'FreshchatSDK', :path=> '../node_modules/react-native-freshchat-sdk/ios/FreshchatSDK.podspec'
    
    end
    ```
3. Run `pod install` from ios directory

Follow how to manually link a library here [https://facebook.github.io/react-native/docs/linking-libraries-ios.html#content](https://facebook.github.io/react-native/docs/linking-libraries-ios.html#content)

### Android setup steps

Add `maven { url "https://jitpack.io” }` to you project level build.gradle as below 

    allprojects {
        repositories {
            .....
            maven { url "https://jitpack.io" }
        }
    }



## Usage

### Import module

    import {
        Freshchat,
        FreshchatConfig,
        FaqOptions,
        ConversationOptions,
        FreshchatUser,
        FreshchatMessage,
        FreshchatNotificationConfig
        } from 'react-native-freshchat-sdk';
        
### Initialise SDK

    var freshchatConfig = new FreshchatConfig('YOUR_APP_ID', 'YOUR_APP_KEY');
    Freshchat.init(freshchatConfig);

### Show FAQs

    Freshchat.showFAQs();

### Filter and Show FAQs with tags

    var faqOptions = new FaqOptions();
    faqOptions.tags = ["premium"];
    faqOptions.filteredViewTitle = "Tags";
    faqOptions.filterType = FaqOptions.FilterType.ARTICLE;
    Freshchat.showFAQs(faqOptions);

### Show Conversations

    Freshchat.showConversations();

### Filter and Show Conversations with tags

    var conversationOptions = new ConversationOptions();
    conversationOptions.tags = ["premium"];
    conversationOptions.filteredViewTitle = "Premium Support";
    Freshchat.showConversations(conversationOptions);

### Reset User

    Freshchat.resetUser();

### Get Unread Message Count

    Freshchat.getUnreadCountAsync((data) => {
            console.log(data);
        });

 
### Listen to changes to unread message count

    Freshchat.addEventListener(
                Freshchat.EVENT_UNREAD_MESSAGE_COUNT_CHANGED,
                () => {
                    console.log("onUnreadMessageCountChanged triggered");
                    Freshchat.getUnreadCountAsync((data) => {
                        var count = data.count;
                        var status = data.status;
    
                        if (status) {
                            console.log("Message count: " + count);
                        } else {
                            console.log("getUnreadCountAsync unsuccessful");
                        }
                    });
                }
            );
    
### To stop listening from changes to unread count 

    Freshchat.removeEventListeners(Freshchat.EVENT_UNREAD_MESSAGE_COUNT_CHANGED);
    
### Get User

    Freshchat.getUser((user) => {
                console.log(user);
            })

### Set User

    var freshchatUser = new FreshchatUser();
    freshchatUser.firstName = "John";
    freshchatUser.lastName = "Doe";
    freshchatUser.email = "johndoe@dead.man";
    freshchatUser.phoneCountryCode = "+91";
    freshchatUser.phone = "1234234123";
    Freshchat.setUser(freshchatUser, (error) => {
        console.log(error);
    });

### Set User Properties

    var userPropertiesJson = {
        "user_type": "Paid",
        "plan": "Gold"
    }
    Freshchat.setUserProperties(userPropertiesJson, (error) => {
        console.log(error);
    });

### Get SDK version code

    Freshchat.getSDKVersionCode((data) => {
            console.log(data);
        });

### Send Message On Behalf of the User

     var freshchatMessage = new FreshchatMessage();
     freshchatMessage.tag = "video";
     freshchatMessage.message = "text send message";
     Freshchat.sendMessage(freshchatMessage);

### Dismiss Freshchat Views

     Freshchat.dismissFreshchatViews();

### Identify and Restore User

    Freshchat.identifyUser("EXTERNAL_ID", "RESTORE_ID", (error) => {
        console.log(error);
    });

### Listen to restore id generated

    Freshchat.addEventListener(
                Freshchat.EVENT_USER_RESTORE_ID_GENERATED,
                () => {
                    console.log("onRestoreIdUpdated triggered");
                    Freshchat.getUser((user) => {
                        var restoreId = user.restoreId;
                        var externalId = user.externalId;
                        console.log("externalId: " + externalId);
                        console.log("restoreId: " + restoreId);
                    })
                }
            );

### To stop listening from restore id generated event

    Freshchat.removeEventListeners(Freshchat.EVENT_USER_RESTORE_ID_GENERATED);

### Set Notification Config

    var freshchatNotificationConfig = new FreshchatNotificationConfig();
    freshchatNotificationConfig.priority = FreshchatNotificationConfig.NotificationPriority.PRIORITY_HIGH;
    freshchatNotificationConfig.notificationSoundEnabled = false;
    Freshchat.setNotificationConfig(freshchatNotificationConfig);
    
### Save device token of the user in Freshchat server

    Freshchat.setPushRegistrationToken(token);

### Handle Freshchat notification when user receives it

    Freshchat.isFreshchatNotification(notification, (freshchatNotification) => {
         
         if (freshchatNotification) {
            Freshchat.handlePushNotification(notification);
         } else {
            // handle your app notification
         }
    })
    
In iOS, Application state should be sent as part of notification payload to effectively handle notification

`isActive` field should be `true` if Application state is active, `false` otherwise.

##### Example Snippet to add `isActive` parameter:

    NSMutableDictionary *mutableDict = [response.notification.request.content.userInfo mutableCopy];
    BOOL isActive = [UIApplication sharedApplication].applicationState == UIApplicationStateActive;
    [mutableDict setObject:@(isActive) forKey:@"isActive"];
    
Note: If this parameter is not set, Conversations screen will not open when app is inactive or in background. Instead In-App notification will be shown.
   
### Transform PushNotificationIOS Payload To Native Payload

    const notificationPayload = Freshchat.transformPushNotificationIOSPayloadToNativePayload(notification);

If you want to handle push notifications in Native layer. You can follow the below steps

### iOS

#### Add Import 

    import "FreshchatSDK.h"
    
#### Save device token of the user in Freshchat server

    [[FreshchatSDK sharedInstance]setPushRegistrationToken:deviceToken];
    
#### Handle Freshchat notification when user receives it

    if ([[FreshchatSDK sharedInstance]isFreshchatNotification:userInfo]) {
        [[FreshchatSDK sharedInstance]handlePushNotification:userInfo];
    } else {
        // handle your app notification
    }
    
### Android
    
#### Save device token of the user in Freshchat server

    Freshchat.getInstance(context).setPushRegistrationToken(token);
    
#### Handle Freshchat notification when user receives it

    if (Freshchat.isFreshchatNotification(message)) {
        Freshchat.getInstance(getApplicationContext()).handleFcmMessage(message);
    } else {
        // handle your app notification       
    }
    
### Listen to User Interactions

1. Add event listener for Freshchat.EVENT_USER_INTERACTED event. When user interacts with app, this event will be triggered.

        Freshchat.addEventListener(
                    Freshchat.EVENT_USER_INTERACTED,
                    userInteractionHandler
                );
               
2. iOS Specific configuration
   - In AppDelegate.h, Use `RNFreshchatWindow` instead of `UIWindow`, which extends `UIWindow`
   
        ```
        #import "RNFreshchatSdk.h"
        @property (nonatomic, strong) RNFreshchatWindow *window;
        ```
   - In AppDelegate.m,
        - Use `RNFreshchatWindow` instead of `UIWindow`
        - Override `applicationDidEnterBackground` and trigger `FRESHCHAT_USER_INTERACTED` event as below
            ```
            - (void)applicationDidEnterBackground:(UIApplication *)application {
              [[NSNotificationCenter defaultCenter] postNotificationName:FRESHCHAT_USER_INTERACTED object:self];
            }
            ```
3. To remove event listener, use the below code
    
        Freshchat.removeEventListeners(Freshchat.EVENT_USER_INTERACTED);

## JWT integration documentation

1. To create user with reference_id and to restore existing user, call `restoreUserWithIdToken` with JWT token.
2. To update user properties, create user without reference_id or to update JWT token, call `setUserWithIdToken` with JWT token.
3. `getUserIdTokenStatus` return current status of the JWT token 
4. `getFreshchatUserId` generate and return user alias
5. Use `Freshchat.FRESHCHAT_EVENTS` event to listen to user interactions like SCREEN_TRANSITIONS and NEW_MESSAGE.

JWT Token will be in any one of the below 5 states

 - TOKEN_NOT_SET : Token not set in SDK
 - TOKEN_NOT_PROCESSED : Token set in SDK and is being processed
 - TOKEN_VALID : Token set and is valid
 - TOKEN_INVALID : Token set and is invalid
 - TOKEN_EXPIRED : Token set and is expired

## API

### Restore user with Id Token

    Freshchat.restoreUserWithIdToken(jwt);

### Set user user with Id Token

    Freshchat.setUserWithIdToken(jwt);

### Get ID Token Status

    Freshchat.getUserIdTokenStatus((data) => {
            var status = data.user_id_token_status;
            console.log('FRESHCHAT_EVENTS: state - ', status);
        });
        
### Get Alias

    Freshchat.getFreshchatUserId((alias) => {
            console.log('Alias - ', alias);
        });
        
## Event

### User Actions

Adding Listener

    Freshchat.addEventListener(
                Freshchat.FRESHCHAT_EVENTS,
                userActionsEventHandler
            );
            
Handling when event triggered

    const userActionsEventHandler = (actionData) => {
        console.log("FRESHCHAT_EVENTS triggered");
        var action = actionData.user_action;
        Freshchat.getUserIdTokenStatus((data) => {
            var status = data.user_id_token_status;
            console.log('FRESHCHAT_EVENTS: action - ', action);
            console.log('FRESHCHAT_EVENTS: state - ', status);
        });
    };

### Overriding External Links

Adding listener

    Freshchat.addEventListener(
                Freshchat.EVENT_EXTERNAL_LINK_CLICKED,
                openLinkHandler
            );
            
Handling when event triggered

    const openLinkHandler = (data) => {
        console.log("link - ", data.url);
    };
    
### Override Notification Click Listener

    Freshchat.addEventListener(
        Freshchat.FRESHCHAT_NOTIFICATION_CLICKED,
        (data) => {
            // if (canOpenSdkScreenDirectly) {
            Freshchat.openFreshchatDeeplink(data.url);
            // } else {
            //     save deeplink and open Freshchat screen when required
            // }
        }
    );
    
When app is in killed state and SDK screen is opened directly due to notifications, `activityToLaunchOnFinish` will be launched when user clicks back button from SDK screen.

Set `overrideNotificationClickListener` to `true` when you want to override notification click event in Android.

Configure FreshchatNotificationConfig as follows.
 
    var freshchatNotificationConfig = new FreshchatNotificationConfig();
    freshchatNotificationConfig.priority = FreshchatNotificationConfig.NotificationPriority.PRIORITY_HIGH;
    freshchatNotificationConfig.notificationSoundEnabled = false;
    freshchatNotificationConfig.activityToLaunchOnFinish = "com.demoapp.MainActivity";
    freshchatNotificationConfig.overrideNotificationClickListener = true;
    Freshchat.setNotificationConfig(freshchatNotificationConfig);

## For More References

More instructions here: [Freshchat for Android](https://support.freshchat.com/support/solutions/articles/229319)

More instructions here: [Freshchat for iOS](https://support.freshchat.com/support/solutions/articles/232945)
