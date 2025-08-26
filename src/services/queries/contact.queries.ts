import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function ContactList () {
    try {
        const res = await axios.get('api/get-contact');
    return res.data
    } catch (error) {
        console.log(error)
    }
}


export function useContactQuery () {
    
    return useQuery(
        {
           queryKey: ['contact'],
           queryFn: ContactList
        }
    )
}