import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBWEYL9tKyJiXqhQJcDaFYDVnpFuhXX3MM",
    authDomain: "reactjs-project-9cc9e.firebaseapp.com",
    projectId: "reactjs-project-9cc9e",
    storageBucket: "reactjs-project-9cc9e.appspot.com",
    messagingSenderId: "160224123094",
    appId: "1:160224123094:web:29143642e6551e9b7f9177"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

const uploadImageToFirebase = async (image) => {
    return new Promise(function (resolve, reject) {
        const storageRef = storage.ref(`/images/${image.name}`);
        const uploadTask = storageRef.put(image);

        uploadTask.on('state_changed',
            function (snapshot) {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            },
            function error(err) {
                console.log('error', err);
                reject();
            },
            function complete() {
                uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                    resolve(downloadURL);
                })
            }
        )
    })
}

const deleteImageFromFirebase = async (filePath) => {
    const storageRef = storage.ref(filePath);

    try {
        await storageRef.delete();
    } catch (err) {
        console.log(err);
    }
}

export {
    uploadImageToFirebase,
    deleteImageFromFirebase,
}