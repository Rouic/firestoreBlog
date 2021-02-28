import 'bootstrap';
import './app/styles/style.scss';



import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import * as ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';


import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/performance';
import 'firebase/analytics';
import 'firebase/firestore';
import 'firebase/database';


import AOS from 'aos';


/* Firebase config start */
const firebaseConfig = {
  apiKey: "AIzaSyAWrtYN72-U5Oby_W6UUQHpdtLoymDMOFk",
  authDomain: "fb-firestore-blog.firebaseapp.com",
  databaseURL: "https://fb-firestore-blog-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fb-firestore-blog",
  storageBucket: "fb-firestore-blog.appspot.com",
  messagingSenderId: "992015533751",
  appId: "1:992015533751:web:dfdb6c81d67fb9c156af32",
  measurementId: "G-78QY8NCCDJ"
};
firebase.default.initializeApp(firebaseConfig);
global.realTimeDatabase = firebase.default.database();
global.perf = firebase.default.performance();
global.analytics = firebase.default.analytics();
global.db = firebase.default.firestore();
global.auth = firebase.default.auth();
global.firebase = firebase.default;
/* Firebase config end */	  

global.firestoreBlog = angular.module('firestoreBlog', [uiRouter, ngCookies, ngAnimate]);
