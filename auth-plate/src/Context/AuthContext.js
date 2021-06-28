import React, {useContext, useState, useEffect} from 'react'
import { auth } from '../firebase'
import { db } from '../firebase'
import { useHistory } from 'react-router-dom'
const ml5 = window.ml5



const AuthContext = React.createContext()


export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children  }) {
    const [currentUser, setCurrentUser ] = useState()
    const [commentState, setCommentState] = useState([])
    const [loading, setLoading] = useState(true)
    const [creationError, setCreationError] = useState()
    const [market, setMarket] = useState('')
    const [search, setSearch] = useState([])
    const [joinedState, setJoinedState] = useState([])
    const [error, setError] = useState()
    const [sentScore, setSentScore] = useState('')
    const [classification, setClassification] = useState('')
    const [sentPercent, setSentPercent ] = useState(0)
    const history = useHistory()
    let searchList = []
    let commentList = []
    let joinedlist = []
    let sentiment



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
                console.log('done!')
                resolve(searchList)
              } else {
              reject('Database failed')
              }})}
            
            
        function processing(product, comment){
            return new Promise((resolve, reject) => {
                setSearch(searchList)
                if (searchList.length > 0) {
                clearSearch()
                 } 
                search.map((item) => {
                    if (product && item.Product.includes(product)){
                        if(item.Comment.includes(comment)){
                            commentList.push(item) 
                            joinedlist.push(item.Comment)  
                        }} 

                    })

                if (commentList != 0) {
                    resolve([setCommentState(commentList), setJoinedState(joinedlist.join())])
                    clearComments()
                    ///setJoinedState(joinedlist.join())
                } else {
                    reject(setCommentState(commentList))
                    clearComments()
                    setJoinedState([])
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
                console.log('Model Loaded')
                if (joinedState.length > 0){
                const score = sentiment.predict(joinedState)
                setSentScore(score.score)} else {
                    setSentScore(0.6393421292304993)
                }
                console.log(sentScore)
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
                        setClassification('Very Poor')
                    } else if(sentScore > 0.251 && sentScore < 0.5){
                        setClassification('Poor')
                    } else if(sentScore >0.501 && sentScore < 0.65) {
                        setClassification('Neutral')
                    } else if(sentScore > 0.651 && sentScore < 0.75){
                        setClassification('Good')
                    } else if(sentScore > 0.751 ){
                        setClassification('Excellent')
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
        commentState
     

    }
    return (
       <AuthContext.Provider value={value}>
           {!loading && children}
       </AuthContext.Provider>
    )
}
