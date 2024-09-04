import { db } from "@/firebase/config";
import { userProps } from "@/interfaces/interfaces";
import { doc, getDoc } from "firebase/firestore";

export async function getData(user: string){
	const docRef = doc(db, "users", "gGne4MgdjuUR3p3kRNENapCYRqI3");
	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		// console.log("Document data:", docSnap.data());
		return docSnap.data() as userProps;
	} else {
		// docSnap.data() will be undefined in this case
	}
};