# luisplay
The movie DB App for Focus test

## SCREENSHOTS
**Android**

![demo screenshots Android](https://imgur.com/kN26tC5.png)

**iOS**
![demo screenshots iOS](https://imgur.com/YsjIQIU.png)

## DEMO Gif


![demo](https://imgur.com/0zFFCfR.gif)


## Technology used

 - React Native
 - Axios 
 - Axios-middleware
 - Lottie
 - CardViewWithImage
 - React Navigator 
 - FlatList
 - Pure and basics React Native Components

## APIs Integrated

 - The Movie DB  API (https://api.themoviedb.org/3/)
 - reqres API (https://reqres.in/api/)

## How to setup
**Android Development**

 1. clone project
 2. go to {repo} folder
 3. go to luisplay folder (react native root folder)
 4. execute the following comands

>     npm install

 Run app  using the following command:
 

> npx react-native run-android --verbose


## IF ERRORS APPEAR ##

> **Copy google-services.json into ./android/app/ folder (if needed)**

*Delete node_modules folder*

**Execute**

    npm install




**If error on BUILD, gradle verison 11 required:**

*Add to gradle.properties*

`org.gradle.java.home=C:\\Program Files\\Android\\Android Studio\\jre`

**Go to android folder and execute**

    cd android

    ./gradlew.bat wrapper


**If ERROR: ReactNativeFlipper.java uses or overrides a deprecated API.**

_edit android/app/build.gradle_

```
defaultConfig {
    multiDexEnabled true
    ... //other configs
}
```



**iOS Development**

 1. clone project
 2. go to {repo} folder
 3. go to luisplay folder (react native root folder)
 4. execute the following comands
	 

>     npm install
>     cd ios
>     pod install

 Run app using xcode or with the following command:
 

> react-native run-ios --simulator='iPhone 11'

## Demo login
To login into the app, use these credentials

 - eve.holt@reqres.in
 - cityslicka   (password is NOT validated by the reqres API)

## Search a movie (API issue)
When you try to search the movie using the app, most of the time the API does NOT return results, because you need to write all movie's name or the API fails.

> Try searching spider-man to get results
