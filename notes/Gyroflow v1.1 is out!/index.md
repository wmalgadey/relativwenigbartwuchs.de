---
source: https://gyroflow.xyz/
---
Gyroflow is now faster, more intuitive, and production-grade

Advanced open-source gyro-assisted video stabilization for cinematography, drone videography, and much more! Bring your cinematic footage to the next level.

![[ui_picture.jpg]]

## Modern user interface

New and improved cross-platform user interface with realtime hardware accelerated video playback and blazingly fast video export. And yes, it comes with a dark mode.

![[stabexample.jpg]]

Gyroflow corrects for lens distortion and contains a handful of customizable video smoothing algorithms, including horizon leveling, to achieve exactly the stabilized look you need.

![[fpv_logger.jpg]]

[https://gyroflow.xyz/assets/videos/comparison1.mp4](https://gyroflow.xyz/assets/videos/comparison1.mp4)

[https://gyroflow.xyz/assets/videos/comparison2.mp4](https://gyroflow.xyz/assets/videos/comparison2.mp4)

- Real time preview, params adjustments and all calculations
- GPU processing and rendering
- Fully multi-threaded
- Rolling shutter correction
- Supports already stabilized GoPro videos (captured with Hypersmooth enabled) (Hero 8 and up)
- Supports and renders 10-bit videos (and higher, up to 16-bit 4:4:4, direct YUV rendering with no data loss - no conversion to RGB)
- Visual chart with gyro data (can display gyro, accel, magnetometer and quaternions)
- Visual display of smoothed quaternions
- Real time offset adjustments
- Adaptive zoom (dynamic cropping)
- Based on [telemetry-parser](https://github.com/AdrianEddy/telemetry-parser) - supports all gyro sources out of the box
- Gyro low pass filter, arbitrary rotation (pitch, roll, yaw angles) and orientation
- Multiple gyro integration methods
- Cross-platform - currently works on Windows/Linux/Mac, with Android and iOS apps coming
- Multiple UI languages
- Supports variable frame rate videos, all calculations are done on timestamps
- x264, x265, ProRes and PNG outputs, with x264 and x265 fully GPU accelerated
- Automatic lens calibration process
- Automatic updates of lens profile database
- Built-in lens profiles for GoPro HERO 6, 8, 9 and 10 in all shooting modes

# Supported formats:

- Sony (a1, a7c, a7r IV, a7 IV, a7s III, a9 II, FX3, FX6, RX0 II, RX100 VII, ZV1, ZV-E10)
- GoPro (All models with gyro metadata, starting with HERO 5)
- Insta360 (OneR, SMO 4k, GO2)
- Betaflight blackbox (CSV and binary)
- Runcam CSV (Runcam 5 Orange, iFlight GOCam GR)
- WitMotion (WT901SDCL binary and *.txt)
- Mobile apps: `Sensor Logger`, `G-Field Recorder`, `Gyro`