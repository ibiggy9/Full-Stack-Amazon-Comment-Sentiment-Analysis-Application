import React, {useContext, useState, useEffect} from 'react'
import { auth } from '../firebase'
import { db } from '../firebase'
import { useHistory } from 'react-router-dom'
import { format } from 'date-fns'
const ml5 = window.ml5



const AuthContext = React.createContext()


export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children  }) {
    const [currentUser, setCurrentUser ] = useState()
    const [commentState, setCommentState] = useState([])
    const [searched, setSearched] = useState(false)
    const [loading, setLoading] = useState(true)
    const [creationError, setCreationError] = useState()
    const [market, setMarket] = useState('')
    const [search, setSearch] = useState([])
    const [joinedState, setJoinedState] = useState([])
    const [error, setError] = useState()
    const [noresult, setNoresult] = useState(false)
    const [sentScore, setSentScore] = useState('')
    const [classification, setClassification] = useState('')
    const [sentPercent, setSentPercent ] = useState(0)
    const [commentCount, setCommentCount] = useState(0)
    const history = useHistory()
    let searchList = []
    let commentList = []
    let joinedlist = []
    let sentiment
    let count = 0
    



    async function handleLogout(e) {
        setError('')
        try {
             await logout()
            history.pushState('/login')
        } catch {
            setError('Failed to log out')
        }
    }


    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password).catch(function(error){
            setCreationError(error.message)
           
        })
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }


    function logout() {
        return auth.signOut()
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user)
            setLoading(false)  
            
        })
        return unsubscribe
    }, [])

    function makeRequest(countryCode) {
        return new Promise((resolve, reject) => {
            if (countryCode === 'US') {
            const ref = db.ref(`/US/Product`)
            ref.on('value', (snapshot) => {
                snapshot.forEach((snap) => {
                    searchList.push(snap.val())
                })
            })}
            else if (countryCode === 'CA'){
            const ref2 = db.ref('/CA/Product')
            ref2.on('value', (snapshot)=> {
                snapshot.forEach((snap)=>{
                    searchList.push(snap.val())
                })
            })}
            if(searchList){

                resolve(searchList)
              } else {
              reject('Database failed')
              }})}
            
            
    function processing(product, comment){
        return new Promise((resolve, reject) => {
            setNoresult(false)
            setSearch(searchList)
            const stringSplit = product.split(" ")
            for (var i = 0; i < stringSplit.length; i++) {
            stringSplit[i] = stringSplit[i].charAt(0).toUpperCase() + stringSplit[i].slice(1)
            }
        
            let productUpperFirst = stringSplit.join(" ")
            
            // if there is anything left over from last search, clear. 
            if (searchList.length > 0) {
            clearSearch()
            } 
            // because there is one product in our data base that is upper case, we change it to upper first
            if (search.length < 2) {
                productUpperFirst = product.toUpperCase()
            }
            search.map((item) => {
                
                if (stringSplit.every(v => item.Product.includes(v))){
                    if(item.Comment.includes(comment)){
                        commentList.push(item) 
                        joinedlist.push(item.Comment) 
                    }} 
      
                })
            
            if (commentList.length < 2) {
                productUpperFirst = product.toUpperCase()
                search.map((item) => {
                
                    if (productUpperFirst && item.Product.includes(productUpperFirst)){
                        if(item.Comment.includes(comment)){
                            commentList.push(item) 
                            joinedlist.push(item.Comment)  
                        }} 

                    })

            }

            if (commentList != 0) {
                resolve([setCommentState(commentList), setJoinedState(joinedlist.join()), count = commentList.length, track(product, comment)])
                clearComments()
                ///setJoinedState(joinedlist.join())
            } else {
                reject(setCommentState(commentList))
                setNoresult(true)
                clearComments()
                setJoinedState([])
                count = 0
                track(product, comment)
            }
            })  
        }

        
    sentiment = ml5.sentiment('movieReviews', loadModel)
       
    function loadModel(){
        return new Promise((res, rej) => {
            const isLoaded = true
            if(isLoaded == true){
                res(modelLoaded())
            } else {
                rej('Model is not loaded')
            }  
        })

    function modelLoaded(){

        if (joinedState.length > 0){
        const score = sentiment.predict(joinedState)
        setSentScore(score.score)} else {
            setSentScore(0.6393421292304993)
        }
        
        if (sentScore){

            if(sentScore == 0.6393421292304993){
                const nodec = 0
                setSentPercent(0)
            } else {
            const percent = sentScore*100
            if(percent > 1){
            const nodec = Math.trunc(percent)
            setSentPercent(nodec)}else{

                setSentPercent(percent)
            }}
            

            if(sentScore == 0.6393421292304993){
                setClassification('No Result')
            }
            else if(sentScore > 0.000000000000000000000001 && sentScore < 0.25){
                setClassification('Negative')
            } else if(sentScore > 0.251 && sentScore < 0.5){
                setClassification('Slightly Negative')
            } else if(sentScore >0.501 && sentScore < 0.65) {
                setClassification('Neutral')
            } else if(sentScore > 0.651 && sentScore < 0.75){
                setClassification('Slightly Positive')
            } else if(sentScore > 0.751 ){
                setClassification('Stellar')
            }
            return [classification, sentPercent]
        
        }

        }

        }

            
            
    function clearSearch(){
        searchList = []
    }
    function clearComments(){
        commentList=[]
    }

    function track(productTerm, commentTerm){
        const ref = db.ref('/Responses/Users')
        const user = auth.currentUser.email
        const userData = {
            'Product Search': productTerm ,
            'Comment Search': commentTerm ,
            'Result Count': count,
        }
        const formattedUser = user.replace('.com', '')
        const uidPush = ref.child(formattedUser).push()
        if (productTerm != 'test'){
        uidPush.set(userData)}
    }
    
    const value = {
        currentUser,
        signup,
        creationError, 
        login,
        logout,
        resetPassword, 
        clearSearch,
        searchList,
        search,
        setSearch,
        makeRequest,
        market,
        setMarket,
        handleLogout,
        processing,
        commentList,
        sentScore,
        classification,
        sentPercent,
        commentState,
        searched,
        setSearched, 
        noresult,
        setNoresult,
        track,
     

    }
    return (
       <AuthContext.Provider value={value}>
           {!loading && children}
       </AuthContext.Provider>
    )
}
