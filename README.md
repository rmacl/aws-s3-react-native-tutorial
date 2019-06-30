# aws-s3-react-native-tutorial
Learn about how to use aws s3 storage with react native



What we are going to do to set up tutorial is :

  - install react-native-aws3 libarary
  - link RCTCameraRoll library
  - add permission to access user photo library
  
  
What our app does is simple 
 - load photo library
 - upload selected photo from library to s3 bucket
 
It sounds really simple, but you can learn from this tutorial
 - how to use typescript
 - how to write test case
 - how to use memo for better performance in react native :D
 
 
 
![Alt Text](https://catasy.cafe24.com/tutorial/s3_tutorial.gif)

First, you need to create your react-native project and install react-native-aws3 library
```
react-native init s3-react-native-tutorial

cd s3-react-native-tutorial

npm install --save react-native-aws3
```

To use typescript, I followed this tutorial :  [Using typescript with react native ](https://facebook.github.io/react-native/blog/2018/05/07/using-typescript-with-react-native)



Now you need to link RCTCameraRoll libaray but you ou can skip following step if you init project with expo.

```
aws-s3-react-native-tutorial  ▸ ⁨ios⁩
aws-s3-react-native-tutorial.xcodeproj
```
You should be able to find .xcodeproj file in your project directory. Open YOURPROJECT.xcodeproj and drag RCTCameRoll.xcodeproj file under library folder.

```
aws-s3-react-native-tutorial⁩ ▸ ⁨node_modules⁩ ▸ ⁨react-native⁩ ▸ ⁨Libraries⁩ ▸ ⁨CameraRoll⁩
RCTCameraRoll.xcodeproj
```
<img src="https://catasy.cafe24.com/tutorial/Screen%20Shot%202019-06-20%20at%206.34.02%20PM.png" width="30%">

Then go to "Build Phases" tab and add libRCTCameraRoll.a to Link Binary with Libraries.
<img src="https://catasy.cafe24.com/tutorial/Screen%20Shot%202019-06-20%20at%206.34.21%20PM.png" width="80%">

At Info tab, you should be able to find Custom iOS Target Properties. Add key Privacy - Photo Library Usage Description and Privacy - Photo Library Usage Description
<img src="https://catasy.cafe24.com/tutorial/Screen%20Shot%202019-06-24%20at%203.20.15%20PM.png" width="80%">


Let's go back to your project and create src/const/aws.js and replace access and secret key with yours.
```
//  create src/const/aws.js 

export const awsConfig = {
    region: "ap-northeast-2",
    accessKey: "YOUR_ACCESS_KEY",
    secretKey: "YOUR_SECRET_KEY"
    }
```

Then we will define interface for response type in src/uploadPhoto.tsx
```
//  src/uploadPhoto.tsx
// Object return by RNS3
interface Response {
  status: number,
  body: {
    postResponse: {
      location: string
    }
  }
};
```

and single function to upload file to s3 bucket
```
//  src/uploadPhoto.tsx

function uploadImage(data: string, fileName : string) {
  const aTempFile =  {
    uri:  data,
    name: fileName,
    type: "image/jpeg"
  };
  const aTempConfig = {
    keyPrefix: "images/",
    bucket: "makgoli",
    region: awsConfig.region,
    accessKey: awsConfig.accessKey,
    secretKey: awsConfig.secretKey,
    successActionStatus: 201
  };

  return RNS3.put(aTempFile, aTempConfig).then((response: Response) => {
        
        if (response.status !== 201){
          throw new Error("Failed to upload image to S3");
        }
        return response.body.postResponse.location;
      });
}
```


