package com.retraining

import com.margelo.nitro.retraining.HybridRetrainingSpec

import android.util.Log

class HybridRetraining: HybridRetrainingSpec() {    
    override fun scheduleRetrainingJob(): Unit {
        Log.d("HybridRetraining", "scheduleRetrainingJob called on Android")
    }
}
