# Basira independent iPhone research preview

Source: https://github.com/ras222003-boop/B5/tree/ece3a3ca07a2091ceaedd87703b6d27d1bb26a19 (branch claude/basira-vision-training)

This repository serves the EXISTING Basira vision page as a static browser experiment, independent of https://basira-m7myneuo.manus.space. It is not the production platform, an examination/account service, or a navigation/fall-prevention system. No database, server AI, payment service, microphone recording or private-media upload endpoint exists. Browser POST/beacon/native transcription paths are disabled; camera input is processed locally. GitHub still receives ordinary static-site access logs.

Open the deployed site at its repository path with `#/navigation/vision`. Lite0 remains the default; Tiny and clean V3 require explicit selection. Model scores/colours are uncalibrated; masks remain disabled. The browser preview has no native iPhone LiDAR bridge or native haptics. Safari does not support the Web Vibration API, so vibration behaviour must be tested in the signed iOS app on a real device. An iPhone/VoiceOver test must be performed by the device owner and is NOT claimed by the desktop software-media test.

Only publisher-granted Tiny and provenance-isolated V3 are included. Apache-2.0/YCB notices, training-source attributions and lineage are retained under the model API asset paths and model-notices/. No training images, protected tests, V1/V2/BDD/SegFormer/SlimSAM weights, credentials, local certificates or private logs are included. Source permission does not establish production, privacy, colour or navigation qualification.

Deployment is manual via the Research Pages preview workflow; pushes do not deploy automatically. B5 main, the original Manus project, its domain and database are unchanged. SOURCE.json pins every built file and source commit.

## 2026-10-31 update: experimental colour engine V4 (display only)

The Vision page now offers a button "محرك الألوان" (inside the model panel, under the model picker) to switch from V3 (default) to the experimental V4 colour engine. V4 shows a dominant colour (and a secondary colour only when a verified object mask exists; this web page has none) on screen and in the local trial log. Neither engine is spoken: colour speech stays unqualified. Measured V4 accuracy on real photos is far below the 95% target (see ml/vision/COLOUR-V4.md in B5). The app files were rebuilt from the source commit above without the private model weights; the Tiny/V3 model files and their notices are retained byte-identical from the previously verified deployment (see SOURCE.json "overlay"). No iPhone or VoiceOver test is claimed.
