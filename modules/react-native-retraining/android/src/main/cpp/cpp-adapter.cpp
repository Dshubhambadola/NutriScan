#include <jni.h>
#include "RetrainingOnLoad.hpp"

JNIEXPORT jint JNICALL JNI_OnLoad(JavaVM* vm, void*) {
  return margelo::nitro::retraining::initialize(vm);
}
