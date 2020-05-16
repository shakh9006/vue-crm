import firebase from 'firebase/app';
export default {
    actions: {
        async fetchRecord({dispatch, commit}, {category, amount, desc, type}){
            const uid = await dispatch('getUId');
            if(uid){
                try {
                   await firebase.database().ref(`/users/${uid}/records`).push({category, type, amount, desc});
                }catch (e) {
                    commit('setError', e);
                    throw e;
                }
            }
        }
    },
}