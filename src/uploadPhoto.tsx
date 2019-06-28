import { awsConfig } from './const/aws';
import { RNS3 } from 'react-native-aws3';

// Object return by RNS3
interface Response {
  status: number,
  body: {
    postResponse: {
      location: string
    }
  }
};

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

export default uploadImage;
