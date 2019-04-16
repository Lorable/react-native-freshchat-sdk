const {NativeModules} = require('react-native');
const {RNFreshchatSdk} = NativeModules;

const NotificationPriority = {
    "PRIORITY_DEFAULT": RNFreshchatSdk.NotificationPriority.PRIORITY_DEFAULT,
    "PRIORITY_HIGH": RNFreshchatSdk.NotificationPriority.PRIORITY_HIGH,
    "PRIORITY_LOW": RNFreshchatSdk.NotificationPriority.PRIORITY_LOW,
    "PRIORITY_MAX": RNFreshchatSdk.NotificationPriority.PRIORITY_MAX,
    "PRIORITY_MIN": RNFreshchatSdk.NotificationPriority.PRIORITY_MIN
};


class FreshchatNotificationConfig {

    constructor() {

        // TODO: Add notificationSoundUriPath - muthu

        this.notificationSoundEnabled = true;
        this.activityToLaunchOnFinish = null;
        this.largeIcon = null;
        this.smallIcon = null;
        this.priority = 0;
        this.overrideNotificationClickListener = false;

        Object.preventExtensions(this);
    }

    static get NotificationPriority() {
        return NotificationPriority;
    }
}

export default FreshchatNotificationConfig;
