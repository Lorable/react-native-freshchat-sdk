package com.freshchat.consumer.sdk.react;

import android.support.annotation.NonNull;

public class StringUtils {

    public static boolean isEmpty(@NonNull String str) {
        if (str == null || str.length() == 0 || str.trim().isEmpty()) {
            return true;
        } else {
            return false;
        }
    }
}
