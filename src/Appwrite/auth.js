import config from "../conf/config";
import { Client, Account, ID } from "appwrite";

/*
    //For Sign-up:--
        //Create client 1st which takes only two things.one is ".setEndpoint" and another one is your ".setProject".
        //Now define an account which takes client as it's parameter.
        //Now create an account using "create" method , which will return a promise.

            const client = new Client()
                .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
                .setProject('<PROJECT_ID>');               // Your project ID

            const account = new Account(client);

            const promise = account.create('[USER_ID]', 'email@example.com', '');
                                                                        //Content

            promise.then(function (response) {
                console.log(response); // Success
            }, function (error) {
                console.log(error); // Failure
            });


    //For Log-in:--
        //Create client 1st which takes only two things.one is ".setEndpoint" and another one is your ".setProject".
        //Now define an account which takes client as it's parameter.
        //After you've created your account, users can be logged in using the Create Email Session route.

            const client = new Client()
                .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
                .setProject('<PROJECT_ID>');                // Your project ID

            const account = new Account(client);

            const promise = account.createEmailSession('email@example.com', 'password');

            promise.then(function (response) {
                console.log(response); // Success
            }, function (error) {
                console.log(error); // Failure
            });

        
    //For Get account[]:--
        //Create client 1st which takes only two things.one is ".setEndpoint" and another one is your ".setProject".
        //Now define an account which takes client as it's parameter.
        //Get the currently logged in user.
        
            const client = new Client()
                .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
                .setProject('<PROJECT_ID>');                // Your project ID

            const account = new Account(client);
        
            const promise = account.get();

            promise.then(function (response) {
                console.log(response); // Success
            }, function (error) {
                console.log(error); // Failure
            });
*/


//Authentication using 'class'/'services':--
//Why we create 'services'?
    //If we simply follow this manner then we have to create manually everytime which may create problem for us.
    //So we go for another approach.


/*
//Code improvent:-
    -> Create a class 1st then export it.
    -> agar hmne class ko export karr diya toh uska jyada koi sense nahi banta ki uske andar methods access karne kaa,so we make an object and export it.
        - Create an object here and export it so that it will become easy for us to fetch methods and variables that are used in this class.
    -> We need a client and an account.All methods are implementd by 'account'.
    -> [ Jabb v ek object banne ,ekk client banne uske sath ekk account bane. ]
*/

export class AuthServices{
    //1st create client then create variables.
    //Make an constructor which includes 1.client's "setEndpoint" and "setProject" and 2.defining of variable.

    client=new Client();
    account; //variable

    constructor(){
        this.client
            .setEndpoint(config.appWrite_url)
            .setProject(config.appWrite_projectId);

        this.account=new Account(this.client)
    }

    //Define a method for creating an account which can access all services that are provided by 'appwrite':--

    //Hmm functionality esse design karr rahe takii jabb user ka account create ho tabb woh log-in karr paye taki wastage of memory na hoo.

    async createAccount({email,password,name}){
        //Takes object of three things 'email','password'and'name'.
        try{
            //For account creation we use 'create' method.
           const userAccount=await this.account.create(
                //Need a 'user-id' 1st so we use "Id.unique()"
                ID.unique(),email,password,name
            );

            if(userAccount){
                //If 'userAccount' is created then call another method for 'log-in'
                return this.logIn({email,password});
            }
            else{
                return userAccount;
            }
        }
        catch(error){
            throw error;
        }
    }

    async logIn({email,password}){
        //Takes object of three things 'email','password'.
        try{
            //For login we use 'createEmailSession' method.
           return await this.account.createEmailPasswordSession(
                email,password
            );
        }
        catch(error){
            throw error;
        }
    }

    //Get the currently logged in user.
    async getCurrentUser(){
        try{
            return await this.account.get();
        }
        catch(error){
            throw error;
        }

        //Agar account nahi toh
        return null;
    }

    //Delete all sessions from the user account and remove any sessions cookies from the end client.
    async logOut(){
        try{
            // return await this.account.deleteSessions('all'); //delete all session

            // return await this.account.deleteSession('[SESSION_ID]'); //delete perticular session

            return await this.account.deleteSession('current'); //delete current session
        }
        catch(error){
            throw error;
        }
    }
}

//Object
const authServices=new AuthServices();

export default authServices;

//Kaal ko agar appki backend service change hua toh , joo v changes hoga woh issi file main hoga.