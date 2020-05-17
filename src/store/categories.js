import firebase from "firebase/app";
export default {
    actions: {
        async createCategory({dispatch, commit}, {title, limit}) {
            try {
                const uid = await dispatch('getUId');
                if(uid) {
                    const data = await firebase.database().ref(`/users/${uid}/categories`).push({title, limit});
                    return {title, limit, id: data.key};
                }
                return  {};

            }catch (e) {
                commit('setError', e);
                throw e;
            }
        },

        async editCategory({dispatch, commit}, {title, limit, id}) {
            try {
                const uid = await dispatch('getUId');
                if(uid) {
                    await firebase.database().ref(`/users/${uid}/categories`).child(id).update({title, limit})
                }
                return  {};
            }catch (e) {
                commit('setError', e);
                throw e;
            }
        },

        async fetchCategories({dispatch, commit}) {
            try {

                const uid = await dispatch('getUId');
                if(uid) {
                    const categories = (await firebase.database().ref(`/users/${uid}/categories`).once('value')).val() || {};
                    return Object.keys(categories).map(key => ({...categories[key], id: key}));
                }

                return  {};

            }catch (e) {
                commit('setError', e);
                throw e;
            }
        },

        async fetchCategoryById({dispatch, commit},id) {
            try {
                const uid = await dispatch('getUId');
                const category = (await firebase.database().ref(`/users/${uid}/categories`).child(id).once('value')).val();
                return {...category, id};
            }catch (e) {
                commit('setError', e);
                throw e;
            }
        }
    }
}