import firebase from 'firebase'

class FirebaseKmt{
    constructor(param) {
        this.init(param);
    }

    init(param) {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                param(null, user);
            } else {
                param(error);
            }
        });
    }

    listeyiGetir(param) {
        let db = firebase.firestore().collection("Users").doc(firebase.auth().currentUser.uid).collection("Listeler");
        this.unsubscribe = db.onSnapshot(snapshot => {
            lists = [];
            snapshot.forEach(doc => {
                lists.push({ id: doc.id, ...doc.data() });
            });
            param(lists);
        });
    }

    listeyiYenile(liste) {
        let db = this.db;
        db.doc(liste.id).update(liste);
    }
}

export default FirebaseKmt;