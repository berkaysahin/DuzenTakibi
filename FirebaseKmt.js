import firebase from 'firebase'
import '@firebase/firestore';

class FirebaseKmt{
    listeyiGetir(callback){
        let ref = firebase.firestore().collection("Users").doc(firebase.auth().currentUser.uid).collection("Listeler");

        this.unsubscribe = ref.onSnapshot(snap => {
            listeler = [];
            snap.forEach(doc => {
                listeler.push({id:doc.id, ...doc.data()});
            });
            callback(listeler);
        });
    }
}

export default FirebaseKmt;