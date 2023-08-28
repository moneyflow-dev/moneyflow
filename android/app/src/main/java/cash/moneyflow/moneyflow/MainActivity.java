package cash.moneyflow.moneyflow;

import android.os.Bundle;

import androidx.core.splashscreen.SplashScreen;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        SplashScreen.installSplashScreen(this);
    }
    
    @Override
    public void onStart() {
        super.onStart();
        bridge.getWebView().setVerticalScrollBarEnabled(false);
    }
}
