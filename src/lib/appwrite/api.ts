import { INewUser } from '@/types';
import { account, avatars ,databases,appWriteConfig} from './config';
import { ID,Query } from 'appwrite';
export async  function createUserAccount(user: INewUser){
    try{
const newAccount = await account.create(
    ID.unique(),
    user.email,
    user.password,
    user.name
) 

if(!newAccount) throw Error
const avatarUrl = avatars.getInitials(user.name)
const newUser = await saveUserToDB({
    accountid: newAccount.$id,
    name: newAccount.name,
    email: newAccount.email,
    username: user.username,
    imageUrl: avatarUrl,
})
return newUser
    }
    catch(err){
return err
    }

}
export async function saveUserToDB(user:
    { 
    accountid : string,
    email: string,
    name: string,
    imageUrl: URL,
    username: string
    })
    {
        try{
            const newUser = await databases.createDocument(
                appWriteConfig.databaseId,
                appWriteConfig.userCollectionId,
                ID.unique(),
                user,

            )

            return newUser
        }
catch(err){
    console.log(err)
}
}
export async function signInAccount(user: {email : string,password: string}){
    try{
        const session = await account.createEmailSession(user.email,user.password)
        return session
    }
catch(err){
    return err
}
}

export async function getCurrentUser() {
    try {
      const currentAccount = await getAccount();
  
      if (!currentAccount) throw Error;
  
      const currentUser = await databases.listDocuments(
        appWriteConfig.databaseId,
        appWriteConfig.userCollectionId,
        [Query.equal("accountid", currentAccount.$id)]
      );
  
      if (!currentUser) throw Error;
  
      return currentUser.documents[0];
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  export async function getAccount() {
    try {
      const currentAccount = await account.get();
  
      return currentAccount;
    } catch (error) {
      console.log(error);
    }
  }