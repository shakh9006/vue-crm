import firebase from "firebase/app";
export default {
    actions: {
       async login({dispatch, commit}, {email, password}) {
           console.log(dispatch);
           console.log(commit);
           try {
                await firebase.auth().signInWithEmailAndPassword(email, password);
            }catch (e) {
                commit('setError', e);
                throw e;
            }
       },

       async register({dispatch, commit}, {name, email, password}) {
              try {
                  await firebase.auth().createUserWithEmailAndPassword(email, password);
                  const uid = await dispatch('getUId');
                  await firebase.database().ref(`/users/${uid}/info`).set({
                      bill: 10000,
                      name
                  })
              }catch (e) {
                  commit('setError', e);
                  throw e;
              }

       },

       getUId() {
           const user = firebase.auth().currentUser;
           return user ? user.uid : null;
       },

       async logout(){
           await firebase.auth().signOut();
       },
    }
}