# Intercepting Notifications

## Ios

Register for Freshchat.FRESHCHAT_IOS_NOTIFICATION_CLICKED as follows. Once registered, whenever notification is clicked, this event will be triggered with Freshchat deeplink

        Freshchat.addEventListener(
                    Freshchat.FRESHCHAT_IOS_NOTIFICATION_CLICKED,
                    onNotificationClicked
                );
                
        onNotificationClicked = (data) => {
            // if (shouldAuthenticate) {
            //    save deeplink and open Freshchat screen when required
            // } else {
                  Freshchat.openFreshchatDeeplink(data.url);
            // }
        };
        
## Android

1. Set `activityToLaunchOnClick` in NotificationConfig as follows.

        var freshchatNotificationConfig = new FreshchatNotificationConfig();
        freshchatNotificationConfig.priority = FreshchatNotificationConfig.NotificationPriority.PRIORITY_HIGH;
        freshchatNotificationConfig.notificationSoundEnabled = false;
        freshchatNotificationConfig.activityToLaunchOnClick = "com.demoapp.MainActivity";
        Freshchat.setNotificationConfig(freshchatNotificationConfig);
   
2. Specified activity will be opened when a notification is clicked and Freshchat deeplink is passed as Extras. We need to pass the received extras from Activity to React Native layer as follows.

        package com.demoapp;
        
        import android.app.Activity;
        import android.os.Bundle;
        import android.support.annotation.Nullable;
        
        import com.facebook.react.ReactActivity;
        import com.facebook.react.ReactActivityDelegate;
        
        public class MainActivity extends ReactActivity {
        
            /**
             * Returns the name of the main component registered from JavaScript.
             * This is used to schedule rendering of the component.
             */
            @Override
            protected String getMainComponentName() {
                return "DemoApp";
            }
        
            public static class MainActivityDelegate extends ReactActivityDelegate {
                private static final String ALARM_ID = "alarmID";
                private Bundle mInitialProps = null;
                private final @Nullable Activity mActivity;
        
                public MainActivityDelegate(@Nullable Activity activity, String mainComponentName) {
                    super(activity, mainComponentName);
                    this.mActivity = activity;
                }
        
                @Override
                protected void onCreate(Bundle savedInstanceState) {
                    // bundle is where we put our alarmID with launchIntent.putExtra
                    if (mActivity != null) {
                        Bundle bundle = mActivity.getIntent().getExtras();
                        mInitialProps = new Bundle();
                        if (bundle != null) {
                            if (bundle.containsKey("FRESHCHAT")) {
                                mInitialProps.putBoolean("FRESHCHAT", bundle.getBoolean("FRESHCHAT", false));
                            }
        
                            if (bundle.containsKey("FRESHCHAT_DEEPLINK")) {
                                mInitialProps.putString("FRESHCHAT_DEEPLINK", bundle.getString("FRESHCHAT_DEEPLINK", null));
                            }
                        }
                    }
                    super.onCreate(savedInstanceState);
                }
        
                @Override
                protected Bundle getLaunchOptions() {
                    return mInitialProps;
                }
            };
        
            @Override
            protected ReactActivityDelegate createReactActivityDelegate() {
                return new MainActivityDelegate(this, getMainComponentName());
            }
        }
 
3. Freshchat Deeplink will be received as Props in React Native Constructor. Deeplink can be saved and opened when needed.

        constructor(props) {
                super(props);
                console.log(props.FRESHCHAT_DEEPLINK)
            }
            
        