package com.postoffice;

import android.content.Intent;
import android.os.Bundle;
import android.view.WindowManager;
import android.view.Window;

//import android.support.v7.app.AppCompatActivity;
import androidx.appcompat.app.AppCompatActivity;

public class SplashActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        this.getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,WindowManager.LayoutParams.FLAG_FULLSCREEN);
            Intent intent = new Intent(this, MainActivity.class);
        startActivity(intent);
        finish();
    }
}