package com.bridgetest;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import android.content.ContentResolver;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.content.ContentValues;
import android.provider.CalendarContract;
import java.util.Map;
import java.util.TimeZone;
import java.util.HashMap;
import android.Manifest;
import android.util.Log;
import com.bridgetest.CalendarUtils;
import androidx.core.content.ContextCompat;


public class CalendarModule extends ReactContextBaseJavaModule {
    CalendarModule(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return "CalendarModule";
    }

    @ReactMethod
    public void createCalendarEvent(
        String eventStartMillis,
        String eventEndMillis,
        String name,
        String eventDescription,
        String eventLocation
        ) {
        ReactApplicationContext context = getReactApplicationContext();
        ContentResolver cr = context.getContentResolver();
        ContentValues values = new ContentValues();
        values.put(CalendarContract.Events.DTSTART, eventStartMillis);
        values.put(CalendarContract.Events.DTEND, eventEndMillis);
        values.put(CalendarContract.Events.TITLE, name);
        values.put(CalendarContract.Events.DESCRIPTION, eventDescription);
        values.put(CalendarContract.Events.EVENT_LOCATION, eventLocation);
        values.put(CalendarContract.Events.CALENDAR_ID, 1);
        values.put(CalendarContract.Events.EVENT_TIMEZONE, TimeZone.getDefault().getID());

        Uri uri = CalendarContract.Events.CONTENT_URI;
        Uri eventUri = cr.insert(uri, values);
                Log.d("CalendarModule", "Mylog - Event created with URI: " + eventUri);


    }
}