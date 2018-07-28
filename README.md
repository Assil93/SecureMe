

#### Frameworks
* [AWS JavaScript SDK](http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/browser-intro.html)
* [Angular 2](https://angular.io/docs/ts/latest/quickstart.html) 
* [(Ionic)](http://ionicframework.com/docs/v2/getting-started/installation/)
* [TypeScript](https://www.typescriptlang.org/docs/tutorial.html)

```
```
# Install the NPM and Bower packages
npm install
```
```
# Build & Run the app in dev mode
ionic build; ionic serve
```

### AWS Setup
You will need to create the user pool manually through the console. 

### Necessary changes
By default, this app is using my user pool, which is defined in the ```app/services/properties.service.ts``` file. 
Update the file with the appropriate user pool info that you want to use 
