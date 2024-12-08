import { Injectable } from '@angular/core';
import { FirebaseTSApp } from 'firebasets/firebasetsApp/firebaseTSApp'
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { FirebaseTSFirestore, Limit, OrderBy } from "firebasets/firebasetsFirestore/firebaseTSFirestore";
import { environment } from '../../environment/environment prod';
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {


  auth: FirebaseTSAuth;
  firestore: FirebaseTSFirestore;
  userDocument: userDocument | null = null;
  posts : PostData []=[];
  //userdata
  private userDataSubject = new BehaviorSubject<any>(null); // Aquí se almacenarán los datos del usuario
  userData$ = this.userDataSubject.asObservable(); // Observable que podrán suscribirse los componentes
  //posts
  private userDataSubject1 = new BehaviorSubject<any>(null); // Aquí se almacenarán los datos del usuario
  userData1$ = this.userDataSubject1.asObservable(); // Observable que podrán suscribirse los componentes
  //esatdo de login
  isLoggedIn1: boolean = false;
  private userStatus = new BehaviorSubject<boolean>(false); // Estado inicial: no logueado

  userStatus$ = this.userStatus.asObservable(); // Exponemos el observable

  constructor() {
    
    // Verifica si Firebase ya está inicializado
// Verifica si ya hay una instancia de Firebase

  FirebaseTSApp.init(environment.firebaseConfig);

    this.auth = new FirebaseTSAuth();
    this.firestore = new FirebaseTSFirestore();
    this.getPosts()

    this.auth.listenToSignInStateChanges(
      user => {
        const isLoggedIn = !!user; // True si hay usuario, False si no
        this.userStatus.next(isLoggedIn); // Emitimos el nuevo estado
        this.auth.checkSignInState(

          {
            whenSignedIn: user => {

              this.isLoggedIn1 = true;
              this.getInfoUser();
            },
            whenSignedOut: user => {
              console.log("logout")
              this.isLoggedIn1 = false;



            },
            whenSignedInAndEmailNotVerified: user => {
              // this.router.navigate(["emailVerification"])


            },
            whenSignedInAndEmailVerified: user => {





            },
            whenChanged: user => {

            }


          }
        )
      }


    );

  }


  crearPostText(text: string){
    let postID = this.firestore.genDocId();
    this.firestore.create(
      {
        path: ["Posts"],
        data: {
          id : postID,
          nombre: this.userDocument?.nombre + " "+ this.userDocument?.apellido , 
          fotoUrl:this.userDocument?.fotoUrl,
          text:text,
          creatorId: this.auth.getAuth().currentUser?.uid,
          timestamp: FirebaseTSApp.getFirestoreTimestamp(),
          likes: 0
        },
        onComplete: (docId) => {
         alert("Publicacion creada")
//this.getPosts();
         
        }

      }

    );
  }
  crearPostImagen(text: string, imagenUrl:string){

    let postID = this.firestore.genDocId();

      this.firestore.create(
        {
          path: ["Posts", postID],
          data: {
            id:postID,
            nombre: this.userDocument?.nombre + " "+ this.userDocument?.apellido , 
            fotoUrl:this.userDocument?.fotoUrl,
            text: text,
            creatorId: this.auth.getAuth().currentUser?.uid,
            imageUrl:imagenUrl,
            timestamp: FirebaseTSApp.getFirestoreTimestamp(),
            likes: 0
          },
          onComplete: (docId) => {
            alert("Publicacion creada")
        // this.getPosts();
          }

        }

      );

    
  }


  getPosts(){
    this.firestore.getCollection({
      path: ["Posts"],
      where: [
        new OrderBy("timestamp", "desc"),
        new Limit(20),
      ],
      onComplete: (result) => {
        result.docs.forEach((doc) => {
          let post = <PostData>doc.data();
          post.id = doc.id; // Agrega el ID del documento al objeto `post`
          this.posts.push(post); // Agrega el post con su ID al arreglo
          //verificar post
          this.userDataSubject1.next(this.posts); // Actualiza los datos del usuario
          console.log("Post:", this.posts)
          
        });
      },
      onFail: (err) => {
        console.error("Error al obtener los posts:", err);
      },
    });
  }
  registro(email: string, pass: string, nombre: string, apellido: string) {

    this.auth.createAccountWith({
      email: email,
      password: pass,

      onComplete: (uc) => {


        //llenar datos de ususario
        let id = this.auth.getAuth().currentUser?.uid + "";
        this.firestore.create({
          path: ["usuarios", id],
          data: {
            userId: id,
            nombre: nombre,
            apellido: apellido,
            fotoUrl: "https://devmiasx.com/uploads/67380645a9ac3_user.png",
            privacidad: "publico",


          },
          onComplete: (docId: string) => {

            alert("Registro completo")
          },
          onFail: (err: any) => {
            alert(err);
            ;
          }
        });

      },
      onFail: (err) => {

        console.log(err.message)


      },
    });


  }

  login(email: string, pass: string) {
    this.auth.signInWith(
      {
        email: email,
        password: pass,
        onComplete: (uc) => {

          console.log("Iniciado correctamente")

        },
        onFail: (err) => {
          console.log("No se puede iniciar" + err);


        }
      }
    )
  }
  getInfoUser() {
    const user = this.auth.getAuth().currentUser

    if (user) {
      this.firestore.listenToDocument({
        name: "Getting Document",
        path: ["usuarios", user.uid],
        onUpdate: (result) => {
          this.userDocument = <userDocument>result.data();
          console.log("data: ", this.userDocument)
          this.userDataSubject.next(this.userDocument); // Actualiza los datos del usuario
        }
      });
    } else {
      console.warn("No hay un usuario autenticado.");
    }
  }
  isLoggedIn() {

    return this.userStatus.getValue();

  }

  getCurrentUser() {
    return this.auth.getAuth()?.currentUser;
  }
  cerrarSesion() {
    this.auth.signOut();
    console.log("cerraste sesión")

  }

}
export interface userDocument {
  nombre: string;
  apellido: string;
  carrera: string;
  fotoUrl: string;
  privacidad: string;
  userId: string

}

export interface PostData {
  text: string,
  creatorId: string,
  imageUrl?: string,
  timestamp: any;
  id?: string; 
  likes: number;
  nombre : string;
  fotoUrl: string
  
}
