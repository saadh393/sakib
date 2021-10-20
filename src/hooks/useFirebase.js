import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { useEffect, useState } from 'react';
import initializeAuthentication from '../Firebase/firebase.init';

initializeAuthentication();
const useFirebase = () => {


const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();
    const [user, setUser] =useState({})
    const [error, setError] =useState('')
    const [isLogin, setIsLogin] = useState(false)
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')

 // googleSignIn  googleSignIn
    const googleSignIn = () => {
        setIsLoading(true)
    return signInWithPopup(auth, googleProvider)
   
    }
// googleSignIn googleSignIn 
   const handleName = e => {
       setName(e.target.value)
   }
    const checkRegister =e =>{
        setIsLogin(e.target.checked)
    }
    const handlePassword = e => {
        setPassword(e.target.value)
    }
    const handleEmail = e => {
        setEmail(e.target.value)
    }
     const submitHandler = (e) => {
        e.preventDefault()
        if(password.length < 6){
            setError('Password Must be 6 Character long')
         return;
        
        }
        if(!/(?=.*[A-Z].*[A-Z])/.test(password)){
            setError('Password must 2 letters in Upper Case')
            return;
        }

        // login check 
        if(isLogin){
            return signInUser(email, password)
        }
        else{
            return createUser(email, password)
        }

     }
    //  onAuthStateChanged onAuthStateChanged 
    useEffect(() => {
      const subscribed =  onAuthStateChanged(auth, user =>{
            if(user){
                setUser(user);
            }
            else {
                setUser({})
            }
            setIsLoading(false);
        })
        return () => subscribed;
    }, [])
  //  onAuthStateChanged onAuthStateChanged 

    // sign in user  sign in user  sign in user  sign in user 
      const signInUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
        .then(result => {
            const user = result.user;
            console.log(user)
            setError('')
            return true;
        })
        .catch(error => {
            setError(error.message);
            return false;
        })
        .finally(() => {
            setIsLoading(false);
            return true
        });
      }

     // sign in user  sign in user  sign in user  sign in user 

    // create a new user create a new user  create a new user 
    const createUser = (email, password) => {
      
        return createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
            const user = result.user
            console.log(user)
            setError('')
            setNewUser()
            return true
        })
        .catch(error => {
            setError(error.message)
            return false
        })
       
    }
    // create a new user  create a new user  create a new user  

//    logout  user  logout  user  logout  user  logout  user 
   const logout = () => {
    setIsLoading(true)
    signOut(auth)
    .then(() => {
          setUser()
      })
      .catch((error) => {
       setError(error.message)
      })
      .finally(() => setIsLoading(false));
   }
  //    logout  user  logout  user  logout  user  logout  user 

  const setNewUser = () => {
    updateProfile(auth.currentUser, {
        displayName: name})
        .then(result => {
            console.log(result)
        })
        .catch((error) => {
            setError(error.message)
           });
}

// reset password in email 
   // email verification 
   const resetPassword = () => {
    sendPasswordResetEmail(auth, email)
    .then(result => {
        console.log(result)
    })
    .catch((error) => {
        setError("Please fill all information")
       });
}
// reset password in email 
//  return object  return object  return object  return object 
    return {
        name,
        auth,
        user,
        error,
        isLogin,
        isLoading,
        logout,
        setUser,
        setNewUser, 
        setError,
        handleName,
        createUser,
        signInUser,
        setIsLoading,
        handleEmail,
        submitHandler,
        resetPassword,
        checkRegister,
        handlePassword,
        googleSignIn
    }
//  return object  return object  return object  return object 

};

export default useFirebase;